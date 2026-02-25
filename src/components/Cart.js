import { useState } from 'react';
import { useCart } from './CartContext';
import Checkout from './Checkout';

// Importiere alle Bilder
import iphoneImg from '../images/iphone.jpg';
import samsungImg from '../images/samsung.jpg';
import sonyImg from '../images/sony.jpg';
import xiaomiImg from '../images/xiaomi.jpg';
import oneplusImg from '../images/oneplus.jpg';
import nintendoImg from '../images/nintendo.jpg';
import dellImg from '../images/dell.jpg';
import hpImg from '../images/hp.jpg';
import mieleImg from '../images/miele.jpg';
import lgImg from '../images/lg.jpg';
import logitechImg from '../images/logitech.jpg';
import nokiaImg from '../images/nokia.jpg';
import boschImg from '../images/bosch.jpg';
import playstationImg from '../images/playstation.jpg';
import xboxImg from '../images/xbox.jpg';
import macbookImg from '../images/macbook.jpg';

function Cart({ onClose }) {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getTotalPrice,
        getTotalItems,
        startCheckout,
        isCheckingOut,
        checkProductStock,
    } = useCart();

    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const [animatingItems, setAnimatingItems] = useState(new Set());

    // Image-Mapping basierend auf Produktnamen oder IDs
    const getProductImage = (product) => {
        const productName = product.name?.toLowerCase() || '';
        const productId = product.productId?.toString() || '';
        
        // Mapping basierend auf Produktnamen
        if (productName.includes('iphone') || productName.includes('apple')) {
            return iphoneImg;
        } else if (productName.includes('samsung')) {
            return samsungImg;
        } else if (productName.includes('sony')) {
            return sonyImg;
        } else if (productName.includes('xiaomi')) {
            return xiaomiImg;
        } else if (productName.includes('oneplus') || productName.includes('one plus')) {
            return oneplusImg;
        } else if (productName.includes('nintendo')) {
            return nintendoImg;
        } else if (productName.includes('dell')) {
            return dellImg;
        } else if (productName.includes('hp')) {
            return hpImg;
        } else if (productName.includes('miele')) {
            return mieleImg;
        } else if (productName.includes('lg')) {
            return lgImg;
        } else if (productName.includes('logitech')) {
            return logitechImg;
        } else if (productName.includes('nokia')) {
            return nokiaImg;
        } else if (productName.includes('bosch')) {
            return boschImg;
        } else if (productName.includes('playstation') || productName.includes('ps5') || productName.includes('ps4')) {
            return playstationImg;
        } else if (productName.includes('xbox')) {
            return xboxImg;
        } else if (productName.includes('macbook') || productName.includes('mac')) {
            return macbookImg;
        }
        
        // Fallback: Mapping basierend auf Produkt-ID
        const imageMap = {
            '1': iphoneImg,
            '2': samsungImg,
            '3': sonyImg,
            '4': xiaomiImg,
            '5': oneplusImg,
            '6': nintendoImg,
            '7': dellImg,
            '8': hpImg,
            '9': mieleImg,
            '10': lgImg,
            '11': logitechImg,
            '12': nokiaImg,
            '13': boschImg,
            '14': playstationImg,
            '15': xboxImg,
            '16': macbookImg
        };
        
        return imageMap[productId] || null;
    };

    if (isCheckingOut) {
        return <Checkout onClose={onClose} />;
    }

    // ✅ KORRIGIERT: Stock-Status mit neuer checkProductStock Funktion
    const getStockStatus = (item) => {
        console.log('=== STOCK STATUS DEBUG ===');
        console.log('Item:', item);
        console.log('StockQuantity:', item.stockQuantity);
        console.log('Stock (fallback):', item.stock);
        
        // Verwende Stock-Daten direkt aus dem Cart-Item
        const availableStock = item.stockQuantity || item.stock || 0;
        const currentQuantity = item.quantity || 1;
        
        console.log('Available Stock:', availableStock);
        console.log('Current Quantity:', currentQuantity);
        
        if (availableStock === 0) {
            return { 
                message: "Nicht verfügbar", 
                style: styles.stockWarning 
            };
        } else if (availableStock < currentQuantity) {
            return { 
                message: `Nur noch ${availableStock} verfügbar (${currentQuantity} im Warenkorb)`, 
                style: styles.stockWarning 
            };
        } else if (availableStock < 5) {
            return { 
                message: `Nur noch ${availableStock} verfügbar`, 
                style: styles.stockCritical 
            };
        } else if (availableStock < 20) {
            return { 
                message: `${availableStock} verfügbar`, 
                style: styles.stockInfo 
            };
        }
        return null;
    };

    // Animation für das Entfernen von Items
    const handleRemoveItem = (productId) => {
        setAnimatingItems(prev => new Set(prev).add(productId));
        setTimeout(() => {
            removeFromCart(productId);
            setAnimatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }, 300);
    };

    // ✅ KORRIGIERT: Menge mit Validierung ändern
    const handleQuantityChange = (productId, change) => {
        const item = cartItems.find(item => item.productId === productId);
        if (!item) return;
        
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            handleRemoveItem(productId);
            return;
        }
        
        if (newQuantity > 99) {
            alert('Maximale Menge: 99 Stück');
            return;
        }
        
        // Stock-Prüfung mit verfügbaren Daten
        const availableStock = item.stockQuantity || item.stock || 0;
        if (newQuantity > availableStock) {
            alert(`Nur noch ${availableStock} Stück verfügbar!`);
            return;
        }
        
        updateQuantity(productId, newQuantity);
    };

    // ✅ KORRIGIERT: Direkte Eingabe der Menge
    const handleQuantityInput = (productId, value) => {
        const item = cartItems.find(item => item.productId === productId);
        if (!item) return;
        
        const quantity = parseInt(value) || 1;
        
        if (quantity <= 0) {
            handleRemoveItem(productId);
            return;
        }
        
        if (quantity > 99) {
            alert('Maximale Menge: 99 Stück');
            return;
        }
        
        // Stock-Prüfung
        const availableStock = item.stockQuantity || item.stock || 0;
        if (quantity > availableStock) {
            alert(`Nur noch ${availableStock} Stück verfügbar!`);
            return;
        }
        
        updateQuantity(productId, quantity);
    };

    // Warenkorb leeren mit Bestätigung
    const handleClearCart = () => {
        if (showConfirmClear) {
            clearCart();
            setShowConfirmClear(false);
        } else {
            setShowConfirmClear(true);
            setTimeout(() => setShowConfirmClear(false), 3000);
        }
    };

    // ✅ KORRIGIERT: Sichere Preis-Behandlung
    const getItemPrice = (item) => {
        if (typeof item.price === 'object' && item.price !== null) {
            // BigDecimal Objekt
            return parseFloat(item.price) || 0;
        }
        return parseFloat(item.price) || 0;
    };

    // Style (bleibt gleich)
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        },
        modal: {
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            maxWidth: '700px',
            width: '90vw',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideIn 0.3s ease-out'
        },
        emptyModal: {
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            maxWidth: '400px',
            width: '90vw',
            padding: '40px',
            textAlign: 'center'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            borderBottom: '1px solid #e5e5e5',
            background: 'linear-gradient(135deg, #fb0303 0%, #fe0303 100%)',
            color: 'white'
        },
        title: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        titleH2: {
            margin: 0,
            fontSize: '24px',
            fontWeight: '600'
        },
        count: {
            fontSize: '14px',
            opacity: 0.9
        },
        closeBtn: {
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            fontSize: '24px',
            transition: 'background 0.2s'
        },
        body: {
            flex: 1,
            overflow: 'auto',
            padding: '0'
        },
        items: {
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '16px'
        },
        item: {
            display: 'grid',
            gridTemplateColumns: '80px 1fr auto auto auto',
            gap: '16px',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid #f0f0f0',
            transition: 'all 0.3s ease',
            borderRadius: '8px',
            margin: '8px 0'
        },
        itemRemoving: {
            opacity: 0,
            transform: 'translateX(-20px)',
            background: '#ffebee'
        },
        productImage: {
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            objectFit: 'cover',
            border: '2px solid #f0f0f0',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        },
        imagePlaceholder: {
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        },
        info: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        name: {
            margin: 0,
            fontSize: '16px',
            fontWeight: '500',
            color: '#333'
        },
        price: {
            margin: 0,
            fontSize: '14px',
            color: '#666'
        },
        description: {
            margin: 0,
            fontSize: '12px',
            color: '#999'
        },
        stockInfo: {
            fontSize: '12px',
            color: '#28a745',
            marginTop: '4px'
        },
        stockWarning: {
            fontSize: '12px',
            color: '#dc3545',
            marginTop: '4px',
            fontWeight: '500'
        },
        stockCritical: {
            fontSize: '12px',
            color: '#fd7e14',
            marginTop: '4px',
            fontWeight: '500'
        },
        quantity: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f8f9fa',
            borderRadius: '8px',
            padding: '4px'
        },
        qtyBtn: {
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'all 0.2s'
        },
        qtyBtnDisabled: {
            background: '#f5f5f5',
            color: '#ccc',
            cursor: 'not-allowed'
        },
        qtyInput: {
            width: '50px',
            height: '32px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '14px'
        },
        total: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px'
        },
        totalPrice: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#333'
        },
        removeBtn: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            transition: 'background 0.2s',
            fontSize: '18px'
        },
        summary: {
            padding: '24px',
            borderTop: '1px solid #e5e5e5',
            background: '#f8f9fa'
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '8px 0'
        },
        totalRow: {
            borderTop: '1px solid #ddd',
            paddingTop: '12px',
            marginTop: '12px',
            fontSize: '18px',
            fontWeight: '600'
        },
        freeShipping: {
            color: '#28a745',
            fontWeight: '500'
        },
        totalAmount: {
            color: '#333',
            fontSize: '20px'
        },
        savingsInfo: {
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '14px',
            marginTop: '12px'
        },
        footer: {
            padding: '24px',
            borderTop: '1px solid #e5e5e5',
            background: 'white'
        },
        actions: {
            display: 'flex',
            gap: '12px',
            marginBottom: '12px'
        },
        btn: {
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            flex: 1
        },
        btnClear: {
            background: '#6c757d',
            color: 'white'
        },
        btnClearConfirm: {
            background: '#dc3545',
            color: 'white',
            animation: 'pulse 1s infinite'
        },
        btnContinue: {
            background: '#f8f9fa',
            color: '#333',
            border: '1px solid #ddd'
        },
        btnCheckout: {
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600'
        },
        secureCheckout: {
            textAlign: 'center',
            fontSize: '12px',
            color: '#666',
            marginTop: '8px'
        },
        emptyContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        },
        emptyIcon: {
            fontSize: '64px',
            opacity: 0.5
        },
        emptyH2: {
            margin: 0,
            color: '#333',
            fontSize: '24px'
        },
        emptyP: {
            margin: 0,
            color: '#666',
            lineHeight: 1.5
        },
        btnPrimary: {
            background: 'linear-gradient(135deg, #ff0000 0%, #090202 100%)',
            color: 'white',
            padding: '12px 32px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'transform 0.2s'
        }
    };

    // Leerer Warenkorb
    if (cartItems.length === 0) {
        return (
            <div style={styles.overlay}>
                <div style={styles.emptyModal}>
                    <button 
                        style={{...styles.closeBtn, position: 'absolute', top: '16px', right: '16px'}} 
                        onClick={onClose}
                    >
                        <span>&times;</span>
                    </button>
                    
                    <div style={styles.emptyContent}>
                        <div style={styles.emptyIcon}>🛒</div>
                        <h2 style={styles.emptyH2}>Dein Warenkorb ist leer</h2>
                        <p style={styles.emptyP}>Entdecke unsere Produkte und füge sie zu deinem Warenkorb hinzu!</p>
                        <button 
                            style={styles.btnPrimary} 
                            onClick={onClose}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            Jetzt einkaufen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <style>
                    {`
                        @keyframes slideIn {
                            from {
                                opacity: 0;
                                transform: translateY(-20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        
                        @keyframes pulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.05); }
                        }
                        
                        .product-image:hover {
                            transform: scale(1.05) !important;
                        }
                    `}
                </style>
                
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.title}>
                        <h2 style={styles.titleH2}>Warenkorb</h2>
                        <span style={styles.count}>{getTotalItems()} Artikel</span>
                    </div>
                    <button 
                        style={styles.closeBtn} 
                        onClick={onClose}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                    >
                        <span>&times;</span>
                    </button>
                </div>

                {/* Items Liste */}
                <div style={styles.body}>
                    <div style={styles.items}>
                        {cartItems.map(item => {
                            const stockStatus = getStockStatus(item); // ✅ KORRIGIERT
                            const productImage = getProductImage(item);
                            const itemPrice = getItemPrice(item); // ✅ KORRIGIERT
                            
                            return (
                                <div 
                                    key={item.productId} 
                                    style={{
                                        ...styles.item,
                                        ...(animatingItems.has(item.productId) ? styles.itemRemoving : {})
                                    }}
                                >
                                    {/* Produktbild */}
                                    {productImage ? (
                                        <img 
                                            src={productImage}
                                            alt={item.name}
                                            style={styles.productImage}
                                            className="product-image"
                                        />
                                    ) : (
                                        <div style={styles.imagePlaceholder}>
                                            {item.name.charAt(0)}
                                        </div>
                                    )}

                                    {/* Produktinfo */}
                                    <div style={styles.info}>
                                        <h4 style={styles.name}>{item.name}</h4>
                                        <p style={styles.price}>€{itemPrice.toFixed(2)}</p>
                                        {item.description && (
                                            <p style={styles.description}>{item.description}</p>
                                        )}
                                        {/* Stock-Status anzeigen */}
                                        {stockStatus && (
                                            <p style={stockStatus.style}>{stockStatus.message}</p>
                                        )}
                                    </div>

                                    {/* Menge Controls */}
                                    <div style={styles.quantity}>
                                        <button 
                                            style={{
                                                ...styles.qtyBtn,
                                                ...(item.quantity <= 1 ? styles.qtyBtnDisabled : {})
                                            }}
                                            onClick={() => handleQuantityChange(item.productId, -1)}
                                            disabled={item.quantity <= 1}
                                            onMouseEnter={(e) => {
                                                if (!e.target.disabled) e.target.style.background = '#e9ecef';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!e.target.disabled) e.target.style.background = 'white';
                                            }}
                                        >
                                            −
                                        </button>
                                        
                                        <input 
                                            type="number"
                                            style={styles.qtyInput}
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityInput(item.productId, e.target.value)}
                                            min="1"
                                            max="99"
                                        />
                                        
                                        <button 
                                            style={{
                                                ...styles.qtyBtn,
                                                ...(item.quantity >= 99 ? styles.qtyBtnDisabled : {})
                                            }}
                                            onClick={() => handleQuantityChange(item.productId, 1)}
                                            disabled={item.quantity >= 99}
                                            onMouseEnter={(e) => {
                                                if (!e.target.disabled) e.target.style.background = '#e9ecef';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!e.target.disabled) e.target.style.background = 'white';
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Gesamtpreis für Item */}
                                    <div style={styles.total}>
                                        <span style={styles.totalPrice}>
                                            €{(itemPrice * item.quantity).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Entfernen Button */}
                                    <button 
                                        style={styles.removeBtn}
                                        onClick={() => handleRemoveItem(item.productId)}
                                        title="Artikel entfernen"
                                        onMouseEnter={(e) => e.target.style.background = '#ffebee'}
                                        onMouseLeave={(e) => e.target.style.background = 'none'}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Warenkorb Zusammenfassung */}
                    <div style={styles.summary}>
                        <div style={styles.summaryRow}>
                            <span>Zwischensumme:</span>
                            <span>€{getTotalPrice()}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Versandkosten:</span>
                            <span style={styles.freeShipping}>Kostenlos</span>
                        </div>
                        <div style={{...styles.summaryRow, ...styles.totalRow}}>
                            <span>Gesamtsumme:</span>
                            <span style={styles.totalAmount}>€{getTotalPrice()}</span>
                        </div>
                        
                        <div style={styles.savingsInfo}>
                            <span>🎉 Bei einem Mindestbestellwert von 80€ sparst du dir die Versandkosten!</span>
                        </div>
                    </div>
                </div>

                {/* Footer mit Aktionen */}
                <div style={styles.footer}>
                    <div style={styles.actions}>
                        <button 
                            style={{
                                ...styles.btn,
                                ...(showConfirmClear ? styles.btnClearConfirm : styles.btnClear)
                            }}
                            onClick={handleClearCart}
                            onMouseEnter={(e) => {
                                if (!showConfirmClear) {
                                    e.target.style.background = '#5a6268';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!showConfirmClear) {
                                    e.target.style.background = '#6c757d';
                                }
                            }}
                        >
                            {showConfirmClear ? 'Wirklich leeren?' : 'Warenkorb leeren'}
                        </button>
                        
                        <button 
                            style={{...styles.btn, ...styles.btnContinue}}
                            onClick={onClose}
                            onMouseEnter={(e) => e.target.style.background = '#e9ecef'}
                            onMouseLeave={(e) => e.target.style.background = '#f8f9fa'}
                        >
                            Weiter einkaufen
                        </button>
                        
                        <button 
                            style={{...styles.btn, ...styles.btnCheckout}}
                            onClick={startCheckout}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            Zur Kasse ({getTotalItems()})
                        </button>
                    </div>
                    
                    <div style={styles.secureCheckout}>
                        <span>🔒 Sicherer Checkout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
