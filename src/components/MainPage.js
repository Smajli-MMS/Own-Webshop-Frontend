import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { getProductDetails } from './productDetailsModal';
import StockService from './StockService';
import { productsApi, marketsApi } from '../api';

// Alle Marken-Bilder importieren
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

function MainPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showMarketModal, setShowMarketModal] = useState(false);
    const [selectedProductForMarkets, setSelectedProductForMarkets] = useState(null);
    const { addToCart, loadStockData } = useCart();

    async function loadProducts() {
    try {
        console.log('=== LADE PRODUKTE MIT STOCK ===');
        const data = await productsApi.getAllProductsWithStock();
        
        console.log('Anzahl Produkte:', data.length);
        console.log('Erstes Produkt komplett:', JSON.stringify(data[0], null, 2));
        
        // Prüfe alle Stock-Werte
        data.forEach((product, index) => {
            console.log(`Produkt ${index + 1}:`, {
                id: product.productId,
                name: product.name,
                stockQuantity: product.stockQuantity,
                stock: product.stock,
                hasStock: product.stockQuantity !== undefined || product.stock !== undefined
            });
        });
        
        setProducts(data);
        setLoading(false);
    } catch (error) {
        console.error('Fehler beim Laden:', error);
        setLoading(false);
    }
}


    useEffect(() => {
        loadProducts();
    }, []);

    function getProductImage(productGroupId, productName) {
        const name = productName.toLowerCase();
        
        // SMARTPHONES (Kategorie 1)
        if (productGroupId === 1) {
            if (name.includes('iphone')) return iphoneImg;
            if (name.includes('samsung')) return samsungImg;
            if (name.includes('xiaomi') || name.includes('mi 13')) return xiaomiImg;
            if (name.includes('oneplus')) return oneplusImg;
            if (name.includes('nokia')) return nokiaImg;
            return 'https://via.placeholder.com/200x200/17a2b8/ffffff?text=Phone';
        }
        
        // GAMING (Kategorie 2)
        if (productGroupId === 2) {
            if (name.includes('sony') || name.includes('wh-1000xm4')) return sonyImg;
            if (name.includes('playstation')) return playstationImg;
            if (name.includes('xbox')) return xboxImg;
            if (name.includes('nintendo') || name.includes('switch')) return nintendoImg;
            if (name.includes('logitech') || name.includes('gaming mouse')) return logitechImg;
            return 'https://via.placeholder.com/200x200/dc3545/ffffff?text=Gaming';
        }
        
        // PCS (Kategorie 3)
        if (productGroupId === 3) {
            if (name.includes('macbook')) return macbookImg;
            if (name.includes('dell') || name.includes('xps')) return dellImg;
            if (name.includes('hp') || name.includes('pavilion') || name.includes('elitebook')) return hpImg;
            return 'https://via.placeholder.com/200x200/fd7e14/ffffff?text=PC';
        }
        
        // WASCHMASCHINEN (Kategorie 4)
        if (productGroupId === 4) {
            if (name.includes('miele')) return mieleImg;
            if (name.includes('lg') || name.includes('front load')) return lgImg;
            if (name.includes('bosch')) return boschImg;
            return 'https://via.placeholder.com/200x200/20c997/ffffff?text=Waschmaschine';
        }
        
        return 'https://via.placeholder.com/200x200/6c757d/ffffff?text=Produkt';
    }

    async function handleAddToCart(product) {
        try {
            console.log('=== WARENKORB HINZUFÜGEN ===');
            console.log('Produkt:', product);
            
            // Lade aktuelle Stock-Daten für das spezifische Produkt
            const stockData = await StockService.getStockByProductId(product.productId);
            console.log('Stock-Daten für Produkt:', product.productId, stockData);
            
            // Erstelle Produkt mit aktuellen Stock-Informationen
            const productWithStock = {
                ...product,
                stock: stockData.stock || 0
            };
            
            console.log('Produkt mit Stock:', productWithStock);
            
            // Füge zum Warenkorb hinzu
            addToCart(productWithStock);
            
        } catch (error) {
            console.error('Fehler beim Laden der Stock-Daten:', error);
            
            // Fallback: Lade Stock-Daten im CartContext neu und versuche es dann
            try {
                await loadStockData();
                addToCart(product);
            } catch (fallbackError) {
                console.error('Auch Fallback fehlgeschlagen:', fallbackError);
                // Als letzter Ausweg: Füge Produkt mit Default-Stock hinzu
                addToCart({...product, stock: 99});
            }
        }
    }

    function handleShowDetails(product) {
        setSelectedProduct(product);
    }

    function handleCloseDetails() {
        setSelectedProduct(null);
    }

    // Neue Funktionen für Marktauswahl
    function handleShowMarkets(product) {
        setSelectedProductForMarkets(product);
        setShowMarketModal(true);
    }

    function handleCloseMarketModal() {
        setShowMarketModal(false);
        setSelectedProductForMarkets(null);
    }

    // Detail-Modal Komponente
    function ProductDetailModal({ product, onClose }) {
        const details = getProductDetails(product);
        
        return (
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    maxWidth: '800px',
                    maxHeight: '90%',
                    overflow: 'auto',
                    position: 'relative'
                }}>
                    {/* Header mit Schließen-Button */}
                    <div style={{
                        position: 'sticky',
                        top: '0',
                        backgroundColor: 'white',
                        borderBottom: '1px solid #eee',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h2 style={{margin: '0'}}>{product.name}</h2>
                        <button 
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#999'
                            }}
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Produkt-Content */}
                    <div style={{padding: '20px'}}>
                        {/* Bild und Grundinfos */}
                        <div style={{
                            display: 'flex',
                            gap: '30px',
                            marginBottom: '30px',
                            flexWrap: 'wrap'
                        }}>
                            <img 
                                src={getProductImage(product.productGroupId, product.name)}
                                alt={product.name}
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                }}
                            />
                            
                            <div style={{flex: 1, minWidth: '300px'}}>
                                <h3 style={{color: '#333', marginBottom: '15px'}}>Produktinformationen</h3>
                                <p style={{fontSize: '24px', color: 'green', fontWeight: 'bold', marginBottom: '15px'}}>
                                    €{product.price}
                                </p>
                                <p style={{color: '#666', lineHeight: '1.6', marginBottom: '20px'}}>
                                    {details.description}
                                </p>
                                
                                <div style={{marginBottom: '20px'}}>
                                    <p><strong>Bewertung:</strong> {details.rating}</p>
                                    <p><strong>Garantie:</strong> {details.warranty}</p>
                                    <p><strong>Lieferung:</strong> {details.delivery}</p>
                                </div>

                                <button 
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        backgroundColor: 'green',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    🛒 In den Warenkorb - €{product.price}
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div style={{marginBottom: '30px'}}>
                            <h3 style={{color: '#333', marginBottom: '15px'}}>Produktfeatures</h3>
                            <ul style={{listStyle: 'none', padding: '0'}}>
                                {details.features.map((feature, index) => (
                                    <li key={index} style={{
                                        padding: '8px 0',
                                        borderBottom: '1px solid #eee',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{color: 'green', marginRight: '10px'}}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technische Daten */}
                        <div style={{marginBottom: '20px'}}>
                            <h3 style={{color: '#333', marginBottom: '15px'}}>Technische Daten</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '10px',
                                backgroundColor: '#f9f9f9',
                                padding: '20px',
                                borderRadius: '8px'
                            }}>
                                {Object.entries(details.specifications).map(([key, value], index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 0',
                                        borderBottom: '1px solid #ddd'
                                    }}>
                                        <strong>{key}:</strong>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Neue Marktauswahl-Modal Komponente
    function MarketAvailabilityModal({ product, onClose }) {
        const [marketData, setMarketData] = useState(null);
        const [loadingMarkets, setLoadingMarkets] = useState(true);

        useEffect(() => {
            async function loadMarketAvailability() {
                try {
                    const data = await marketsApi.getProductStockInAllMarkets({
                        productId: product.productId
                    });
                    console.log('Marktdaten geladen:', data);
                    setMarketData(data);
                    setLoadingMarkets(false);
                } catch (error) {
                    console.error('Fehler beim Laden der Marktdaten:', error);
                    setLoadingMarkets(false);
                }
            }

            if (product) {
                loadMarketAvailability();
            }
        }, [product]);

        function getMarketIcon(marketName) {
            if (marketName.includes('Online')) return '🌐';
            if (marketName.includes('München')) return '🏢';
            if (marketName.includes('Hamburg')) return '⚓';
            if (marketName.includes('Berlin')) return '🏛️';
            return '🏭';
        }

        function getStockColor(stock) {
            if (stock === 0) return '#ff4444';
            if (stock <= 5) return '#ff8800';
            if (stock <= 15) return '#ffaa00';
            return '#44aa44';
        }

        return (
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1100,
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    maxWidth: '900px',
                    width: '100%',
                    maxHeight: '80%',
                    overflow: 'auto'
                }}>
                    {/* Header */}
                    <div style={{
                        position: 'sticky',
                        top: '0',
                        backgroundColor: 'white',
                        borderBottom: '2px solid #eee',
                        padding: '25px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '15px 15px 0 0'
                    }}>
                        <div>
                            <h2 style={{margin: '0 0 5px 0', color: '#333'}}>
                                 Verfügbarkeit in unseren Märkten
                            </h2>
                            <p style={{margin: '0', color: '#666', fontSize: '16px'}}>
                                {product.name} - €{product.price}
                            </p>
                        </div>
                        <button 
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                fontSize: '28px',
                                cursor: 'pointer',
                                color: '#999',
                                padding: '5px'
                            }}
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{padding: '25px'}}>
                        {loadingMarkets ? (
                            <div style={{textAlign: 'center', padding: '40px'}}>
                                <p>Lade Marktdaten...</p>
                            </div>
                        ) : marketData ? (
                            <div>
                                {/* Gesamtübersicht */}
                                <div style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    marginBottom: '25px',
                                    textAlign: 'center'
                                }}>
                                    <h3 style={{margin: '0 0 10px 0', color: '#333'}}>
                                        📊 Gesamtbestand: {marketData.totalStock} Stück
                                    </h3>
                                    <p style={{margin: '0', color: '#666'}}>
                                        Verfügbar in {marketData.availableInMarkets ? marketData.availableInMarkets.filter(m => m.available).length : 0} von {marketData.availableInMarkets ? marketData.availableInMarkets.length : 0} Märkten
                                    </p>
                                </div>

                                {/* Markt-Grid */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '20px'
                                }}>
                                    {marketData.availableInMarkets && marketData.availableInMarkets.map((market, index) => (
                                        <div 
                                            key={index}
                                            style={{
                                                border: market.available ? '2px solid #44aa44' : '2px solid #ddd',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                backgroundColor: market.available ? '#f8fff8' : '#f8f8f8',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: '15px'
                                            }}>
                                                <div style={{flex: 1}}>
                                                    <h4 style={{
                                                        margin: '0 0 8px 0', 
                                                        color: '#333',
                                                        fontSize: '16px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}>
                                                        {getMarketIcon(market.marketName)}
                                                        {market.marketName}
                                                    </h4>
                                                    <p style={{
                                                        margin: '0',
                                                        color: '#666',
                                                        fontSize: '14px'
                                                    }}>
                                                        📍 {market.location}
                                                    </p>
                                                </div>
                                                
                                                <div style={{
                                                    backgroundColor: getStockColor(market.stock),
                                                    color: 'white',
                                                    padding: '8px 12px',
                                                    borderRadius: '20px',
                                                    fontWeight: 'bold',
                                                    fontSize: '14px',
                                                    minWidth: '60px',
                                                    textAlign: 'center'
                                                }}>
                                                    {market.stock} Stk.
                                                </div>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginTop: '15px'
                                            }}>
                                                <span style={{
                                                    fontSize: '14px',
                                                    color: market.available ? '#44aa44' : '#999',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {market.available ? '✅ Verfügbar' : '❌ Nicht verfügbar'}
                                                </span>

                                                {market.available && (
                                                    <button 
                                                        style={{
                                                            padding: '8px 16px',
                                                            backgroundColor: '#f30505',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            fontSize: '12px',
                                                            cursor: 'pointer',
                                                            fontWeight: 'bold'
                                                        }}
                                                        onClick={() => {
                                                            alert(`Reservierung für ${market.marketName} würde hier stattfinden`);
                                                        }}
                                                    >
                                                        🏪 Reservieren
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{textAlign: 'center', padding: '40px'}}>
                                <p style={{color: '#999'}}>Keine Marktdaten verfügbar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return ( 
        <div style={{padding: '40px', minHeight: '400px'}}>
            <p></p>
            
            <div style={{marginTop: '30px'}}>
                <h3>Unsere Produkte ({products.length} Artikel):</h3>
                
                {loading ? (
                    <p>Lade Produkte...</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '20px',
                        marginTop: '20px'
                    }}>
                        {products.map(product => (
                            <div 
                                key={product.productId}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    backgroundColor: '#f9f9f9',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: 'fit-content'
                                }}
                            >
                                <img 
                                    src={getProductImage(product.productGroupId, product.name)}
                                    alt={product.name}
                                    style={{
                                        width: '180px',
                                        height: '180px',
                                        borderRadius: '20px',
                                        objectFit: 'scale-down',
                                        marginBottom: '15px'
                                    }}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/200x200/6c757d/ffffff?text=Kein+Bild';
                                    }}
                                />
                                
                                <div style={{width: '100%'}}>
                                    <h4 style={{margin: '0 0 10px 0', fontSize: '16px'}}>{product.name}</h4>
                                    <p style={{margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold', color: 'green'}}>
                                        €{product.price}
                                    </p>
                                    
                                    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                        <button 
                                            style={{
                                                padding: '10px 16px',
                                                backgroundColor: 'transparent',
                                                color: '#333',
                                                border: '2px solid #333',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = '#333';
                                                e.target.style.color = 'white';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#333';
                                            }}
                                            onClick={() => handleShowDetails(product)}
                                        >
                                            📋 Details anzeigen
                                        </button>

                                        <button 
                                            style={{
                                                padding: '10px 16px',
                                                backgroundColor: '#0e6159',
                                                color: 'white',
                                                border: '2px solid #194e50',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#194e50'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = '#2b6668'}
                                            onClick={() => handleShowMarkets(product)}
                                        >
                                             Verfügbarkeit in Märkten
                                        </button>
                                        
                                        <button 
                                            style={{
                                                padding: '10px 16px',
                                                backgroundColor: '#333',
                                                color: 'white',
                                                border: '2px solid #333',
                                                borderRadius: '4px',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = '#333'}
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            🛒 In den Warenkorb
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <button 
                    style={{
                        padding: '15px 30px', 
                        backgroundColor: 'green', 
                        color: 'white',
                        border: 'none',
                        marginTop: '20px',
                        borderRadius: '4px'
                    }}
                    onClick={loadProducts}
                >
                    Produkte neu laden
                </button>
            </div>

            {/* Detail-Modal anzeigen wenn Produkt ausgewählt */}
            {selectedProduct && (
                <ProductDetailModal 
                    product={selectedProduct} 
                    onClose={handleCloseDetails}
                />
            )}

            {/* Marktauswahl-Modal anzeigen */}
            {showMarketModal && selectedProductForMarkets && (
                <MarketAvailabilityModal 
                    product={selectedProductForMarkets} 
                    onClose={handleCloseMarketModal}
                />
            )}
        </div>
    );
}

export default MainPage;