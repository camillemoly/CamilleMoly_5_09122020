import { convertToFloatNumber } from "./fonction-float.js";

let cartTitle = document.getElementById("cart__title");
let cartList = document.getElementById("cart__list");
let cartClearButton = document.getElementById("cart__button");
let cartTotal = document.getElementById("cart__total");
let cartForm = document.getElementById("form");
let newProductDiv;
let newImage;
let newImageLink;
let newInfos;
let newName;
let newLense;
let newPrice;
let newCustomOptions;
let newQuantity;
let newRemoveButton;
let newTotal;
let totalPriceProduct;
let totalPriceCart = 0;

function emptyCart() { // Display title "Votre panier est vide" and remove button, total and form
    cartTitle.textContent = "Votre panier est vide.";
    cartList.remove();
    cartTotal.remove();
    cartForm.remove();
}

function filledCart(){  // Display title "Panier", button and form
    cartTitle.textContent = "Panier";
    cartClearButton.classList.remove("none");
    cartForm.classList.remove("none");
}

function createCartProduct() { // Create product in cart div
    // newProductDiv in cardList
    newProductDiv = document.createElement("div");
    newProductDiv.classList.add("productInCart");
    cartList.appendChild(newProductDiv);
    // newImageLink in newProductDiv
    newImageLink = document.createElement("a");
    newImageLink.classList.add("productInCart__link");
    newProductDiv.appendChild(newImageLink);
    // newImage in newImageLink
    newImage = document.createElement("img");
    newImage.classList.add("productInCart__link__image");
    newImageLink.appendChild(newImage);
    // newInfos in newProductDiv
    newInfos = document.createElement("div");
    newInfos.classList.add("productInCart__infos");
    newProductDiv.appendChild(newInfos);
    // newName in newInfos
    newName = document.createElement("span");
    newName.classList.add("productInCart__infos__name");
    newInfos.appendChild(newName);
    // newLense in newInfos
    newLense = document.createElement("span");
    newLense.classList.add("productInCart__infos__lense");
    newInfos.appendChild(newLense);
    // newPrice in newInfos
    newPrice = document.createElement("span");
    newPrice.classList.add("productInCart__infos__price");
    newInfos.appendChild(newPrice);
    // newCustomOptions in newProductDiv
    newCustomOptions = document.createElement("div");
    newCustomOptions.classList.add("productInCart__custom");
    newProductDiv.appendChild(newCustomOptions);
    // newQuantity in newCustomOptions
    newQuantity = document.createElement("span");
    newQuantity.classList.add("productInCart__custom__quantity");
    newCustomOptions.appendChild(newQuantity);
    // newButton in newCustomOptions
    newRemoveButton = document.createElement("button");
    newRemoveButton.classList.add("productInCart__custom__removeButton", "btn", "btn-dark");
    newRemoveButton.textContent = "Retirer";
    newCustomOptions.appendChild(newRemoveButton);
    // newTotal in newProductDiv
    newTotal = document.createElement("span");
    newTotal.classList.add("productInCart__custom__total");
    newCustomOptions.appendChild(newTotal);
};

function getCartItems() {
    filledCart(); // display filled cart elements
    for(let i=0; i < localStorage.length; i++) { // For each element in localStorage, create product and get its elements
        createCartProduct();
        let productInCart = localStorage.getItem(localStorage.key(i));
        let productInCartObject = JSON.parse(productInCart);
        let thisId = localStorage.key(i);
        newImageLink.setAttribute("href", "produit.html?id=" + productInCartObject["id"]);
        newImage.src = productInCartObject["imageUrl"];
        newName.textContent = productInCartObject["name"];
        newLense.textContent = "Lentille: " + productInCartObject["lense"];
        let productPrice = productInCartObject["price"];
        newPrice.textContent = convertToFloatNumber(productPrice) + "€";
        let productQuantity = productInCartObject["quantity"];
        newQuantity.textContent = "Qté: " + productQuantity;
        totalPriceProduct = productPrice * productQuantity;
        newTotal.textContent = "Total: " + convertToFloatNumber(totalPriceProduct) + "€";
        totalPriceCart+= totalPriceProduct;
        newRemoveButton.addEventListener("click", function(e){ // remove product div and item in localStorage and update cart total price
            let thisProduct = JSON.parse(localStorage.getItem(thisId));
            let thisPrice = thisProduct["price"];
            let thisQuantity = thisProduct["quantity"];
            totalPriceCart -= (thisPrice * thisQuantity);
            e.target.parentNode.parentNode.remove();
            cartTotal.textContent = "Total: " + convertToFloatNumber(totalPriceCart) + "€";
            localStorage.removeItem(thisId);
            if (localStorage.length === 0 ) {
                emptyCart()
            }
        });
    }
    cartTotal.textContent = "Total: " + convertToFloatNumber(totalPriceCart) + "€";
}

function checkCartQuantity() { // Check if localStorage is empty or filled and acts accordingly
    if (localStorage.length === 0 ) {
        emptyCart()
    } else {
        getCartItems()
    }
}

export { checkCartQuantity, cartClearButton, totalPriceCart}; // Export necessary function and variables