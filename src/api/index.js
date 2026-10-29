import { Configuration, MarketsApi, ProductsApi, StockApi } from '../generated';

// Create React App injects REACT_APP_* variables when starting/building the app.
const basePath = (process.env.REACT_APP_API_URL || 'http://localhost:8081')
    .replace(/\/+$/, '');

export const apiConfiguration = new Configuration({ basePath });
export const marketsApi = new MarketsApi(apiConfiguration);
export const productsApi = new ProductsApi(apiConfiguration);
export const stockApi = new StockApi(apiConfiguration);
