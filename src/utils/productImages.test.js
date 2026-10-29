import { getProductImage, handleProductImageError } from './productImages';

// Names from the Flyway seed migration, with the enum-based ID that previously
// caused the product page to skip its local assets and show placeholders.
test.each([
    ['Samsung Galaxy Z Fold7', 'samsungfold7.jpg'],
    ['Sony WH-1000XM4', 'sony.jpg'],
    ['MacBook Pro 14"', 'macbook.jpg'],
    ['Xiaomi Mi 13', 'xiaomi.jpg'],
    ['OnePlus 11', 'oneplus.jpg'],
    ['Xbox Series X', 'xbox.jpg'],
    ['Nintendo Switch OLED', 'nintendo.jpg'],
    ['Dell XPS 13', 'dell.jpg'],
    ['HP Pavilion Desktop', 'hp.jpg'],
    ['Miele Washing Machine', 'miele.jpg'],
    ['LG Front Load Washer', 'lg.jpg'],
    ['Gaming Mouse Logitech', 'logitech.jpg'],
    ['MacBook Pro M3', 'macbook.jpg'],
    ['Nokia 6210', 'nokia.jpg'],
    ['Iphone 15 Pro', 'iphone.jpg'],
    ['Playstation 3', 'playstation.jpg'],
    ['BOSCH Waschmaschine 6789', 'bosch.jpg']
])('%s uses its local photo regardless of productGroupId', (name, image) => {
    expect(getProductImage({ name, productGroupId: 0 })).toBe(image);
});

test('Apple MacBook is not incorrectly matched as an iPhone', () => {
    expect(getProductImage({ name: 'Apple MacBook Pro M3' })).toBe('macbook.jpg');
});

test('missing or unknown names use a local placeholder', () => {
    expect(getProductImage()).toBe('product-placeholder.svg');
    expect(getProductImage({ name: 'Unknown product' })).toBe('product-placeholder.svg');
});

test('a broken image switches to a local placeholder without retrying forever', () => {
    const img = document.createElement('img');
    img.setAttribute('src', '/missing.jpg');
    const setAttribute = jest.spyOn(img, 'setAttribute');
    handleProductImageError({ currentTarget: img });
    expect(img.getAttribute('src')).toBe('product-placeholder.svg');
    handleProductImageError({ currentTarget: img });
    expect(setAttribute).toHaveBeenCalledTimes(1);
});
