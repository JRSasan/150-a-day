import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

    updateTotalValue(total.value);

    clearInputFieldEl();
});

onValue(expenseListInDB, function(snapshot){
    if (snapshot.exists()){
        let expenseItemsArray = Object.entries(snapshot.val());

        clearExpenseListEl();

        for (let i = 0; i < expenseItemsArray.length; i++) {
            let currentItem = expenseItemsArray[i];
            let currentItemId = currentItem[0];
            let currentItemValue = currentItem[1];

            appendItemToExpenseListEl(currentItem);
        }
    } else {
        expenseListEl.innerHTML = "No expenses here... yet"
    }
    
})

onValue(totalInDB, function(snapshot){
    if (snapshot.exists()){
        totalValue = Number(Object.values(snapshot.val()));
        updateTotalValue(totalValue);
    } else {
        totalEl.innerHTML = "₱ 0";
    }
    
})

function clearInputFieldEl() {
    descriptionFieldEl.value = "";
    priceFieldEl.value = "";
}

function clearExpenseListEl() {
    expenseListEl.innerHTML = "";
}

function appendItemToExpenseListEl(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let list = document.createElement("li");
    let itemDescription = document.createElement("span");
    let itemPrice = document.createElement("span");

    itemDescription.textContent = itemValue.description
    itemPrice.textContent = "₱ " + itemValue.price

    list.addEventListener("dblclick", function() {
        let locationOfItemInDB = ref(database, `expenseList/${itemID}`);

        totalValue -= itemValue.price
        let total = {value: totalValue};

        set(totalInDB, total);
        
        remove(locationOfItemInDB);
    })

    list.append(itemDescription);
    list.append(itemPrice);

    expenseListEl.append(list);
}

function updateTotalValue(totalExpense) {

    totalEl.innerHTML = `₱ ${totalExpense}`;
}

