let cardsList = document.getElementById("cards__list");

fetch("http://localhost:3000/api/cameras/")
    .then(response => response.json()) // Return an JSON object
    .then(response => {
        for (let i in response) { // For each camera contained in the JSON object (no matter how many)
            let newDiv = document.createElement("div"); // Create new card, add class .card and put it in cards__list div
            newDiv.classList.add("card");
            cardsList.appendChild(newDiv);
            let newLink = document.createElement("a"); // Insert in the div link, img, description with name & price
            newLink.setAttribute("href", "produit.html?id=" + response[i]["_id"]);
            newLink.classList.add("card__link");
            newDiv.appendChild(newLink);
            let newImage = document.createElement("img"); 
            newImage.classList.add("card__image");
            newLink.appendChild(newImage);
            let newDescription = document.createElement("div");
            newDescription.classList.add("card__description")
            newLink.appendChild(newDescription);
            let newName = document.createElement("p");
            newName.classList.add("card__name");
            newDescription.appendChild(newName);
            let newPrice = document.createElement("p");
            newPrice.classList.add("card__price");
            newDescription.appendChild(newPrice);
            fetch("http://localhost:3000/api/cameras/" + response[i]["_id"]) // Call elements dependings on url
            .then(response => response.json())
            .then(response => {
                newImage.src = response["imageUrl"]; // Take imageUrl for the img src
                newName.innerHTML = response["name"]; // Display the name of response
                newPrice.innerHTML = response["price"] + "€"; // Display the price of response
            })
            .catch(error => console.log("ERREUR : " + error));
        }
    })
    .catch(error => console.log("ERREUR : " + error));