import { productsData } from '../Data/data.js';
import * as consts from '../Utils/consts.js';

export function GetProductToPurchase() {
    let productIndex = consts.DEFAULT_PRODUCT_INDEX;

    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Check if the parameter exists
    if (urlParams.has('productIndex')) {
        // Get the value of the 'productIndex' parameter
        productIndex = urlParams.get('productIndex');
    }

    if (productIndex <= 9 && productIndex >= 1) {
        let productToPurchace = productsData.products.find(product => product.id === Number(productIndex)); /*for each "product" in products array will return the first product that id == product_id */
        return productToPurchace;
    }

    else {
        alert("Error! Illegal product index")
        return null;
    }
}