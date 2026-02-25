function Footer() {
    // Styles
    const footerStyle = {
        background: 'linear-gradient(135deg, #c53030 0%, #e53e3e 100%)',
        color: 'white',
        padding: '0',
        marginTop: 'auto'
    };

    const mainContentStyle = {
        padding: '40px 30px 30px 30px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const sectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px',
        background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };

    const textStyle = {
        margin: '0',
        fontSize: '14px',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.9)',
        transition: 'color 0.3s ease'
    };

    const buttonStyle = {
        ...textStyle,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: '8px 12px',
        textAlign: 'left',
        width: '100%',
        borderRadius: '6px',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    const linkStyle = {
        ...textStyle,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 12px',
        borderRadius: '6px'
    };

    const copyrightStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '20px 30px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const copyrightTextStyle = {
        margin: '0',
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.7)'
    };

    // Event Handlers
    const handleSocialClick = (platform) => {
        const urls = {
            instagram: 'https://instagram.com/relin_uni',
            facebook: 'https://facebook.com/relin_uni',
            twitter: 'https://twitter.com/relin_official'
        };
        
        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'noopener,noreferrer');
        }
    };

    const handleServiceClick = (service) => {
        console.log(`${service} wurde angeklickt`);
        // Hier würdest du zur entsprechenden Seite navigieren
        // z.B. navigate('/hilfe') für React Router
    };

    const handleCompanyClick = (page) => {
        console.log(`${page} wurde angeklickt`);
        // Hier würdest du zur entsprechenden Seite navigieren
    };

    const handleKeyDown = (e, callback) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            callback();
        }
    };

    return (  
        <footer style={footerStyle} role="contentinfo">
            <style>
                {`
                    .footer-button:hover {
                        background-color: rgba(255, 255, 255, 0.1) !important;
                        color: #ffd700 !important;
                        transform: translateX(5px) !important;
                    }
                    
                    .footer-button:focus {
                        outline: 2px solid #ffd700 !important;
                        outline-offset: 2px !important;
                        background-color: rgba(255, 255, 255, 0.1) !important;
                    }
                    
                    .social-link:hover {
                        background-color: rgba(255, 255, 255, 0.1) !important;
                        color: #ffd700 !important;
                        transform: scale(1.05) !important;
                    }
                    
                    .social-link:focus {
                        outline: 2px solid #ffd700 !important;
                        outline-offset: 2px !important;
                        background-color: rgba(255, 255, 255, 0.1) !important;
                    }
                    
                    .contact-item:hover {
                        color: white !important;
                        transform: translateY(-2px) !important;
                    }
                    
                    @media (max-width: 768px) {
                        .footer-grid {
                            grid-template-columns: 1fr !important;
                            gap: 20px !important;
                        }
                        
                        .footer-main-content {
                            padding: 30px 20px !important;
                        }
                    }
                `}
            </style>
            
            <div style={mainContentStyle} className="footer-main-content">
                <div style={gridStyle} className="footer-grid">
                    {/* Kontakt Sektion */}
                    <div style={sectionStyle}>
                        <h3 style={titleStyle}>📞 Kontakt</h3>
                        <div style={textStyle} className="contact-item">
                            <span>📱</span> 01728701294
                        </div>
                        <div style={textStyle} className="contact-item">
                            <span>🏢</span> MediaSaturnstraße 1
                        </div>
                        <div style={textStyle} className="contact-item">
                            <span>📍</span> 85053 Ingolstadt
                        </div>
                        <div style={textStyle} className="contact-item">
                            <span>✉️</span> info@mediasaturn.de
                        </div>
                        <div style={textStyle} className="contact-item">
                            <span>🕒</span> Mo-Fr: 8:00-20:00 Uhr
                        </div>
                    </div>

                    {/* Social Media Sektion */}
                    <div style={sectionStyle}>
                        <h3 style={titleStyle}>🌐 Social Media</h3>
                        <a 
                            href="https://instagram.com/relin_uni"
                            style={linkStyle} 
                            className="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Besuche uns auf Instagram"
                        >
                            <span>📷</span> Instagram: @relin_uni
                        </a>
                        <a 
                            href="https://facebook.com/relin_uni"
                            style={linkStyle} 
                            className="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Besuche uns auf Facebook"
                        >
                            <span>👤</span> Facebook: @relin_uni
                        </a>
                        <a 
                            href="https://twitter.com/relin_official"
                            style={linkStyle} 
                            className="social-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Folge uns auf Twitter"
                        >
                            <span>🐦</span> Twitter: @relin_official
                        </a>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleSocialClick('youtube')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleSocialClick('youtube'))}
                            type="button"
                            aria-label="Besuche unseren YouTube Kanal"
                        >
                            <span>📺</span> YouTube Kanal
                        </button>
                    </div>

                    {/* Service Sektion */}
                    <div style={sectionStyle}>
                        <h3 style={titleStyle}>🛠️ Service</h3>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleServiceClick('Hilfe & Support')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleServiceClick('Hilfe & Support'))}
                            type="button"
                            aria-label="Hilfe und Support"
                        >
                            <span>❓</span> Hilfe & Support
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleServiceClick('Versand & Lieferung')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleServiceClick('Versand & Lieferung'))}
                            type="button"
                            aria-label="Versand und Lieferung"
                        >
                            <span>🚚</span> Versand & Lieferung
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleServiceClick('Rückgabe & Umtausch')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleServiceClick('Rückgabe & Umtausch'))}
                            type="button"
                            aria-label="Rückgabe und Umtausch"
                        >
                            <span>↩️</span> Rückgabe & Umtausch
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleServiceClick('Zahlungsmethoden')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleServiceClick('Zahlungsmethoden'))}
                            type="button"
                            aria-label="Zahlungsmethoden"
                        >
                            <span>💳</span> Zahlungsmethoden
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleServiceClick('Garantie & Reparatur')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleServiceClick('Garantie & Reparatur'))}
                            type="button"
                            aria-label="Garantie und Reparatur"
                        >
                            <span>🔧</span> Garantie & Reparatur
                        </button>
                    </div>

                    {/* Unternehmen Sektion */}
                    <div style={sectionStyle}>
                        <h3 style={titleStyle}>🏪 Unternehmen</h3>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleCompanyClick('Über uns')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleCompanyClick('Über uns'))}
                            type="button"
                            aria-label="Über uns"
                        >
                            <span>ℹ️</span> Über uns
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleCompanyClick('Karriere')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleCompanyClick('Karriere'))}
                            type="button"
                            aria-label="Karriere"
                        >
                            <span>💼</span> Karriere
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleCompanyClick('Presse')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleCompanyClick('Presse'))}
                            type="button"
                            aria-label="Presse"
                        >
                            <span>📰</span> Presse
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleCompanyClick('Datenschutz')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleCompanyClick('Datenschutz'))}
                            type="button"
                            aria-label="Datenschutz"
                        >
                            <span>🔒</span> Datenschutz
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleCompanyClick('AGB')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleCompanyClick('AGB'))}
                            type="button"
                            aria-label="Allgemeine Geschäftsbedingungen"
                        >
                            <span>📋</span> AGB
                        </button>
                        <button 
                            style={buttonStyle} 
                            className="footer-button"
                            onClick={() => handleCompanyClick('Impressum')}
                            onKeyDown={(e) => handleKeyDown(e, () => handleCompanyClick('Impressum'))}
                            type="button"
                            aria-label="Impressum"
                        >
                            <span>📄</span> Impressum
                        </button>
                    </div>
                </div>
            </div>

            {/* Copyright Bereich */}
            <div style={copyrightStyle}>
                <p style={copyrightTextStyle}>
                    © 2025 Relin - Alle Rechte vorbehalten | 
                    <span style={{margin: '0 8px'}}>•</span>
                    Entwickelt mit für Ausbildung und Lernen
                </p>
            </div>
        </footer>
    );
}

export default Footer;