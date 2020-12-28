let searchParams = new URLSearchParams(window.location.search); //use URLSearchParams constructor to get values of url parameters
let confirmationText = document.getElementById("confirmation__text");
let orderFirstName = searchParams.get("firstName");
let orderLastName = searchParams.get("lastName");
let orderId = searchParams.get("orderId");
let orderTotal = searchParams.get("total");
let orderProducts = (searchParams.get("ids")).split(","); // convert ids string to array
let summary = document.getElementById("summary");

confirmationText.innerHTML = "Merci <strong>" + orderFirstName + " " + orderLastName + "</strong>, votre commande n° <strong>" + orderId 
+ "</strong> d'un montant de <strong>" + (orderTotal / 100).toFixed(2) + "€ </strong> a bien été prise en compte."

for (let i in orderProducts) {
    let orderProduct = document.createElement("div");
    orderProduct.classList.add("summary__product");
    summary.appendChild(orderProduct);
    let orderProductImage = document.createElement("img");
    orderProductImage.classList.add("summary__image");
    orderProduct.appendChild(orderProductImage);
    let orderProductName = document.createElement("span");
    orderProductName.classList.add("summary__name");
    orderProduct.appendChild(orderProductName);
    fetch("http://localhost:3000/api/cameras/" + orderProducts[i])
    .then(response => response.json())
    .then(response => {
        orderProductImage.src = response["imageUrl"];
        orderProductName.textContent = response["name"];
    })
    .catch(error => {
        console.log(error);
        alert("Erreur de serveur, tentative de reconnnexion...");
        setTimeout(function(){document.location.reload()}, 1000);
    });
}