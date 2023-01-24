export const model = {
    setupItems: function setupItems() {
        for (const item of this.types) {
            this.getItemsByID(`#${item}`);
        }
        this.setupControllerState();
        this.setupClickEvents();
    },
    setItemId: function setItemId(itemType, id) {
        this.selectedItemsID[itemType] = id;
        this.toggleItemState(itemType, id);
    },
    clearCheckedItem: function clearCheckedItem(itemType, id) {
        this.items[itemType][id].classList.remove("checked");
        this.selectedItemsID[itemType] = null;
    },
    checkAllStatesForButtonActivation: function checkAllStatesForButtonActivation() {
        let i = 0;

        for (const item in this.selectedItemsID) {
            if (this.selectedItemsID[item] === null) {
                return;
            }
            if (this.selectedItemsID[item]) {
                i++;
            }
        }
        if ((i === this.types.length) && (this.checkButtonStatus())) {
            this.activateButton();
            this.setNewTextToButton();
        }
    },
    openModal: function openModal() {
        document.getElementById("modalBg").classList.remove('hideModal');
        document.getElementById("modalBox").classList.remove('hideModal');
    },
    setCloseModal: function setCloseModal() {
        document.getElementById("modalBg").classList.add('hideModal');
        document.getElementById("modalBox").classList.add('hideModal');
    },
    setupModal: function setupModal() {
        const { foodPrice, drinkPrice, dessertPrice, food, drink, dessert, total } = this.returnOrderItems();
        this.setInnerText('foodItem', food);
        this.setInnerText('drinkItem', drink);
        this.setInnerText('dessertItem', dessert);
        this.setInnerText('foodPrice', foodPrice);
        this.setInnerText('drinkPrice', drinkPrice);
        this.setInnerText('dessertPrice', dessertPrice);
        this.setInnerText('totalPrice', this.formatNumber(total));
        this.openModal();
    },
    getItemsPrice: function getItemPrice(itemType) {
        return this.items[itemType][this.selectedItemsID[itemType]].querySelector('.price-container p').innerText.split(" ")[1];
    },
    getItemName: function getItemName(itemType) {
        return this.items[itemType][this.selectedItemsID[itemType]].querySelector('h3').innerText;
    },
    getTotalPriceElement: function getTotalPriceElement() {
        return document.querySelector("#totalPrice").innerText;
    },
    formatNumber: function formatNumber(number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
    },
    setNameAndAddres: function setNameAndAddres(name, address) {
        this.name = name;
        this.address = address;
    },
    returnOrderItems() {
        const [foodPrice, drinkPrice, dessertPrice] = this.types.map(item => this.getItemsPrice(item));
        const [food, drink, dessert] = this.types.map(item => this.getItemName(item));
        const total = Number(foodPrice.split(',').join('.')) + Number(drinkPrice.split(',').join('.')) + Number(dessertPrice.split(',').join('.'));
        return { foodPrice, drinkPrice, dessertPrice, food, drink, dessert, total };
    },
    getSendOrderMessage: function getSendOrderMessage() {
        const { food, drink, dessert, total } = this.returnOrderItems();
        const message = `Olá, gostaria de fazer o pedido:
- Prato: ${food}
- Bebida: ${drink}
- Sobremesa: ${dessert}
Total: ${this.formatNumber(total)}
    
Nome: ${this.name}
Endereço: ${this.address}`;
        return `https://wa.me/5548988080753?text=${encodeURIComponent(message)}`;
    }
};
export const itemsType = {
    types: ['food', 'drink', 'dessert']
};
