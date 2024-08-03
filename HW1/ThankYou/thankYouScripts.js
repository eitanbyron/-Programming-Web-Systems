import {GetProductToPurchase} from '../Utils/generalScripts.js';

document.addEventListener('DOMContentLoaded', function() {

    let product = GetProductToPurchase();

    let ProductContainer = document.getElementById("productContainer");
    
    const image = document.createElement("img");
    image.src = './Data/images/' + product.image_file_name;
    image.alt = product.title;
    image.classList.add("productImage");

    const description = document.createElement("p");
    description.id = "imageDescription";
    description.textContent = product.description;

    const imageTitle = document.createElement("h3");
    imageTitle.id = "imageTitle";
    imageTitle.textContent = product.title;

    ProductContainer.appendChild(imageTitle);
    ProductContainer.appendChild(image);
    ProductContainer.appendChild(description);

});

