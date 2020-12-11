let ids = [];
let cardsList = document.getElementById("cards__list");

fetch("http://localhost:3000/api/cameras/")
    .then(response => response.json()) // Return an JSON object
    .then(response => {
        // for(let i in response) {
        //     ids.push(response[i]["_id"]);
        // }
        // console.log(ids);
        for (let i in response) { // For each camera contained in the JSON object (no matter how many)
            let newDiv = document.createElement("div"); // Create new card, add class .card and put it in cards__list div
            newDiv.classList.add("card");
            cardsList.appendChild(newDiv);
            let newLink = document.createElement("a");
            newLink.setAttribute("href", "http://localhost:3000/api/cameras/" + response[i]["_id"]);
            newLink.classList.add("card__link");
            newDiv.appendChild(newLink);
            let newImage = document.createElement("img"); // Create 
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
            fetch("http://localhost:3000/api/cameras/" + response[i]["_id"])
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => {
                newImage.src = response["imageUrl"];
                newName.innerHTML = response["name"];
                newPrice.innerHTML = response["price"];
            })
            .catch(error => console.log("ERREUR : " + error));
        }
    })
    .catch(error => console.log("ERREUR : " + error));


// let ids = [];
// function getIds(){
//     fetch("http://localhost:3000/api/cameras/")
//     .then(response => response.json())
//     .then(response => {
//         for(let i in response) {
//             ids.push(response[i]["_id"]);
//         }
//     console.log(ids);
//     })
//     .catch(error => console.log("ERREUR : " + error));
// };

// function createCards(){
//     for (let i = 0; i < 5; i++) {
//         let cardsList = document.getElementById("cards__list");
//         let newDiv = document.createElement("div");
//         newDiv.classList.add("card");
//         cardsList.appendChild(newDiv);
//     }
// };

// function anotherFunction(){
//     fetch("http://localhost:3000/api/cameras/" + ids[0])
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(error => console.log("ERREUR : " + error));
// }

// getIds()
// .then(anotherFunction())
// .then(createCards())
// .catch(error => console.log("ERREUR : " + error));

// async function callElements(){
//     await getIds();
//     createCards();
//     anotherFunction();
// }
// callElements();


// const callElements = () => {
//     for (let i in ids) {
//         fetch("http://localhost:3000/api/cameras/" + ids[i])
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(error => console.log("ERREUR : " + error));
//     }
// }

// callElements();

// let urls = [
//     "5be1ed3f1c9d44000030b061",
//     "5be1ef211c9d44000030b062",
//     "5be9bc241c9d440000a730e7",
//     "5be9c4471c9d440000a730e8",
//     "5be9c4c71c9d440000a730e9"
// ]

// const callElements = (url, image, name, price) => {
//     fetch("http://localhost:3000/api/cameras/" + url)
//     .then(response => response.json())
//     .then(data => {
//         image.src = data.imageUrl;
//         name.innerHTML = data.name;
//         // data.price /= 100;
//         price.innerHTML = data.price;
//     })
//     .catch(error => console.log("ERREUR : " + error));
// };

// callElements(urls[0], image1, name1, price1);
// callElements(urls[1], image2, name2, price2);
// callElements(urls[2], image3, name3, price3);
// callElements(urls[3], image4, name4, price4);
// callElements(urls[4], image5, name5, price5);

// fetch("http://localhost:3000/api/cameras")
//     .then(response => response.json())
//     // .then(response => JSON.parse(response))
//     .then(response => {
//         console.log(typeof response);
//         console.log(response);
//         console.log(response[0]);
//         console.log(response[0]["price"]);
//     })
//     .catch(error => console.log("ERREUR : " + error));

// //Camera 1
// let image1 = document.getElementById("image1");
// let name1 = document.getElementById("name1");
// let price1 = document.getElementById("price1");

// fetch("http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061")
// .then(response => response.json())
// .then(data => {
//     image1.src = data.imageUrl;
//     name1.innerHTML = data.name;
//     price1.innerHTML = data.price;
// })
// .catch(error => alert("ERREUR : l'erreur correspond à la séquence suivante : " + error));

// //Camera 2
// let image2 = document.getElementById("image2");
// let name2 = document.getElementById("name2");
// let price2 = document.getElementById("price2");

// fetch("http://localhost:3000/api/cameras/5be1ef211c9d44000030b062")
// .then(response => response.json())
// .then(data => {
//     image2.src = data.imageUrl;
//     name2.innerHTML = data.name;
//     price2.innerHTML = data.price;
// })
// .catch(error => alert("ERREUR : l'erreur correspond à la séquence suivante : " + error));

// //Camera 3
// let image3 = document.getElementById("image3");
// let name3 = document.getElementById("name3");
// let price3 = document.getElementById("price3");

// fetch("http://localhost:3000/api/cameras/5be9bc241c9d440000a730e7")
// .then(response => response.json())
// .then(data => {
//     image3.src = data.imageUrl;
//     name3.innerHTML = data.name;
//     price3.innerHTML = data.price;
// })
// .catch(error => alert("ERREUR : l'erreur correspond à la séquence suivante : " + error));

// //Camera 4
// let image4 = document.getElementById("image4");
// let name4 = document.getElementById("name4");
// let price4 = document.getElementById("price4");

// fetch("http://localhost:3000/api/cameras/5be9c4471c9d440000a730e8")
// .then(response => response.json())
// .then(data => {
//     image4.src = data.imageUrl;
//     name4.innerHTML = data.name;
//     price4.innerHTML = data.price;
// })
// .catch(error => alert("ERREUR : l'erreur correspond à la séquence suivante : " + error));

// //Camera 5
// let image5 = document.getElementById("image5");
// let name5 = document.getElementById("name5");
// let price5 = document.getElementById("price5");

// fetch("http://localhost:3000/api/cameras/5be9c4c71c9d440000a730e9")
// .then(response => response.json())
// .then(data => {
//     image5.src = data.imageUrl;
//     name5.innerHTML = data.name;
//     price5.innerHTML = data.price;
// })
// .catch(error => alert("ERREUR : l'erreur correspond à la séquence suivante : " + error));