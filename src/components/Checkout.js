import { useState } from 'react';
import { useCart } from './CartContext';

function Checkout({ onClose }) {
    const { cartItems, getTotalPrice, completeOrder, cancelCheckout } = useCart();
    const [customerData, setCustomerData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'credit-card'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState('');

    // Alle Styles
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
            maxWidth: '900px',
            width: '95vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        successModal: {
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            maxWidth: '500px',
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
        headerTitle: {
            margin: 0,
            fontSize: '24px',
            fontWeight: '600'
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
            fontSize: '20px',
            transition: 'background 0.2s'
        },
        content: {
            display: 'flex',
            flex: 1,
            overflow: 'hidden'
        },
        orderSummary: {
            width: '300px',
            background: '#f8f9fa',
            padding: '24px',
            borderRight: '1px solid #e5e5e5',
            overflowY: 'auto'
        },
        summaryTitle: {
            margin: '0 0 20px 0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
        },
        orderItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #e9ecef'
        },
        itemName: {
            flex: 1,
            fontSize: '14px',
            color: '#333'
        },
        itemQuantity: {
            fontSize: '14px',
            color: '#666',
            margin: '0 8px'
        },
        itemPrice: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#333'
        },
        orderTotal: {
            marginTop: '16px',
            padding: '16px 0',
            borderTop: '2px solid #dee2e6',
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            textAlign: 'center'
        },
        formContainer: {
            flex: 1,
            padding: '24px',
            overflowY: 'auto'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        },
        formSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        sectionTitle: {
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            borderBottom: '2px solid #fb0303',
            paddingBottom: '8px'
        },
        formRow: {
            display: 'flex',
            gap: '16px'
        },
        input: {
            flex: 1,
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            transition: 'border-color 0.2s',
            outline: 'none'
        },
        inputFocus: {
            borderColor: '#fb0303'
        },
        paymentOptions: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        paymentOption: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        paymentOptionSelected: {
            borderColor: '#fb0303',
            background: '#fff5f5'
        },
        radio: {
            marginRight: '12px'
        },
        paymentLabel: {
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
        },
        actions: {
            display: 'flex',
            gap: '16px',
            padding: '24px',
            borderTop: '1px solid #e5e5e5',
            background: '#f8f9fa'
        },
        btnSecondary: {
            flex: 1,
            padding: '12px 24px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            background: 'white',
            color: '#333',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        btnPrimary: {
            flex: 2,
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        btnDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed'
        },
        successContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
        },
        successIcon: {
            fontSize: '64px'
        },
        successTitle: {
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: '#28a745'
        },
        successText: {
            margin: 0,
            fontSize: '16px',
            color: '#666',
            textAlign: 'center',
            lineHeight: 1.5
        },
        orderId: {
            background: '#f8f9fa',
            padding: '8px 16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
        }
    };

    function handleInputChange(field, value) {
        setCustomerData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                customer: customerData,
                items: cartItems,
                total: getTotalPrice(),
                orderDate: new Date().toISOString()
            };

            const result = await completeOrder(orderData);
            
            if (result.success) {
                setOrderId(result.orderId);
                setOrderComplete(true);
            }
        } catch (error) {
            alert('Fehler beim Verarbeiten der Bestellung. Bitte versuche es erneut.');
        } finally {
            setIsSubmitting(false);
        }
    }

    // Success Screen
    if (orderComplete) {
        return (
            <div style={styles.overlay}>
                <div style={styles.successModal}>
                    <div style={styles.successContent}>
                        <div style={styles.successIcon}>✅</div>
                        <h2 style={styles.successTitle}>Bestellung erfolgreich!</h2>
                        <div style={styles.orderId}>{orderId}</div>
                        <p style={styles.successText}>
                            Du erhältst eine Bestätigungs-E-Mail an <strong>{customerData.email}</strong>
                        </p>
                        <p style={styles.successText}>
                            Vielen Dank für deine Bestellung! Wir bearbeiten sie schnellstmöglich.
                        </p>
                        <button 
                            style={styles.btnPrimary}
                            onClick={onClose}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            Weiter einkaufen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main Checkout
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>Zur Kasse</h2>
                    <button 
                        style={styles.closeBtn} 
                        onClick={() => {
                            cancelCheckout();
                            onClose();
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                    >
                        ✕
                    </button>
                </div>

                <div style={styles.content}>
                    {/* Bestellübersicht */}
                    <div style={styles.orderSummary}>
                        <h3 style={styles.summaryTitle}>Deine Bestellung</h3>
                        {cartItems.map(item => (
                            <div key={item.productId} style={styles.orderItem}>
                                <span style={styles.itemName}>{item.name}</span>
                                <span style={styles.itemQuantity}>{item.quantity}x</span>
                                <span style={styles.itemPrice}>€{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={styles.orderTotal}>
                            Gesamtsumme: €{getTotalPrice()}
                        </div>
                    </div>

                    {/* Checkout-Formular */}
                    <div style={styles.formContainer}>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            {/* Persönliche Daten */}
                            <div style={styles.formSection}>
                                <h3 style={styles.sectionTitle}>Persönliche Daten</h3>
                                <div style={styles.formRow}>
                                    <input
                                        style={styles.input}
                                        type="text"
                                        placeholder="Vorname"
                                        value={customerData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        onFocus={(e) => e.target.style.borderColor = '#fb0303'}
                                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                        required
                                    />
                                    <input
                                        style={styles.input}
                                        type="text"
                                        placeholder="Nachname"
                                        value={customerData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        onFocus={(e) => e.target.style.borderColor = '#fb0303'}
                                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                        required
                                    />
                                </div>
                                <input
                                    style={styles.input}
                                    type="email"
                                    placeholder="E-Mail-Adresse"
                                    value={customerData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    onFocus={(e) => e.target.style.borderColor = '#fb0303'}
                                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                    required
                                />
                                <input
                                    style={styles.input}
                                    type="tel"
                                    placeholder="Telefonnummer"
                                    value={customerData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    onFocus={(e) => e.target.style.borderColor = '#fb0303'}
                                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                    required
                                />
                            </div>

                            {/* Lieferadresse */}
                            <div style={styles.formSection}>
                                <h3 style={styles.sectionTitle}>Lieferadresse</h3>
                                <input
                                    style={styles.input}
                                    type="text"
                                    placeholder="Straße und Hausnummer"
                                    value={customerData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    onFocus={(e) => e.target.style.borderColor = '#fb0303'}
                                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                    required
                                />
                                <div style={styles.formRow}>
                                    <input
                                        style={styles.input}
                                        type="text"
                                        placeholder="PLZ"
                                        value={customerData.postalCode}
                                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                        onFocus={(e) => e.target.style.borderColor = '#fb0303'}
                                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                        required
                                    />
                                    <input
                                        style={styles.input}
                                        type="text"
                                        placeholder="Stadt"
                                        value={customerData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        onFocus={(e) => e.target.style.borderColor = '#fb0303'}
                                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Zahlungsart */}
                            <div style={styles.formSection}>
                                <h3 style={styles.sectionTitle}>Zahlungsart</h3>
                                <div style={styles.paymentOptions}>
                                    <label 
                                        style={{
                                            ...styles.paymentOption,
                                            ...(customerData.paymentMethod === 'credit-card' ? styles.paymentOptionSelected : {})
                                        }}
                                        onClick={() => handleInputChange('paymentMethod', 'credit-card')}
                                    >
                                        <input
                                            style={styles.radio}
                                            type="radio"
                                            name="payment"
                                            value="credit-card"
                                            checked={customerData.paymentMethod === 'credit-card'}
                                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                        />
                                        <span style={styles.paymentLabel}>💳 Kreditkarte</span>
                                    </label>
                                    <label 
                                        style={{
                                            ...styles.paymentOption,
                                            ...(customerData.paymentMethod === 'paypal' ? styles.paymentOptionSelected : {})
                                        }}
                                        onClick={() => handleInputChange('paymentMethod', 'paypal')}
                                    >
                                        <input
                                            style={styles.radio}
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={customerData.paymentMethod === 'paypal'}
                                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                        />
                                        <span style={styles.paymentLabel}>🅿️ PayPal</span>
                                    </label>
                                    <label 
                                        style={{
                                            ...styles.paymentOption,
                                            ...(customerData.paymentMethod === 'bank-transfer' ? styles.paymentOptionSelected : {})
                                        }}
                                        onClick={() => handleInputChange('paymentMethod', 'bank-transfer')}
                                    >
                                        <input
                                            style={styles.radio}
                                            type="radio"
                                            name="payment"
                                            value="bank-transfer"
                                            checked={customerData.paymentMethod === 'bank-transfer'}
                                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                        />
                                        <span style={styles.paymentLabel}>🏦 Überweisung</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer mit Buttons */}
                <div style={styles.actions}>
                    <button 
                        type="button" 
                        style={styles.btnSecondary}
                        onClick={() => {
                            cancelCheckout();
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                        onMouseLeave={(e) => e.target.style.background = 'white'}
                    >
                        Zurück zum Warenkorb
                    </button>
                    <button 
                        type="submit" 
                        style={{
                            ...styles.btnPrimary,
                            ...(isSubmitting ? styles.btnDisabled : {})
                        }}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        onMouseEnter={(e) => {
                            if (!isSubmitting) e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting) e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        {isSubmitting ? 'Wird verarbeitet...' : `Jetzt bestellen (€${getTotalPrice()})`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
