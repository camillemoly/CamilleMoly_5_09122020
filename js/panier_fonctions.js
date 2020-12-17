let cartTitle = document.getElementById("cart__title");
let cartCategory = document.getElementById("cart__category");
let cartList = document.getElementById("cart__list");
let cartButton = document.getElementById("cart__button");
let cartForm = document.getElementById("form");
let newProduct;
let newInfos;
let newImage;
let newDescription;
let newName;
let newLense;
let newPrice;
let newQuantity;
let newTotal;

function emptyCart() { // Display message "Votre panier est vide" and remove button, category and form
    cartTitle.innerHTML = "Votre panier est vide.";
    cartList.remove();
    cartForm.remove();
}

function filledCart(){  // Display message "Panier", button, category titles and form
    cartTitle.innerHTML = "Panier";
    cartButton.classList.remove("none");
    cartCategory.classList.remove("none");
    cartForm.classList.remove("none");
}

function createCartItems() { // Create cart product
    // newProduct in cardList
    newProduct = document.createElement("div");
    newProduct.classList.add("product");
    cartList.appendChild(newProduct);
    // newInfos in newProduct
    newInfos = document.createElement("div");
    newInfos.classList.add("product__infos");
    newProduct.appendChild(newInfos);
    // newImage in newInfos
    newImage = document.createElement("img");
    newImage.classList.add("product__infos__image");
    newInfos.appendChild(newImage);
    // newDescription in newInfos
    newDescription = document.createElement("div");
    newDescription.classList.add("product__infos__description");
    newInfos.appendChild(newDescription);
    // newName in newDescription
    newName = document.createElement("p");
    newName.classList.add("product__infos__description-name");
    newDescription.appendChild(newName);
    // newLense in newDescription
    newLense = document.createElement("p");
    newLense.classList.add("product__infos__description-lense");
    newDescription.appendChild(newLense);
    // newPrice in newDescription
    newPrice = document.createElement("p");
    newPrice.classList.add("product__price");
    newProduct.appendChild(newPrice);
    // newQuantity in newProduct
    newQuantity = document.createElement("p");
    newQuantity.classList.add("product__quantity");
    newProduct.appendChild(newQuantity);
    // newTotal in newProduct
    newTotal = document.createElement("p");
    newTotal.classList.add("product__total");
    newProduct.appendChild(newTotal);
};

function getCartItems() {
    filledCart(); 
    for(let i=0; i < localStorage.length; i++) { // For each element in localStorage, create product and get its elements
        createCartItems();
        let productInCart = localStorage.getItem(localStorage.key(i));
        let productInCartObject = JSON.parse(productInCart);
        newImage.src = productInCartObject["imageUrl"];
        newName.innerHTML = productInCartObject["name"];
        newLense.innerHTML = "Lentille: " + productInCartObject["lense"];
        let productPrice = productInCartObject["price"];
        newPrice.innerHTML = (productPrice / 100).toFixed(2) + "€";
        let productQuantity = productInCartObject["quantity"];
        newQuantity.innerHTML = productQuantity;
        newTotal.innerHTML = ((productPrice / 100) * productQuantity).toFixed(2) + "€";
    }
}

function checkCartQuantity() { // Check if localStorage is empty or filled and acts accordingly
    if (localStorage.length === 0 ) {
        emptyCart()
    } else {
        getCartItems()
    }
}

export { checkCartQuantity, cartButton }; // Export function and variable necessary