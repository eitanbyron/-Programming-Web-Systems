import { productsData } from '../Data/data.js';
import * as consts from "../Utils/consts.js";

window.onload = function(){
    let temp = productsData.products;
    let shuffledProducts = shuffleArray(temp);

    let oDiv = document.querySelector(".container");

    shuffledProducts.forEach((product, i) =>{
            let item = document.createElement("div");
            item.setAttribute("class", "item"+"-"+(i+1));
            item.classList.add("catalogItem");
            let oImg = document.createElement("img");
            oImg.classList.add("catalogItemImg");
            let oName = document.createElement("h3");
            oName.classList.add("catalogItemTitle");
            let oDescription = document.createElement("p");
            oDescription.setAttribute("class", "description");
            let oOldPrice = document.createElement("del");
            oOldPrice.classList.add("catalogItemOldPrice");
            let oCurrprice = document.createElement("p");
            oCurrprice.setAttribute("class", "catalogItemPrice");
            
            oImg.src = "./Data/images/" +product.image_file_name;
            oImg.alt = product.title;
            oImg.addEventListener('click', function() {
              window.location.href = './ProcessPayment.html?productIndex='+product.id;
          });
          oName.innerHTML = product.title;
          oDescription.innerHTML = product.description;
          oOldPrice.innerHTML = consts.CURRENCY + product.price;
          oCurrprice.appendChild(oOldPrice);
          oCurrprice.innerHTML += " " + consts.CURRENCY + product.discounted_price;

          item.appendChild(oImg);
          item.appendChild(oName);
          item.appendChild(oDescription);
          item.appendChild(oCurrprice);
          
          oDiv.appendChild(item);
    })    
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

 


