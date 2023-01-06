const view = {
    $getFood: function $getFood() {
        this.items.food = document.querySelectorAll("#food .list-item");

    },
    $getDrink: function $getDrink() {
        this.items.drink = document.querySelectorAll("#drink .list-item");

    },
    $getDesserts: function $getDesserts() {
        this.items.dessert = document.querySelectorAll("#dessert .list-item");
    },
    $setupListenersAndIds: function $setupListenersAndIds() {
        for (let i in [...this.items.food]) {
            this.items.food[i].setAttribute('id', i);
            this.items.food[i].setAttribute('data-test', 'dish');
            this.items.food[i].querySelector('h3').setAttribute('data-test', 'item-name');
            this.items.food[i].querySelector('.price-container p').setAttribute('data-test', 'item-price');

            this.items.food[i].addEventListener('click', toggleFood);
        }
        for (let i in [...this.items.drink]) {
            this.items.drink[i].setAttribute('id', i);
            this.items.drink[i].setAttribute('data-test', 'drink');
            this.items.drink[i].querySelector('h3').setAttribute('data-test', 'item-name');
            this.items.drink[i].querySelector('.price-container p').setAttribute('data-test', 'item-price');
            this.items.drink[i].addEventListener('click', toggleDrink);
        }
        for (let i in [...this.items.dessert]) {
            this.items.dessert[i].setAttribute('id', i);
            this.items.dessert[i].setAttribute('data-test', 'dessert');
            this.items.dessert[i].querySelector('h3').setAttribute('data-test', 'item-name');
            this.items.dessert[i].querySelector('.price-container p').setAttribute('data-test', 'item-price');
            this.items.dessert[i].addEventListener('click', toggleDessert);
        }
    },
    $toggleFoodState: function toggleFoodState(id) {
        this.items.food[id].classList.toggle("checked");
    },
    $toggleDrinkState: function toggleDrinkState(id) {
        this.items.drink[id].classList.toggle("checked");
    },
    $toggleDessertState: function toggleDessertState(id) {
        this.items.dessert[id].classList.toggle("checked");
    },
    $activateButton: function $activateButton() {
        document.querySelector("button").removeAttribute('disabled');
    },
    $checkButtonStatus: function $checkButtonStatus() {
        let disabledButton = document.querySelector("button:disabled");
        return !!disabledButton
    },
    $setNewTextToButton: function $setNewTextToButton() {
        document.querySelector("button").innerText = "Fechar Pedido";
    },
}



const model = {
    setupItems: function setupItems() {
        this.$getFood();
        this.$getDrink();
        this.$getDesserts();
        this.$setupListenersAndIds();
    },
    setFoodId: function setFoodId(id) {
        this.selectedItemsID.food = id;
        this.$toggleFoodState(id);
    },
    setDrinkId: function setDrinkId(id) {
        this.selectedItemsID.drink = id;
        this.$toggleDrinkState(id);
    },
    setDessertId: function setDessertId(id) {
        this.selectedItemsID.dessert = id;
        this.$toggleDessertState(id);
    },
    clearCheckedFood: function clearCheckedFood(id) {
        this.items.food[id].classList.remove("checked");
        this.selectedItemsID.food = null;
    },
    clearCheckedDrink: function clearCheckedDrink(id) {
        this.items.drink[id].classList.remove("checked");
        this.selectedItemsID.drink = null;
    },
    clearCheckedDessert: function clearCheckedDessert(id) {
        this.items.dessert[id].classList.remove("checked");
        this.selectedItemsID.dessert = null;
    },
    checkAllStatesForButtonActivation: function checkAllStatesForButtonActivation() {
        let i = 0;
        for (let item in this.selectedItemsID) {
            if (this.selectedItemsID[item] === null) return;
            if (this.selectedItemsID[item]) {
                i++;
            }
        }
        if ((i === 3) && (this.$checkButtonStatus())) {
            this.$activateButton();
            this.$setNewTextToButton();
        }
    }
}

Object.assign(model, view);
const controller = Object.assign(Object.create(model), { selectedItemsID: { food: null, drink: null, dessert: null }, items: { food: {}, drink: {}, dessert: {} } });
controller.setupItems();




function toggleFood(e) {
    const { id } = e.currentTarget;
    const oldID = controller.selectedItemsID.food;
    if (oldID === id) return;
    if ((oldID !== null)) {
        controller.clearCheckedFood(oldID);
    }
    controller.setFoodId(id);
    controller.checkAllStatesForButtonActivation()
}
//usar uma classe pra selecionar  o drink food e dessert e deixá-los na mesma fun
function toggleDrink(e) {
    const { id } = e.currentTarget;
    const oldID = controller.selectedItemsID.drink;
    if (oldID === id) return;
    if (oldID !== null) {
        controller.clearCheckedDrink(oldID);
    }
    controller.setDrinkId(id);
    controller.checkAllStatesForButtonActivation()
}

function toggleDessert(e) {
    const { id } = e.currentTarget;
    const oldID = controller.selectedItemsID.dessert;
    if (oldID === id) return;
    if (oldID !== null) {
        controller.clearCheckedDessert(oldID);
    }
    controller.setDessertId(id);
    controller.checkAllStatesForButtonActivation()
}