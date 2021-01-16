import { convertToFloatNumber } from "./fonction-float.js";

let cardsList = document.getElementById("cards__list");

fetch("http://localhost:3000/api/cameras/")
    .then(response => response.json()) // Return an JavaScript object
    .then(products => {
        for (let product of products) { // For each camera contained in the JSON object (no matter how many)
            let newDiv = document.createElement("div");
            newDiv.classList.add("card");
            newDiv.innerHTML =
                `
                <a href="produit.html?id=${product._id}" class="card__link">
                    <img src="${product.imageUrl}" class="card__image"/>
                    <div class="card__description">
                        <span class="card__name">${product.name}</span>
                        <span class="card__price">${convertToFloatNumber(product.price)}€</span>
                    </div>
                </a>
                `
            cardsList.appendChild(newDiv);
        }
    })
    .catch(error => {
        console.log(error);
        alert("Erreur de serveur, tentative de reconnnexion...");
        setTimeout(function(){document.location.reload()}, 1000);
    });