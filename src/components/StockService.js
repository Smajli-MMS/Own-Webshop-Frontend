class StockService {
    constructor() {
        this.baseURL = 'http://localhost:8081/api/stock';
    }

    // Alle Bestände abrufen
    async getAllStock() {
        try {
            const response = await fetch(`${this.baseURL}`);
            if (!response.ok) throw new Error('Fehler beim Laden der Bestände');
            return await response.json();
        } catch (error) {
            console.error('Stock Service Error:', error);
            throw error;
        }
    }

    // Bestand für spezifisches Produkt
    async getStockByProductId(productId) {
        try {
            const response = await fetch(`${this.baseURL}/${productId}`);
            if (!response.ok) throw new Error(`Bestand für Produkt ${productId} nicht gefunden`);
            return await response.json();
        } catch (error) {
            console.error('Stock Service Error:', error);
            throw error;
        }
    }

    // Produkte mit niedrigem Bestand
    async getLowStock(threshold = 10) {
        try {
            const response = await fetch(`${this.baseURL}/low-stock?threshold=${threshold}`);
            if (!response.ok) throw new Error('Fehler beim Laden niedriger Bestände');
            return await response.json();
        } catch (error) {
            console.error('Stock Service Error:', error);
            throw error;
        }
    }

    // Nur verfügbare Artikel
    async getAvailableStock() {
        try {
            const response = await fetch(`${this.baseURL}/available`);
            if (!response.ok) throw new Error('Fehler beim Laden verfügbarer Bestände');
            return await response.json();
        } catch (error) {
            console.error('Stock Service Error:', error);
            throw error;
        }
    }
}

const stockService = new StockService(); export default stockService;