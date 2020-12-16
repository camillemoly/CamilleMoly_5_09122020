import { Product } from "./Product.js";

let searchParams = new URLSearchParams(window.location.search); //use URLSearchParams constructor to get values of url parameters
let productId = searchParams.get("id");

fetch("http://localhost:3000/api/cameras/" + productId)
.then(response => response.json())
.then(response => {
    let imageDiv = document.getElementById("product__image"); // take img div
    imageDiv.src = response["imageUrl"]; //give imageUrl to img src

    let nameDiv = document.getElementById("product__name");
    nameDiv.innerHTML = response["name"];

    let descriptionDiv = document.getElementById("product__description");
    descriptionDiv.innerHTML = response["description"];

    let priceDiv = document.getElementById("product__price");
    priceDiv.innerHTML = response["price"] + "€";

    let arrayLenses = response["lenses"];
    let selectDiv = document.getElementById("product__options");
    for(let i in arrayLenses) { // create select option from length of arrayLenses
        let newOption = document.createElement("option");
        newOption.text = arrayLenses[i];
        selectDiv.add(newOption);
    }
})
.catch(error => console.log("ERREUR : " + error));

let addToCartButton = document.getElementById("product__button");
let productConfirm = document.getElementById("product__confirm");
let productQuantity = 0;

addToCartButton.addEventListener("click", function() {
    productQuantity++;
    let productAdded = new Product(productImageUrl, productName, productPrice, productQuantity);
    let productAddedJson = JSON.stringify(productAdded);
    localStorage.setItem(productId, productAddedJson);
    productConfirm.innerHTML = "Produit ajouté au panier !";
});





// let productImageUrl = searchParams.get("imageUrl"); // get product imageUrl value
// let imageDiv = document.getElementsByClassName("product__image")[0]; // take img div
// imageDiv.src = productImageUrl; //give imageUrl to img src

// let productName = searchParams.get("name");
// let nameDiv = document.getElementsByClassName("product__name")[0];
// nameDiv.innerHTML = productName;

// let productDescription = searchParams.get("description");
// let descriptionDiv = document.getElementsByClassName("product__description")[0];
// descriptionDiv.innerHTML = productDescription;

// let productPrice = searchParams.get("price");
// let priceDiv = document.getElementsByClassName("product__price")[0];
// priceDiv.innerHTML = productPrice + "€";

// let lenses = searchParams.get("lenses");
// let arrayLenses = lenses.split(","); // create array from lenses string
// let selectDiv = document.getElementsByClassName("product__options")[0];
// for(let i in arrayLenses) { // create select option from length of arrayLenses
//     newOption = document.createElement("option");
//     newOption.text = arrayLenses[i];
//     selectDiv.add(newOption);
// }

// let addToCartButton = document.getElementsByClassName("product__button")[0];
// let productConfirm = document.getElementsByClassName("product__confirm")[0];
// let productQuantity = 0;

// addToCartButton.addEventListener("click", function() {
//     productQuantity++;
//     let productAdded = new productObject(productImageUrl, productName, productPrice, productQuantity);
//     let productAddedJson = JSON.stringify(productAdded);
//     localStorage.setItem(productId, productAddedJson);
//     productConfirm.innerHTML = "Produit ajouté au panier !";
// });