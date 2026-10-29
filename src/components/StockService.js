import { stockApi } from '../api';

// Keep the existing service interface for the cart and stock overview.
// The generated client handles URLs, parameters, JSON and unsuccessful responses.
class StockService {
    getAllStock() {
        return stockApi.getAllStock();
    }

    getStockByProductId(productId) {
        return stockApi.getStockByProductId({ productId });
    }

    getLowStock(threshold = 10) {
        return stockApi.getLowStock({ threshold });
    }

    getAvailableStock() {
        return stockApi.getAvailableStock();
    }
}

const stockService = new StockService();
export default stockService;
