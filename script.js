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
        prepare_time: 15,
        time: 30,
        difficulty: "leicht",
        date_added: "28.09.2025",
        receipt_user: "Joscha",
        receipt_user_img: "/assets/img/receipt_user.jpg",
        instructions: "Für den griechischen Salat werden zunächst Tomaten, Gurken, Paprika und rote Zwiebeln in mundgerechte Stücke geschnitten und in eine Schüssel gegeben. Danach kommen schwarze Oliven sowie würziger Feta in groben Würfeln hinzu. Alles wird mit etwas Olivenöl beträufelt und mit Salz, Pfeffer und Oregano abgeschmeckt. Der Salat sollte vorsichtig durchgemischt werden, damit die Zutaten gleichmäßig verteilt sind, der Feta aber nicht zerfällt. Anschließend wird er frisch serviert und eignet sich ideal als Beilage oder leichtes Hauptgericht.",
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
        prepare_time: 15,
        time: 30,
        difficulty: "leicht",
        date_added: "28.09.2025",
        receipt_user: "Joscha",
        receipt_user_img: "/assets/img/receipt_user.jpg",
        instructions: "Für die Zubereitung des Burgers wird das Patty in einer heißen Pfanne oder auf dem Grill von beiden Seiten gebraten, bis es die gewünschte Garstufe erreicht hat. Währenddessen können die Burgerbrötchen leicht angeröstet werden, damit sie knusprig und aromatisch sind. Anschließend wird die Unterseite des Brötchens mit Sauce bestrichen und mit frischem Salat belegt. Darauf kommt das saftige Patty, das nach Belieben mit Käse, Tomaten und Gurken ergänzt werden kann. Zum Schluss wird der Brötchendeckel aufgelegt, der Burger leicht zusammengedrückt und sofort warm serviert.",
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
        prepare_time: 15,
        time: 20,
        difficulty: "Mittel",
        date_added: "28.09.2025",
        receipt_user: "Joscha",
        receipt_user_img: "/assets/img/receipt_user.jpg",
        instructions: "Für die italienische Pasta wird zunächst ausreichend Wasser in einem großen Topf zum Kochen gebracht und kräftig gesalzen. Anschließend wird die Pasta hineingegeben und nach Packungsanweisung al dente gegart. Währenddessen kann in einer Pfanne eine Sauce aus Olivenöl, Knoblauch und frischen Tomaten zubereitet werden, die nach Belieben mit Kräutern wie Basilikum oder Oregano verfeinert wird. Die fertig gekochte Pasta wird abgegossen und direkt mit der heißen Sauce vermengt, sodass sie die Aromen gut aufnimmt. Zum Schluss wird das Gericht mit frisch geriebenem Parmesan serviert und noch warm genossen.",
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
        prepare_time: 15,
        time: 25,
        difficulty: "Schwer",
        date_added: "28.09.2025",
        receipt_user: "Joscha",
        receipt_user_img: "/assets/img/receipt_user.jpg",
        instructions: "Für die Zubereitung von Croissants wird zunächst ein Hefeteig hergestellt, der nach dem Gehen mehrmals ausgerollt und mit Butter eingeschlagen wird, um die typischen Blätterteigschichten zu erzeugen. Der Teig wird anschließend in Dreiecke geschnitten und von der breiten Seite her straff aufgerollt. Die geformten Croissants legt man auf ein Backblech und lässt sie nochmals gehen, bis sie sichtbar aufgegangen sind. Danach werden sie mit etwas verquirltem Ei bestrichen, damit sie beim Backen eine goldbraune, glänzende Oberfläche bekommen. Im vorgeheizten Ofen gebacken, entstehen luftige, buttrige Croissants, die am besten noch warm serviert werden.",
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
    setCookingTime(receipt);
    generateReceiptInstruction(receipt);
    generateReceiptUserData(receipt);
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

function sendMail(event) {
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

function setCookingTime(receipt) {
    let receipt_item = receipts[receipt]
    let prepare_time_element = document.getElementById('prepare_time');
    let total_time_element = document.getElementById('total_time');
    let time = receipt_item.time;
    let prepare_time = receipt_item.prepare_time;
    let total_time = time + prepare_time;
    prepare_time_element.innerHTML = prepare_time + " Min";
    total_time_element.innerHTML = total_time + " Min";
}

function generateReceiptInstruction(receipt) {
    let receipt_item = receipts[receipt];
    let instruction_element = document.getElementById('receipt_instruction');
    instruction_element.innerHTML = receipt_item.instructions;
}

function generateReceiptUserData(receipt) {
    let receipt_item = receipts[receipt];
    let receipt_user_img_element = document.getElementById('receipt_user_img');
    let receipt_user_element = document.getElementById('receipt_user');
    receipt_user_element.innerHTML = receipt_item.receipt_user;
    receipt_user_img_element.src = receipt_item.receipt_user_img; 

}

function openMenu() {
    let nav = document.getElementById('open_menu_nav');
    nav.classList.toggle('open_menu_overlay');
}