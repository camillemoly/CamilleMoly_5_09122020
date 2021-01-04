import { Product } from "./Product.js";
import { convertToFloatNumber } from "./fonction-float.js";

let searchParams = new URLSearchParams(window.location.search); //use URLSearchParams constructor to get values of url parameters
let productId = searchParams.get("id"); // get id product
let productImageUrl;
let productName;
let productPrice;
let imageDiv = document.getElementById("product__image");
let nameDiv = document.getElementById("product__name");
let descriptionDiv = document.getElementById("product__description");
let priceDiv = document.getElementById("product__price");
let selectDiv = document.getElementById("product__options");
let addToCartButton = document.getElementById("product__button");
let productConfirm = document.getElementById("product__confirm");


fetch("http://localhost:3000/api/cameras/" + productId) // GET camera according to the id
.then(response => response.json()) // response in JSON format convert to an object and return a promise
.then(response => {
    // give imageUrl to img src
    productImageUrl = response["imageUrl"]
    imageDiv.src = productImageUrl;
    // display product name
    productName = response["name"];
    nameDiv.textContent = productName;
    // display description
    descriptionDiv.textContent = response["description"];
    // display price and get a number with 2 decimals
    productPrice = response["price"];
    priceDiv.textContent = convertToFloatNumber(productPrice) + "€";
    // create array of lenses and create option from this array
    let arrayLenses = response["lenses"];
    for(let i in arrayLenses) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", arrayLenses[i])
        newOption.text = arrayLenses[i];
        selectDiv.add(newOption);
    }
})
.catch(error => {
    console.log(error);
    alert("Erreur de serveur, tentative de reconnnexion...");
    setTimeout(function(){document.location.reload()}, 1000);
});

addToCartButton.addEventListener("click", function() {
    // take the value of selected lense and create an id according to the selected lens
    let productOptionSelected = selectDiv.options[selectDiv.selectedIndex].value; 
    let customProductId = productId + "-" + productOptionSelected;
    // if a lense is not selected, prevent the product from being added to the cart
    if (productOptionSelected === "") {
        productConfirm.style.opacity = "1";
        productConfirm.textContent = "Veuillez choisir une lentille.";
        productConfirm.style.color = "red";
        setTimeout(function(){productConfirm.style.opacity = "0"}, 1000);
    } 
    // if the product is not yet in the cart, create product, add quantity 1, add it in the cart and display confirm message
    else if (localStorage.getItem(customProductId) === null) {
        let productQuantity = 1;
        let productAdded = new Product(productId, productImageUrl, productName, productPrice, productOptionSelected, productQuantity);
        let productAddedJson = JSON.stringify(productAdded); // convert to JSON format to be added in cart
        localStorage.setItem(customProductId, productAddedJson);
        productConfirm.style.opacity = "1";
        productConfirm.textContent = "Produit ajouté au panier.";
        productConfirm.style.color = "#4e00df";
        setTimeout(function(){productConfirm.style.opacity = "0"}, 1000);
    }
    // if the product is already in the cart, get the product, increment its price,
    // add the update product in the cart and display confirm message 
    else if (localStorage.key(customProductId) !== null){
        let productToUpdate = JSON.parse(localStorage.getItem(customProductId));
        let quantityUpdate = productToUpdate["quantity"];
        quantityUpdate++;
        productToUpdate["quantity"] = quantityUpdate;
        let productToUpdateJSon = JSON.stringify(productToUpdate);
        localStorage.setItem(customProductId, productToUpdateJSon);
        productConfirm.style.opacity = "1";
        productConfirm.textContent = "Produit ajouté au panier.";
        productConfirm.style.color = "#4e00df";
        setTimeout(function(){productConfirm.style.opacity = "0"}, 1000);
}});