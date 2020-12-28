// Import function and variable necessary
import { checkCartQuantity, cartClearButton, totalPriceCart } from "./fonctions-panier.js";
import { nameValid, emailValid, specialCharactersValid, onlyWhitespacesInvalid } from "./validation-form.js";
import { Contact } from "./Contact.js";

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let formButton = document.getElementById("form__button");
let invalidMessage = document.getElementById("invalid__message");
invalidMessage.style.color = "red";

// Use the function to check if cart is empty or not
checkCartQuantity(); 

// Clear localStorage and use checkCartQuantity fonction to replace reload
cartClearButton.addEventListener("click", function(){ 
    localStorage.clear();
    checkCartQuantity();
});

// When button "Envoyer" is clicked
formButton.addEventListener("click", function(){
    // Verifiy form inputs values
    if (firstName.validity.valueMissing || lastName.validity.valueMissing || address.validity.valueMissing || city.validity.valueMissing || email.validity.valueMissing) {
        invalidMessage.textContent = "Tous les champs sont requis.";
    } else if (specialCharactersValid(firstName.value) === false || specialCharactersValid(lastName.value) === false || specialCharactersValid(address.value) === false || specialCharactersValid(city.value) === false) {
        invalidMessage.textContent = "Les champs prénom/nom/adresse/ville ne doivent pas comporter de caractères spéciaux.";
    } else if (nameValid(firstName.value) === false || nameValid(lastName.Value) === false) {
        invalidMessage.textContent = "Les champs nom/prénom doivent être composés de lettres et ne doivent pas contenir de chiffres.";
    } else if (emailValid(email.value) === false) {
        invalidMessage.innerHTML = "Le champ email doit être composé de cette manière <em>xxxxxxxx@xxxxx.xxx</em>";
    } else if (onlyWhitespacesInvalid(firstName.value) || onlyWhitespacesInvalid(lastName.value) || onlyWhitespacesInvalid(address.value) || onlyWhitespacesInvalid(city.value) || onlyWhitespacesInvalid(email.value)) {
        invalidMessage.textContent = "Les champs ne doivent pas contenir uniquement des espaces.";
    } else { // if all form inputs are valid, create contact object & products array, set them to API and get response
        let contact = new Contact(firstName.value, lastName.value, address.value, city.value, email.value); // create contact object
        let products = []; // create products array and push each id of camera contained in the localStorage
        for (let i = 0; i < localStorage.length; i++) {
            let id = JSON.parse(localStorage.getItem(localStorage.key(i)))["id"];
            products.push(id);
        }
        products = Array.from(new Set(products)); // remove duplicates
        let order = {contact, products}; // create order object
        let requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order) // stringify order and put it in the body of request
        }
        fetch("http://localhost:3000/api/cameras/order", requestOptions)
        .then(response => response.json())
        .then(response => { // get items of request reponse and put them in confirmation page URL, and redirect to this page
            document.location.href = "confirmation.html?firstName=" + response["contact"]["firstName"] + "&lastName=" + 
            response["contact"]["lastName"] + "&orderId=" + response["orderId"] + "&total=" + totalPriceCart + "&ids=" + products;
        })
        .catch(error => {
            console.log(error);
            alert("Erreur de serveur, tentative de reconnnexion...");
            setTimeout(function(){document.location.reload()}, 1000);
        });
        localStorage.clear(); // clear localStorage
    }
});