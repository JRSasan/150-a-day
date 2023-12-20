import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://adaydb-8efe8-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const expenseListInDB = ref(database, "expenseList");

const descriptionFieldEl = document.getElementById("description-input");
const priceFieldEl = document.getElementById("price-input");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", function() {
    let descriptionValue = descriptionFieldEl.value;
    let priceValue = priceFieldEl.value;
    let expense = {description: descriptionValue, price: priceValue};

    push(shoppingListInDB, expense);
});

