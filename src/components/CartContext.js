import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    function addToCart(product) {
        console.log('=== ADD TO CART DEBUG ===');
        console.log('Produkt erhalten:', product);
        console.log('StockQuantity:', product.stockQuantity);
        console.log('Stock (fallback):', product.stock);
        
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === product.productId);
            const currentQuantity = existingItem ? existingItem.quantity : 0;
            const requestedQuantity = currentQuantity + 1;

            // ✅ Verwende stockQuantity aus dem Produkt
            const availableStock = product.stockQuantity || product.stock || 0;
            console.log('Verfügbarer Stock:', availableStock);
            console.log('Angeforderte Menge:', requestedQuantity);
            
            // Stock-Prüfung
            if (availableStock < requestedQuantity) {
                alert(`Nur noch ${availableStock} Stück von "${product.name}" verfügbar!`);
                return prevItems;
            }
            
            if (existingItem) {
                console.log('Produkt bereits im Warenkorb, erhöhe Menge');
                return prevItems.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                console.log('Neues Produkt zum Warenkorb hinzufügen');
                return [...prevItems, { 
                    ...product, 
                    quantity: 1,
                    // Stelle sicher, dass Stock-Info im Cart-Item verfügbar ist
                    stockQuantity: availableStock
                }];
            }
        });
    }

    function updateQuantity(productId, newQuantity) {
        console.log('=== UPDATE QUANTITY ===');
        console.log('ProductID:', productId, 'Neue Menge:', newQuantity);
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems => {
            // Finde das Produkt im Warenkorb
            const cartItem = prevItems.find(item => item.productId === productId);
            if (!cartItem) {
                console.log('Produkt nicht im Warenkorb gefunden');
                return prevItems;
            }

            // ✅ Verwende stockQuantity aus dem Cart-Item
            const availableStock = cartItem.stockQuantity || cartItem.stock || 0;
            console.log('Verfügbarer Stock für Update:', availableStock);
            
            // Stock-Prüfung
            if (availableStock < newQuantity) {
                alert(`Nur noch ${availableStock} Stück von "${cartItem.name}" verfügbar!`);
                return prevItems;
            }
            
            return prevItems.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    }

    function removeFromCart(productId) {
        console.log('=== REMOVE FROM CART ===');
        console.log('Entferne Produkt:', productId);
        
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    }

    function clearCart() {
        console.log('=== CLEAR CART ===');
        setCartItems([]);
    }

    function getTotalItems() {
        const total = cartItems.reduce((total, item) => total + item.quantity, 0);
        console.log('Gesamte Artikel im Warenkorb:', total);
        return total;
    }

    function getTotalPrice() {
        const total = cartItems.reduce((total, item) => {
            // Behandle sowohl BigDecimal (als String/Number) als auch normale Numbers
            const itemPrice = typeof item.price === 'object' && item.price !== null 
                ? parseFloat(item.price) || 0
                : parseFloat(item.price) || 0;
            
            return total + (itemPrice * item.quantity);
        }, 0);
        
        console.log('Gesamtpreis:', total);
        return total.toFixed(2);
    }

    // ✅ Neue Hilfsfunktion: Prüfe Stock für einzelnes Produkt
    function checkProductStock(product, requestedQuantity = 1) {
        const availableStock = product.stockQuantity || product.stock || 0;
        return {
            available: availableStock >= requestedQuantity,
            stock: availableStock,
            requested: requestedQuantity
        };
    }

    // ✅ Neue Funktion: Prüfe gesamten Warenkorb auf Verfügbarkeit
    function validateCartStock() {
        const unavailableItems = [];
        
        cartItems.forEach(item => {
            const stockCheck = checkProductStock(item, item.quantity);
            if (!stockCheck.available) {
                unavailableItems.push({
                    ...item,
                    availableStock: stockCheck.stock,
                    requestedQuantity: stockCheck.requested
                });
            }
        });
        
        return {
            isValid: unavailableItems.length === 0,
            unavailableItems
        };
    }

    function startCheckout() {
        console.log('=== START CHECKOUT ===');
        
        // Prüfe Warenkorb-Verfügbarkeit
        const stockValidation = validateCartStock();
        
        if (!stockValidation.isValid) {
            console.log('Stock-Validierung fehlgeschlagen:', stockValidation.unavailableItems);
            
            const itemNames = stockValidation.unavailableItems
                .map(item => `${item.name} (${item.availableStock} verfügbar, ${item.requestedQuantity} gewünscht)`)
                .join('\n');
                
            alert(`Folgende Artikel sind nicht mehr in der gewünschten Menge verfügbar:\n\n${itemNames}\n\nBitte passe die Mengen an.`);
            return false;
        }

        setIsCheckingOut(true);
        return true;
    }

    function cancelCheckout() {
        console.log('=== CANCEL CHECKOUT ===');
        setIsCheckingOut(false);
    }

    async function completeOrder(orderData) {
        console.log('=== COMPLETE ORDER ===');
        console.log('Bestelldaten:', orderData);
        console.log('Warenkorb-Inhalt:', cartItems);
        
        // Hier könntest du die Bestellung an dein Backend senden
        try {
            // The current OpenAPI contract has no order endpoint.
            // Keep this local simulation until an Orders API is specified/generated.

            // Simuliere erfolgreiche Bestellung
            const orderId = 'ORDER-' + Date.now();
            
            // Warenkorb leeren nach erfolgreicher Bestellung
            setCartItems([]);
            setIsCheckingOut(false);
            
            console.log('Bestellung erfolgreich abgeschickt. Order-ID:', orderId);
            
            return {
                success: true,
                orderId: orderId,
                message: 'Bestellung erfolgreich aufgegeben!'
            };
            
        } catch (error) {
            console.error('Fehler bei Bestellabwicklung:', error);
            return {
                success: false,
                error: 'Bestellung konnte nicht verarbeitet werden.',
                message: 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.'
            };
        }
    }

    // ✅ Debug-Funktion: Zeige aktuellen Warenkorb-Status
    function debugCartState() {
        console.log('=== CART DEBUG ===');
        console.log('Anzahl Items:', cartItems.length);
        console.log('Gesamt Artikel:', getTotalItems());
        console.log('Gesamtpreis:', getTotalPrice());
        console.log('Items:', cartItems);
        console.log('Checkout aktiv:', isCheckingOut);
    }

    const value = {
        // State
        cartItems,
        isCheckingOut,
        
        // Warenkorb-Funktionen
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        
        // Berechnungen
        getTotalItems,
        getTotalPrice,
        
        // Checkout-Funktionen
        startCheckout,
        cancelCheckout,
        completeOrder,
        
        // Stock-Hilfsfunktionen
        checkProductStock,
        validateCartStock,
        
        // Debug
        debugCartState
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
