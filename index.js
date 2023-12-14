
const descriptionFieldEl = document.getElementById("description-input");
const priceFieldEl = document.getElementById("price-input");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", function() {
    let descriptionValue = descriptionFieldEl.value;
    let priceValue = priceFieldEl.value;
    console.log(descriptionValue);
    console.log(priceValue);
});

