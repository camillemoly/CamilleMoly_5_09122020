let searchParams = new URLSearchParams(window.location.search);
let productId = searchParams.get("id");

let productImageUrl = searchParams.get("imageUrl");
let imageDiv = document.getElementsByClassName("product__image")[0];
imageDiv.src = productImageUrl;

let productName = searchParams.get("name");
let nameDiv = document.getElementsByClassName("product__name")[0];
nameDiv.innerHTML = productName;

let productDescription = searchParams.get("description");
let descriptionDiv = document.getElementsByClassName("product__description")[0];
descriptionDiv.innerHTML = productDescription;

let productPrice = searchParams.get("price");
let priceDiv = document.getElementsByClassName("product__price")[0];
priceDiv.innerHTML = productPrice + "€";

let lenses = searchParams.get("lenses");
let arrayLenses = lenses.split(",");
let selectDiv = document.getElementsByClassName("product__options")[0];
for(let i in arrayLenses) {
    newOption = document.createElement("option");
    newOption.text = arrayLenses[i];
    selectDiv.add(newOption);
}