import { useState } from 'react';

import blackFridayImg from '../images/black-friday-banner.jpg';
import iphoneImg from '../images/iphone-banner.jpg';
import gamingImg from '../images/gaming-banner.jpg';

function HomePage() {
    const [banners] = useState([
        {
            id: 1,
            title: "Black Friday Sale!",
            description: "Bis zu 70% Rabatt auf alle Elektronik-Artikel",
            image: blackFridayImg, // ← Importierte Variable
            buttonText: "Jetzt shoppen"
        },
        {
            id: 2,
            title: "Neue iPhone Serie",
            description: "Entdecke die neuesten iPhone Modelle",
            image: iphoneImg,
            buttonText: "Mehr erfahren"
        },
        {
            id: 3,
            title: "Gaming Setup",
            description: "Alles für dein perfektes Gaming-Erlebnis",
            image: gamingImg,
            buttonText: "Gaming entdecken"
        }
    ]);

    return (
        <div style={{ padding: '40px', minHeight: '400px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1>Willkommen bei MediaMarktSaturn!</h1>
                <p style={{ fontSize: '18px', color: '#666' }}>
                    Entdecke die besten Deals und neuesten Produkte
                </p>
            </div>

            {/* Banner/Sales Bereich */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(550px, 1fr))',
                gap: '40px',
                marginBottom: '40px'
            }}>
                {banners.map(banner => (
                    <div key={banner.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        backgroundColor: 'white'
                    }}>
                        <img 
                            src={banner.image}
                            alt={banner.title}
                            style={{
                                width: '100%',
                                height: '450px',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>{banner.title}</h3>
                            <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                                {banner.description}
                            </p>
                            <button style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}>
                                {banner.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Kategorien Vorschau */}
            <div style={{ marginTop: '40px' }}>
                <h2>Beliebte Kategorien</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px'
                }}>
                    {['Smartphones', 'Gaming', 'Laptops', 'Haushaltsgeräte'].map(category => (
                        <div key={category} style={{
                            padding: '20px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '10px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: '1px solid #ddd'
                        }}>
                            <h4>{category}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;