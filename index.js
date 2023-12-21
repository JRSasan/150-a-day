import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://adaydb-8efe8-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const expenseListInDB = ref(database, "expenseList");
const totalInDB = ref(database, "total")

const descriptionFieldEl = document.getElementById("description-input");
const priceFieldEl = document.getElementById("price-input");
const totalEl = document.getElementById("total-el");
const addButtonEl = document.getElementById("add-button");
const expenseListEl = document.getElementById("expense-list");
let totalValue = 0;

addButtonEl.addEventListener("click", function() {
    let descriptionValue = descriptionFieldEl.value;
    let priceValue = priceFieldEl.value;
    let expense = {description: descriptionValue, price: priceValue};
    totalValue += Number(priceValue);
    let total = {value: totalValue};

    push(expenseListInDB, expense);
    set(totalInDB, total);

    let html = `
        <li><span>${descriptionValue}</span><span>${priceValue}</span></li>
    `;

    expenseListEl.innerHTML += html;
    totalEl.innerHTML = `₱ ${total.value}`

    descriptionFieldEl.value = "";
    priceFieldEl.value = "";
});

