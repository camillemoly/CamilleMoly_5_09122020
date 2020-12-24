import { checkCartQuantity, isValid, cartClearButton, totalPriceCart } from "./fonctions-panier.js"; // Import function and variable necessary
import { Contact } from "./Contact.js";

let formButton = document.getElementById("form__button");

// Use the function to check if cart is empty or not
checkCartQuantity(); 

// Clear localStorage and use checkCartQuantity fonction to replace reload
cartClearButton.addEventListener("click", function(){ 
    localStorage.clear();
    checkCartQuantity();
});

// Take form values and product ids in cart and post it at the API
formButton.addEventListener("click", function(){
    let firstName = document.getElementById("firstName").value; // take input values
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    if ((isValid(firstName) === false) || (isValid(lastName) === false)) { // if first/last name contain number, display invalid message
        let invalidMessage = document.getElementById("invalid__message");
        invalidMessage.textContent = "Les champs prénom/nom ne doivent pas contenir de chiffres.";
        invalidMessage.style.color = "red";
    } else { // if all form inputs are valid, create contact object & products array, set it to API and get response
        let contact = new Contact(firstName, lastName, address, city, email); // create an object of contact infos
        let products = []; // create products array and push each id contained in the localStorage
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
        .catch(error => console.log("ERREUR : " + error));
        localStorage.clear(); // clear localStorage
    }
});