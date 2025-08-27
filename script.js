const receipt_menus = ['greek_salad', 'burger', 'pasta', 'croissants']
const receipts = {
    greek_salad: {
        name: "Griechischer Salad",
        img: "./assets/img/salad.jpg",
        ingredients: [
            " große Tomaten",
            " große Gurke",
            " Zwiebel",
            " Paprika",
            "g Feta-Käse",
            "g Kalamata-Oliven",
            "EL Olivenöl",
            "EL Rotweinessig",
            "TL Oregano",
            " Salz nach Geschmack",
            " Pfeffer nach Geschmack",
            " frische Basilikumblätter (optional) zum Garnieren"
        ],
        amounts: [2, 1, 1, 1, 200, 100, 2, 1, 1, "", "", ""],
        time: "15 Min",
        difficulty: "leicht",
        date_added: "28.09.2025"
    },

    burger: {
        name: "Saftiger Burger",
        img: "./assets/img/burger.jpg",
        ingredients: [
            " Burgerbrötchen",
            "g Rinderhackfleisch",
            " Scheiben Cheddar-Käse",
            " Salatblätter",
            " Tomatenscheiben",
            " Rote Zwiebelringe",
            " halbe Essiggurken",
            "TL Ketchup",
            "TL Mayonnaise",
            "TL Senf",
            " Salz und Pfeffer nach Geschmack"
        ],
        amounts: [2, 150, 2, 2, 3, 2, 2, 1, 1, 1, ""],
        time: "30 Min",
        difficulty: "leicht",
        date_added: "28.09.2025"
    },

    pasta: {
        name: "Italienische Pasta",
        img: "./assets/img/pasta.jpg",
        ingredients: [
            "g Spaghetti",
            " große Knoblauchzehen",
            "EL Olivenöl",
            "g reife Tomaten",
            " einige Blätter frisches Basilikum",
            " g geriebener Parmesan",
            "Salz nach Geschmack",
            "Pfeffer nach Geschmack"
        ],
        amounts: [200, 2, 2, 500, "", 100, "", ""],
        time: "20 Min",
        difficulty: "Mittel",
        date_added: "28.09.2025"
    },

    croissants: {
        name: "Französische Croissants",
        img: "./assets/img/croissant.jpg",
        ingredients: [
            "kg Croissantteig",
            "g Butter (zum Bestreichen)",
            "g Schokoladenstückchen ",
            " Ei (zum Bestreichen)"
        ],
        amounts: [1, 50, 100, 1],
        time: "45 Min",
        difficulty: "Schwer",
        date_added: "28.09.2025"
    }
};

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function saveReceipt(receipt) {
    localStorage.setItem("receipt", receipt)
}

async function initReceipt() {
    await includeHTML(); 
    let receipt = localStorage.getItem("receipt");
    renderReceiptHeader(receipt);
    renderReceiptIngredients(receipt);
}


function renderReceiptHeader(receipt) {
    let content = document.getElementById('receipt_header');
    let item = receipts[receipt]
    content.innerHTML = /*html*/ `
        <h1>${item.name}</h1>
        <img class="receipt_header_img" src="${item.img}" alt="Bild eines ${item}">
        <div class="receipt_info_short"> 
            <div class="receipt_info_short_item"><img class="receipt_header_icon" src="/assets/icons/clock-regular.svg" alt="Bild einer Uhr"> ${item.time}</div>
            <div class="receipt_info_short_item"><img class="receipt_header_icon" src="/assets/icons/brain-solid.svg" alt="Darstellung für Schwierigkeit"> ${item.difficulty}</div>
            <div class="receipt_info_short_item"><img class="receipt_header_icon" src="/assets/icons/calendar-alt-regular.svg" alt="Erstellungsdatum"> ${item.date_added}</div>
        </div> `
}

function renderReceiptIngredients(receipt) {
    let content = document.getElementById('receipt_ingredients_section');
    let form = generateFormReceiptIngredients();
    let table = generateIngredientsTable(receipt);
    content.innerHTML = /*html*/ `
        <div>${form}</div>
        <table id="table">${table}</table>
`
}

function generateFormReceiptIngredients() {
    return /*html*/`
    <form class="amount_people_form"  onsubmit="event.preventDefault(), calcReceiptAmount()">
        <label for="number_people">Zutaten für</label>
        <input type="number" min="1"  id="number_people" value="2" required>
        <input class="amount_people_ingredients_btn" type="submit" value="Portionen">
    </form>`
}

function generateIngredientsTable(receipt) {
    let item = receipts[receipt];
    let content = '';
    for (let i = 0; i < item.ingredients.length; i++) {
        const ingredient = item.ingredients[i];
        const amount = item.amounts[i];
        content += /*html*/`
            <tr>
            <td>${amount} ${ingredient}</td> 
            </tr>`
    }
    return content;
}

function calcReceiptAmount() {
    let receipt = localStorage.getItem("receipt");
    let item = receipts[receipt];
    let default_value = document.getElementById('number_people').defaultValue;
    let value = document.getElementById('number_people').value;
    for (let index = 0; index < item.amounts.length; index++) {
        let amount = item.amounts[index];
        let current_amount = amount / default_value;
        let new_amount = current_amount * value;
        if (new_amount == 0) {
            new_amount = '';
            item.amounts[index] = new_amount;
        }
        else { item.amounts[index] = new_amount; }
    }
    document.getElementById('number_people').defaultValue = value;
    newIngredientsTable(receipt);
}

function newIngredientsTable(receipt) {
    let table = document.getElementById('table')
    let item = receipts[receipt];
    let content = '';
    for (let i = 0; i < item.ingredients.length; i++) {
        const ingredient = item.ingredients[i];
        const amount = item.amounts[i];
        content += /*html*/`
            <tr>
            <td>${amount} ${ingredient}</td> 
            </tr>`
    }
    table.innerHTML = content;
}

function openDailyReceipt() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let indexToShow = day % receipt_menus.length;
    localStorage.setItem("receipt", receipt_menus[indexToShow])
}

function sendMail(event){﻿
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("https://formspree.io/f/mblaldnk", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(() => {
        window.location.href = "./send_mail.html";
    }).catch((error) => {
        console.log(error);
    });
}