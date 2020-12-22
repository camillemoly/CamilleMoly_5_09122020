import { Product } from "./Product.js";

let searchParams = new URLSearchParams(window.location.search); //use URLSearchParams constructor to get values of url parameters
let productId = searchParams.get("id"); // get id product
let productImageUrl;
let productName;
let productPrice;
let selectDiv;
let addToCartButton = document.getElementById("product__button");
let productConfirm = document.getElementById("product__confirm");


fetch("http://localhost:3000/api/cameras/" + productId) // GET camera according to the id
.then(response => response.json()) // request's body in JSON format convert to an Javascript object
.then(response => {
    let imageDiv = document.getElementById("product__image"); // take img div
    productImageUrl = response["imageUrl"]
    imageDiv.src = productImageUrl; // give imageUrl to img src

    let nameDiv = document.getElementById("product__name"); // take name div
    productName = response["name"];
    nameDiv.innerHTML = productName; // display product name

    let descriptionDiv = document.getElementById("product__description");
    descriptionDiv.innerHTML = response["description"];

    let priceDiv = document.getElementById("product__price");
    productPrice = response["price"];
    priceDiv.innerHTML = (productPrice / 100).toFixed(2) + "€"; // get a number with 2 decimals

    let arrayLenses = response["lenses"];
    selectDiv = document.getElementById("product__options");
    for(let i in arrayLenses) { // create select option from length of arrayLenses
        let newOption = document.createElement("option");
        newOption.setAttribute("value", arrayLenses[i])
        newOption.text = arrayLenses[i];
        selectDiv.add(newOption);
    }
})
.catch(error => console.log("ERREUR : " + error));

addToCartButton.addEventListener("click", function() {
    let productOption = selectDiv.options[selectDiv.selectedIndex].value; // take the value of selected lense
    let customProduct = productId + "-" + productOption;
    if (productOption === "") { // if a lense is not selected, prevent the product from being added to the cart
        productConfirm.innerHTML = "Veuillez renseigner le champ d'options !";
    } else if (localStorage.getItem(customProduct) === null) { // (localStorage.key(productId) == null)
        let productQuantity = 1;
        let productAdded = new Product(productId, productImageUrl, productName, productPrice, productOption, productQuantity); // create product
        let productAddedJson = JSON.stringify(productAdded); // convert to JSON format to be added in cart
        localStorage.setItem(customProduct, productAddedJson); // add product in cart
        productConfirm.innerHTML = "Produit ajouté au panier !"; // confirm the addition
    } else if (localStorage.key(customProduct) !== null){
        let productUpdate = JSON.parse(localStorage.getItem(customProduct));
        let quantityUpdate = productUpdate["quantity"];
        quantityUpdate++;
        productUpdate["quantity"] = quantityUpdate;
        let productUpdateJson = JSON.stringify(productUpdate);
        localStorage.setItem(customProduct, productUpdateJson);
        productConfirm.innerHTML = "Produit ajouté au panier !";
}});