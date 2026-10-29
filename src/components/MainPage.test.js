import { fireEvent, render, screen } from '@testing-library/react';
import MainPage from './MainPage';

jest.mock('./CartContext', () => ({
    useCart: () => ({ addToCart: jest.fn() })
}));

// Representative response values from the backend's Flyway seed migration.
// These fixtures test rendering through the real generated client, not a live DB.
const products = [
    { productId: 1002, name: 'Samsung Galaxy Z Fold7', productGroupId: 1,
      price: 1799.99, stockQuantity: 18, stockStatus: 'AVAILABLE' },
    { productId: 1003, name: 'Sony WH-1000XM4', productGroupId: 2,
      price: 849.99, stockQuantity: 12, stockStatus: 'AVAILABLE' }
];

const originalFetch = global.fetch;
const jsonResponse = (body, status = 200) => ({ status, json: async () => body });

beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
});

test('renders database seed products returned through the generated client on port 8081', async () => {
    global.fetch.mockResolvedValue(jsonResponse(products));
    render(<MainPage />);
    expect(await screen.findByRole('heading', { name: 'Samsung Galaxy Z Fold7' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Sony WH-1000XM4' })).toBeInTheDocument();
    expect(screen.getByText('€1799.99')).toBeInTheDocument();
    expect(screen.getByText('Unsere Produkte (2 Artikel):')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8081/api/products/with-stock', expect.objectContaining({ method: 'GET' })
    );
});

test('a network failure shows an error instead of claiming the database is empty', async () => {
    global.fetch.mockRejectedValue(new TypeError('Failed to fetch'));
    render(<MainPage />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Die Produkte konnten nicht geladen werden');
    expect(screen.queryByText('Zurzeit sind keine Produkte verfügbar.')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Erneut versuchen' })).toBeInTheDocument();
});

test('an HTTP 500 from the backend is visible on the product page', async () => {
    global.fetch.mockResolvedValue(jsonResponse({ error: 'Database unavailable' }, 500));
    render(<MainPage />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Die Produkte konnten nicht geladen werden');
});

test('retry loads the products after the backend becomes available', async () => {
    global.fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'))
        .mockResolvedValueOnce(jsonResponse(products));
    render(<MainPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Erneut versuchen' }));
    expect(await screen.findByRole('heading', { name: 'Samsung Galaxy Z Fold7' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);
});

test('an actual empty response has its own empty state', async () => {
    global.fetch.mockResolvedValue(jsonResponse([]));
    render(<MainPage />);
    expect(await screen.findByText('Zurzeit sind keine Produkte verfügbar.')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('the market modal loads availability through the same backend connection', async () => {
    global.fetch.mockResolvedValueOnce(jsonResponse(products))
        .mockResolvedValueOnce(jsonResponse({
            productId: 1002, productName: products[0].name, price: 1799.99, totalStock: 5,
            availableInMarkets: [{ marketId: 1, marketName: 'MediaMarkt München Zentrum',
                location: 'Marienplatz 12, München', stock: 5, available: true }]
        }));
    render(<MainPage />);
    await screen.findByRole('heading', { name: 'Samsung Galaxy Z Fold7' });
    fireEvent.click(screen.getAllByRole('button', { name: 'Verfügbarkeit in Märkten' })[0]);
    expect(await screen.findByRole('heading', { name: /MediaMarkt München Zentrum/ })).toBeInTheDocument();
    expect(global.fetch).toHaveBeenLastCalledWith(
        'http://localhost:8081/api/markets/products/1002', expect.objectContaining({ method: 'GET' })
    );
});

test('the screenshot products use their photos in both the listing and details', async () => {
    const screenshotProducts = [
        { productId: 115, name: 'MacBook Pro M3', productGroupId: 0, price: 1999.99 },
        { productId: 848, name: 'Nokia 6210', productGroupId: 0, price: 50.99 },
        { productId: 849, name: 'Iphone 15 Pro', productGroupId: 0, price: 599.99 }
    ];
    global.fetch.mockResolvedValue(jsonResponse(screenshotProducts));
    render(<MainPage />);
    await screen.findByRole('heading', { name: 'MacBook Pro M3' });
    expect(screen.getByAltText('MacBook Pro M3')).toHaveAttribute('src', 'macbook.jpg');
    expect(screen.getByAltText('Nokia 6210')).toHaveAttribute('src', 'nokia.jpg');
    expect(screen.getByAltText('Iphone 15 Pro')).toHaveAttribute('src', 'iphone.jpg');
    fireEvent.click(screen.getAllByRole('button', { name: /Details anzeigen/ })[0]);
    expect(screen.getAllByAltText('MacBook Pro M3')).toHaveLength(2);
    screen.getAllByAltText('MacBook Pro M3').forEach(img => {
        expect(img).toHaveAttribute('src', 'macbook.jpg');
    });
});
