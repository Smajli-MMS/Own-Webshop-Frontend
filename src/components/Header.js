import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from './CartContext';
import logoImg from '../images/logo.png';

function Header({ onShowCart }) {
    const { getTotalItems } = useCart();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    
    // Navigation Handlers
    function handleHomeClick() {
        navigate('/');
    }
    
    function handleProdukteClick() {
        navigate('/produkte');
    }
    
    function handleKontaktClick() {
        navigate('/kontakt');
    }

    function handleCartClick() {
        onShowCart(true);
    }

    // Search Handler
    function handleSearchSubmit(e) {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Suche nach:', searchQuery);
            // Hier würdest du zur Suchergebnisseite navigieren
            // navigate(`/suche?q=${encodeURIComponent(searchQuery)}`);
        }
    }

    function handleSearchChange(e) {
        setSearchQuery(e.target.value);
    }

    const totalItems = getTotalItems();

    // Styles
    const headerStyle = {
        background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
        color: 'white',
        padding: '0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        position: 'relative'
    };

    const topBarStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '15px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(10px)'
    };

    const logoStyle = {
        width: '180px',
        height: 'auto',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, filter 0.3s ease',
        filter: 'brightness(1.1)'
    };

    const searchContainerStyle = {
        position: 'relative',
        width: '100%',
        maxWidth: '450px',
        margin: '0 30px'
    };

    const searchInputStyle = {
        width: '100%',
        padding: '14px 50px 14px 20px',
        border: 'none',
        borderRadius: '30px',
        fontSize: '16px',
        outline: 'none',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: '#333',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    };

    const searchButtonStyle = {
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        padding: '8px',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const cartButtonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        color: 'white',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        padding: '12px 20px',
        borderRadius: '25px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const navBarStyle = {
        padding: '20px 30px',
        display: 'flex',
        gap: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)'
    };

    const navButtonStyle = {
        padding: '12px 25px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(5px)',
        position: 'relative',
        overflow: 'hidden'
    };

    const badgeStyle = {
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        backgroundColor: '#ffd700',
        color: '#e53e3e',
        borderRadius: '50%',
        width: '26px',
        height: '26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        animation: 'pulse 2s infinite'
    };

    const centerContentStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        flex: 1
    };

    const promoTextStyle = {
        margin: '0 0 15px 0', 
        fontSize: '18px', 
        fontWeight: 'bold',
        textAlign: 'center'
    };

    return (
        <header style={headerStyle} role="banner">
            <style>
                {`
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                    
                    .header-logo:hover {
                        transform: scale(1.05) !important;
                        filter: brightness(1.2) !important;
                    }
                    
                    .header-logo:focus {
                        outline: 2px solid #ffd700 !important;
                        outline-offset: 4px !important;
                    }
                    
                    .search-input:focus {
                        background-color: white !important;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
                        transform: translateY(-2px) !important;
                    }
                    
                    .search-button:hover {
                        background-color: rgba(229, 62, 62, 0.1) !important;
                        color: #e53e3e !important;
                        transform: translateY(-50%) scale(1.1) !important;
                    }
                    
                    .search-button:focus {
                        outline: 2px solid #e53e3e !important;
                        outline-offset: 2px !important;
                    }
                    
                    .cart-button:hover {
                        background-color: rgba(255, 255, 255, 0.25) !important;
                        border-color: rgba(255, 255, 255, 0.5) !important;
                        transform: translateY(-2px) !important;
                        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
                    }
                    
                    .cart-button:focus {
                        outline: 2px solid #ffd700 !important;
                        outline-offset: 2px !important;
                    }
                    
                    .nav-button:hover {
                        background-color: rgba(255, 255, 255, 0.2) !important;
                        border-color: rgba(255, 255, 255, 0.4) !important;
                        transform: translateY(-3px) !important;
                        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2) !important;
                    }
                    
                    .nav-button:focus {
                        outline: 2px solid #ffd700 !important;
                        outline-offset: 2px !important;
                    }
                    
                    .nav-button:active {
                        transform: translateY(-1px) !important;
                    }
                    
                    .promo-text {
                        background: linear-gradient(45deg, #ffd700, #ffed4e);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: shimmer 3s ease-in-out infinite;
                    }
                    
                    @keyframes shimmer {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.8; }
                    }
                    
                    @media (max-width: 768px) {
                        .header-top-bar {
                            flex-direction: column !important;
                            gap: 15px !important;
                            padding: 20px !important;
                        }
                        
                        .header-center-content {
                            order: 2 !important;
                            width: 100% !important;
                            margin: 0 !important;
                        }
                        
                        .header-nav-bar {
                            flex-wrap: wrap !important;
                            justify-content: center !important;
                            padding: 15px !important;
                        }
                        
                        .promo-text {
                            font-size: 16px !important;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .header-logo {
                            width: 150px !important;
                        }
                        
                        .search-input {
                            font-size: 14px !important;
                            padding: 12px 45px 12px 15px !important;
                        }
                        
                        .nav-button {
                            padding: 10px 20px !important;
                            font-size: 14px !important;
                        }
                    }
                `}
            </style>
            
            <div style={topBarStyle} className="header-top-bar">
                <button
                    style={{...logoStyle, background: 'none', border: 'none', padding: 0}}
                    className="header-logo"
                    onClick={handleHomeClick}
                    aria-label="Zur Startseite"
                    type="button"
                >
                    <img 
                        src={logoImg}
                        alt="MediaMarktSaturn Logo"
                        style={{width: '100%', height: 'auto', display: 'block'}}
                    />
                </button>
                
                <div style={centerContentStyle} className="header-center-content">
                    <p style={promoTextStyle} className="promo-text">
                        ⚡ Top Angebote und Aktionen! ⚡
                    </p>
                    
                    <form 
                        style={searchContainerStyle}
                        onSubmit={handleSearchSubmit}
                        role="search"
                        aria-label="Produktsuche"
                    >
                        <input
                            type="search"
                            placeholder="Suche nach Produkten, Marken..."
                            style={searchInputStyle}
                            className="search-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            aria-label="Suchbegriff eingeben"
                        />
                        <button 
                            type="submit"
                            style={searchButtonStyle}
                            className="search-button"
                            aria-label="Suche starten"
                        >
                            🔍
                        </button>
                    </form>
                </div>

                <div style={{position: 'relative'}}>
                    <button 
                        style={cartButtonStyle}
                        className="cart-button"
                        onClick={handleCartClick}
                        aria-label={`Warenkorb öffnen${totalItems > 0 ? ` - ${totalItems} Artikel` : ''}`}
                        type="button"
                    >
                        <span aria-hidden="true">🛒</span>
                        <span>Warenkorb</span>
                    </button>
                    
                    {totalItems > 0 && (
                        <span 
                            style={badgeStyle}
                            aria-label={`${totalItems} Artikel im Warenkorb`}
                            role="status"
                        >
                            {totalItems > 99 ? '99+' : totalItems}
                        </span>
                    )}
                </div>
            </div>
            
            <nav style={navBarStyle} className="header-nav-bar" role="navigation" aria-label="Hauptnavigation">
                <button 
                    style={navButtonStyle}
                    className="nav-button"
                    onClick={handleHomeClick}
                    type="button"
                    aria-label="Zur Startseite"
                >
                    <span aria-hidden="true">🏠</span> Home
                </button>
                <button 
                    style={navButtonStyle}
                    className="nav-button"
                    onClick={handleProdukteClick}
                    type="button"
                    aria-label="Zu den Produkten"
                >
                    <span aria-hidden="true">📱</span> Produkte
                </button>
                <button 
                    style={navButtonStyle}
                    className="nav-button"
                    onClick={handleKontaktClick}
                    type="button"
                    aria-label="Zum Kontakt"
                >
                    <span aria-hidden="true">📞</span> Kontakt
                </button>
            </nav>
        </header>
    );
}

export default Header;