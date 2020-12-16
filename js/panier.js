let cartTitle = document.getElementsByClassName("cart__title")[0];
let cartCategory = document.getElementsByClassName("cart__category")[0];
let cartButton = document.getElementsByClassName("cart__button")[0];
let cartDiv = document.getElementsByClassName("cart")[0];

function getCartItems() {
    if (localStorage.length === 0 ) {
        cartTitle.innerHTML = "Votre panier est vide.";
        cartButton.classList.add("none");
        cartCategory.classList.add("none");
        while (cartDiv.lastChild.id !== 'cart__title') {
            cartDiv.removeChild(cartDiv.lastChild);
        }
    } else {
        for(let i=0; i < localStorage.length; i++) {
            let productInCart = localStorage.getItem(localStorage.key(i));
            let productInCartObject = JSON.parse(productInCart);
            let newDiv = document.createElement("div");
            newDiv.classList.add("cart__product");
            cartDiv.appendChild(newDiv);
            let newImage = document.createElement("img");
            newImage.classList.add("cart__product__image");
            newImage.src = productInCartObject["imageUrl"];
            newDiv.appendChild(newImage);
            let newName = document.createElement("p");
            newName.classList.add("cart__product__name");
            newName.innerHTML = productInCartObject["name"];
            newDiv.appendChild(newName);
            let newPrice = document.createElement("p");
            let productPrice = productInCartObject["price"];
            newPrice.classList.add("cart__product__price");
            newPrice.innerHTML = productPrice + "€";
            newDiv.appendChild(newPrice);
            let newQuantity = document.createElement("p");
            let productQuantity = productInCartObject["quantity"];
            newQuantity.classList.add("cart__product__quantity");
            newQuantity.innerHTML = productQuantity;
            newDiv.appendChild(newQuantity);
            let newTotal = document.createElement("p");
            newTotal.classList.add("cart__product__total");
            newTotal.innerHTML = productPrice * productQuantity + "€";
            newDiv.appendChild(newTotal);
        }
    }
}

getCartItems();

cartButton.addEventListener("click", function(){
    localStorage.clear();
    getCartItems();
    // document.location.reload();
    // fetch(window.location.href);
});

// console.log(localStorage);
// console.log(localStorage.key(0));
// console.log(localStorage.getItem(localStorage.key(0)));
// console.log(typeof localStorage.getItem(localStorage.key(0)));
// console.log(JSON.parse(localStorage.getItem(localStorage.key(0))));
// console.log(typeof JSON.parse(localStorage.getItem(localStorage.key(0))));