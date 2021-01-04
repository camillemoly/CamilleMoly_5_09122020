import { convertToFloatNumber } from "./fonction-float.js";

let cardsList = document.getElementById("cards__list");

fetch("http://localhost:3000/api/cameras/")
    .then(response => response.json()) // Return an JavaScript object
    .then(response => {
        for (let i in response) { // For each camera contained in the JSON object (no matter how many)
            let newDiv = document.createElement("div"); // Create new card, add class .card and put it in cards__list div
            newDiv.classList.add("card");
            cardsList.appendChild(newDiv);
            let newLink = document.createElement("a"); // Insert in the div link, img product, description with name & price product
            newLink.setAttribute("href", "produit.html?id=" + response[i]["_id"]);
            newLink.classList.add("card__link");
            newDiv.appendChild(newLink);
            let newImage = document.createElement("img"); 
            newImage.classList.add("card__image");
            newLink.appendChild(newImage);
            let newDescription = document.createElement("div");
            newDescription.classList.add("card__description")
            newLink.appendChild(newDescription);
            let newName = document.createElement("span");
            newName.classList.add("card__name");
            newDescription.appendChild(newName);
            let newPrice = document.createElement("span");
            newPrice.classList.add("card__price");
            newDescription.appendChild(newPrice);
            fetch("http://localhost:3000/api/cameras/" + response[i]["_id"]) // Call elements dependings on url
            .then(response => response.json())
            .then(response => {
                newImage.src = response["imageUrl"]; // Take imageUrl of response for the img src
                newName.textContent = response["name"]; // Display reponse name
                newPrice.textContent = convertToFloatNumber(response["price"]) + "€"; // Display reponse price with 2 decimals
            })
            .catch(error => console.log(error));
        }
    })
    .catch(error => {
        console.log(error);
        alert("Erreur de serveur, tentative de reconnnexion...");
        setTimeout(function(){document.location.reload()}, 1000);
    });