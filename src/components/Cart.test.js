import { render, screen } from '@testing-library/react';
import Cart from './Cart';

jest.mock('./CartContext', () => ({
    useCart: () => ({
        cartItems: [{ productId: 115, name: 'Apple MacBook Pro M3', price: 1999.99,
            quantity: 1, stockQuantity: 5, productGroupId: 0 }],
        getTotalPrice: () => '1999.99',
        getTotalItems: () => 1,
        isCheckingOut: false
    })
}));

test('the cart uses the same MacBook photo as the listing', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
        render(<Cart onClose={() => {}} />);
        expect(screen.getByAltText('Apple MacBook Pro M3')).toHaveAttribute('src', 'macbook.jpg');
    } finally {
        log.mockRestore();
    }
});
