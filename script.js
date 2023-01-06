const view = {
    $getFood: function $getFood() {
        this.items.food = document.querySelectorAll("#food .list-item");

    },
    $setupListenersAndIds: function $setupListenersAndIds() {
        for (let i in [...this.items.food]) {
            this.items.food[i].setAttribute('id', i);
            this.items.food[i].setAttribute('data-test', 'dish');
            this.items.food[i].querySelector('h3').setAttribute('data-test', 'item-name');
            this.items.food[i].querySelector('.price-container p').setAttribute('data-test', 'item-price');

            this.items.food[i].addEventListener('click', toggleFood);
        }

    },
    $toggleFoodState: function toggleFoodState(id) {
        this.items.food[id].classList.toggle("checked");
    },
}



const model = {
    setupItems: function setupItems() {
        this.$getFood();
        this.$setupListenersAndIds();
    },
    setFoodId: function setFoodId(id) {
        this.selectedItemsID.food = id;
        this.$toggleFoodState(id);
    },
    clearCheckedFood: function clearCheckedFood(id) {
        this.items.food[id].classList.remove("checked");
        this.selectedItemsID.food = null;
    },
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
}
//usar uma classe pra selecionar  o drink food e dessert e deixá-los na mesma fun


