import iphoneImg from '../images/iphone.jpg';
import samsungImg from '../images/samsung.jpg';
import samsungFoldImg from '../images/samsungfold7.jpg';
import sonyImg from '../images/sony.jpg';
import xiaomiImg from '../images/xiaomi.jpg';
import oneplusImg from '../images/oneplus.jpg';
import nintendoImg from '../images/nintendo.jpg';
import dellImg from '../images/dell.jpg';
import hpImg from '../images/hp.jpg';
import mieleImg from '../images/miele.jpg';
import lgImg from '../images/lg.jpg';
import logitechImg from '../images/logitech.jpg';
import nokiaImg from '../images/nokia.jpg';
import boschImg from '../images/bosch.jpg';
import playstationImg from '../images/playstation.jpg';
import xboxImg from '../images/xbox.jpg';
import macbookImg from '../images/macbook.jpg';
import placeholder from '../images/product-placeholder.svg';

// Local assets describe products, not enum positions from the backend.
// Match specific models before generic brands (e.g. Fold7 before Samsung).
const productImages = [
    [/macbook|\bmac\b/i, macbookImg],
    [/(?:samsung|galaxy).*fold\s*7/i, samsungFoldImg],
    [/iphone/i, iphoneImg],
    [/samsung/i, samsungImg],
    [/sony|wh-?1000/i, sonyImg],
    [/xiaomi|\bmi\s*13\b/i, xiaomiImg],
    [/one\s*plus/i, oneplusImg],
    [/nintendo|\bswitch\b/i, nintendoImg],
    [/dell|\bxps\b/i, dellImg],
    [/\bhp\b|pavilion|elitebook/i, hpImg],
    [/miele/i, mieleImg],
    [/\blg\b|front load/i, lgImg],
    [/logitech/i, logitechImg],
    [/nokia/i, nokiaImg],
    [/bosch/i, boschImg],
    [/playstation|\bps[345]\b/i, playstationImg],
    [/xbox/i, xboxImg]
];

export function getProductImage(product) {
    const name = product?.name || '';
    return productImages.find(([pattern]) => pattern.test(name))?.[1] || placeholder;
}

export function handleProductImageError(event) {
    const image = event.currentTarget;
    if (image.getAttribute('src') !== placeholder) {
        image.setAttribute('src', placeholder);
    }
}
