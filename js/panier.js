import { checkCartQuantity, cartButton } from "./panier_fonctions.js"; // Import function and variable necessary
import { Contact } from "./Contact.js";

let formButton = document.getElementById("form__button");

checkCartQuantity(); // Use the function

cartButton.addEventListener("click", function(){ // Clear localStorage and check if the cart is empty or not
    localStorage.clear();
    checkCartQuantity();
});

formButton.addEventListener("click", function(){ // take form values and product ids in cart and post it at the API
    let firstName = document.getElementById("firstName").value; // take input values
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    let contactInfos = new Contact(firstName, lastName, address, city, email); // create an object of contact infos
    let products = []; // create products array and push each id contained in the localStorage
    for (let i = 0; i < localStorage.length; i++) {
        let id = localStorage.key(i);
        products.push(id);
    }
    let order = {contactInfos, products}; // create order object
    let orderJson = JSON.stringify(order); // convert this object to JSON
    console.log(orderJson);
    // let requestOptions = {
    //     method: "POST"
    // }
    // fetch("http://localhost:3000/api/cameras/" + orderJson, requestOptions)
    // .then(response => console.log(response))
    // .catch(error => console.log(error));
    
    // document.location.href = "confirmation.html";
});

