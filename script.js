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

function initReceipt() {
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
    let item = receipts[receipt];
    content.innerHTML = /*html*/ `
        <div>${form}</div>
        <table>${table}</table>
`
}

function generateFormReceiptIngredients() {
    return /*html*/`<form class="amount_people_form" onsubmit="alert('Klappt')" action="">
        <label for="number_people">Zutaten für</label>
        <input type="number" min="1"  id="number_people" value="1" required>
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