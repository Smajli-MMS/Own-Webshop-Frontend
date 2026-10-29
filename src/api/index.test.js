import { apiConfiguration, productsApi, marketsApi, stockApi } from './index';
import StockService from '../components/StockService';

const originalFetch = global.fetch;
const originalUrl = process.env.REACT_APP_API_URL;

beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, json: async () => [] });
});

afterEach(() => {
    global.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.REACT_APP_API_URL;
    else process.env.REACT_APP_API_URL = originalUrl;
});

function expectGet(path) {
    expect(global.fetch).toHaveBeenCalledWith(
        `${apiConfiguration.basePath}${path}`,
        expect.objectContaining({ method: 'GET' })
    );
}

test('products use the generated client and deserialize the response', async () => {
    global.fetch.mockResolvedValue({
        status: 200,
        json: async () => [{ productId: 7, name: 'Phone', price: 99.95, stockQuantity: 3 }]
    });
    await expect(productsApi.getAllProductsWithStock()).resolves.toEqual([
        expect.objectContaining({ productId: 7, price: 99.95, stockQuantity: 3 })
    ]);
    expectGet('/api/products/with-stock');
});

test('market availability passes the product ID to the generated path', async () => {
    global.fetch.mockResolvedValue({
        status: 200,
        json: async () => ({ productId: 7, totalStock: 3, availableInMarkets: [
            { marketId: 1, marketName: 'Ingolstadt', stock: 3, available: true }
        ] })
    });
    const result = await marketsApi.getProductStockInAllMarkets({ productId: 7 });
    expectGet('/api/markets/products/7');
    expect(result.availableInMarkets[0].available).toBe(true);
});

test.each([
    ['all stock', () => StockService.getAllStock(), '/api/stock'],
    ['product stock', () => StockService.getStockByProductId(7), '/api/stock/7'],
    ['default threshold', () => StockService.getLowStock(), '/api/stock/low-stock?threshold=10'],
    ['custom threshold', () => StockService.getLowStock(3), '/api/stock/low-stock?threshold=3'],
    ['available stock', () => StockService.getAvailableStock(), '/api/stock/available']
])('%s uses the generated StockApi', async (_name, call, path) => {
    await call();
    expectGet(path);
});

test('unsuccessful HTTP responses reject rather than being treated as product data', async () => {
    global.fetch.mockResolvedValue({ status: 500, json: async () => ({ error: 'Unavailable' }) });
    await expect(productsApi.getAllProductsWithStock()).rejects.toMatchObject({
        name: 'ResponseError', response: { status: 500 }
    });
});

test('stock service propagates HTTP errors to the existing component handlers', async () => {
    global.fetch.mockResolvedValue({ status: 404 });
    await expect(StockService.getStockByProductId(999)).rejects.toMatchObject({
        response: { status: 404 }
    });
});

test('configuration uses the environment URL and removes trailing slashes', () => {
    process.env.REACT_APP_API_URL = 'https://backend.example.test///';
    jest.isolateModules(() => {
        const configured = require('./index');
        expect(configured.apiConfiguration.basePath).toBe('https://backend.example.test');
        expect(configured.productsApi).toBeDefined();
        expect(configured.marketsApi).toBeDefined();
        expect(configured.stockApi).toBeDefined();
    });
});

test('configuration falls back to the requested localhost port', () => {
    delete process.env.REACT_APP_API_URL;
    jest.isolateModules(() => {
        expect(require('./index').apiConfiguration.basePath).toBe('http://localhost:8081');
    });
});

test('stock dates remain usable by the overview formatting', async () => {
    global.fetch.mockResolvedValue({ status: 200, json: async () => [
        { productId: 7, stock: 3, lastChange: '2026-10-29T12:00:00' }
    ] });
    const [result] = await stockApi.getAllStock();
    expect(new Date(result.lastChange).getFullYear()).toBe(2026);
});
