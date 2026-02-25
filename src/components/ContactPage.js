import { useState } from 'react';

function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(`Danke ${formData.firstName}! Deine Nachricht wurde gesendet.`);
        // Hier würdest du die Daten an deinen Server senden
        console.log('Kontaktdaten:', formData);
        
        // Formular zurücksetzen
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    }

    const inputStyle = {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        marginBottom: '15px'
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Kontakt</h1>
            <p>Hast du Fragen oder benötigst Hilfe? Wir sind für dich da!</p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                marginTop: '30px'
            }}>
                {/* Kontaktformular */}
                <div>
                    <h2>Schreib uns eine Nachricht</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Vorname"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nachname"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        
                        <input
                            type="email"
                            name="email"
                            placeholder="E-Mail Adresse"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />
                        
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefonnummer (optional)"
                            value={formData.phone}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                        
                        <input
                            type="text"
                            name="subject"
                            placeholder="Betreff"
                            value={formData.subject}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />
                        
                        <textarea
                            name="message"
                            placeholder="Deine Nachricht..."
                            value={formData.message}
                            onChange={handleInputChange}
                            style={{
                                ...inputStyle,
                                height: '120px',
                                resize: 'vertical'
                            }}
                            required
                        />
                        
                        <button type="submit" style={{
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '15px 30px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            width: '100%'
                        }}>
                            Nachricht senden
                        </button>
                    </form>
                </div>

                {/* Kontaktinformationen */}
                <div>
                    <h2>Weitere Kontaktmöglichkeiten</h2>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <h3>📞 Telefon</h3>
                        <p>+49 (0) 841 123456</p>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                            Mo-Fr: 8:00-20:00 Uhr<br/>
                            Sa: 9:00-18:00 Uhr
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3>📧 E-Mail</h3>
                        <p>kundenservice@mediamarktsaturn.de</p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3>📍 Adresse</h3>
                        <p>
                            MediaMarktSaturn<br/>
                            Media-Saturn-Straße 1<br/>
                            85053 Ingolstadt<br/>
                            Deutschland
                        </p>
                    </div>

                    <div>
                        <h3>💬 Social Media</h3>
                        <p>Instagram: @relin_uni</p>
                        <p>Facebook: MediaMarktSaturn</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;