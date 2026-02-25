import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MainPage from './components/MainPage';
import ContactPage from './components/ContactPage';
import Cart from './components/Cart';

function App() {
    const [showCart, setShowCart] = useState(false);

    return (
        <CartProvider>
            <Router>
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <Header onShowCart={setShowCart} />
                    
                    <main style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/produkte" element={<MainPage />} />
                            <Route path="/kontakt" element={<ContactPage />} />
                        </Routes>
                    </main>
                    
                    <Footer />
                    
                    {showCart && <Cart onClose={() => setShowCart(false)} />}
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
