import { useState, useEffect } from 'react';
import StockService from './StockService';

function StockOverview() {
    const [stocks, setStocks] = useState([]);
    const [lowStockItems, setLowStockItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            const [allStocks, lowStocks] = await Promise.all([
                StockService.getAllStock(),
                StockService.getLowStock(10)
            ]);
            setStocks(allStocks);
            setLowStockItems(lowStocks);
        } catch (error) {
            console.error('Fehler beim Laden:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Lade Stock-Daten...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Stock-Übersicht</h2>
            
            {lowStockItems.length > 0 && (
                <div style={{ marginBottom: '30px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
                    <h3 style={{ color: '#856404' }}>⚠️ Niedrige Bestände</h3>
                    {lowStockItems.map(item => (
                        <div key={item.productId} style={{ margin: '5px 0' }}>
                            Produkt {item.productId}: {item.stock} Stück
                        </div>
                    ))}
                </div>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Produkt ID</th>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Bestand</th>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Status</th>
                        <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Letzte Änderung</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map(stock => (
                        <tr key={stock.productId}>
                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{stock.productId}</td>
                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{stock.stock}</td>
                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                                <span style={{
                                    color: stock.stock === 0 ? '#dc3545' : stock.stock < 10 ? '#fd7e14' : '#28a745'
                                }}>
                                    {stock.stock === 0 ? 'Ausverkauft' : stock.stock < 10 ? 'Niedrig' : 'Verfügbar'}
                                </span>
                            </td>
                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                                {new Date(stock.lastChange).toLocaleDateString('de-DE')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StockOverview;