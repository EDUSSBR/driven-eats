const view = {
    getItemsByID: function getItemsByID(id) {
        const typeOfItem = id.replace('#', '');
        this.items[typeOfItem] = document.querySelectorAll(`${id} .list-item`);
    },
    toggleItemState: function toggleItemState(itemType, id) {
        this.items[itemType][id].classList.toggle('checked');
    },
    activateButton: function activateButton() {
        document.querySelector("button").removeAttribute('disabled');
    },
    checkButtonStatus: function checkButtonStatus() {
        const disabledButton = document.querySelector("button:disabled");
        return !!disabledButton;
    },
    setNewTextToButton: function setNewTextToButton() {
        document.querySelector("button").innerText = "Fechar Pedido";
    },
    setInnerText: function setInnerText(id, text) {
        document.getElementById(id).innerText = text;
    },
    setupControllerState: function setupControllerState() {
        for (const item of this.types) {
            let testText = 'dish';
            if (item === 'drink') {
                testText = 'drink';
            }
            if (item === 'dessert') {
                testText = 'dessert';
            }
            [...this.items[item]].forEach((currItem, i) => {
                currItem.setAttribute('id', i);
                currItem.setAttribute('data-test', testText);
                currItem.querySelector('h3').setAttribute('data-test', 'item-name');
                currItem.querySelector('.price-container p').setAttribute('data-test', 'item-price');
                const firstItem = document.querySelectorAll(`#${item} .point-item`);
                if (firstItem.length === 1) {
                    firstItem[0].classList.add('point-active-food');
                }
            });
        }
    }
};
const model = {
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
const itemsType = {
    types: ['food', 'drink', 'dessert']
};
const eventsItems = {
    setupClickEvents: function setupClickEvents() {
        for (const type of this.types) {
            for (const item of this.items[type]) {
                item.addEventListener('click', (e) => {
                    const { id } = e.currentTarget;
                    const oldID = this.selectedItemsID[type];
                    if (oldID === id) {
                        return;
                    }
                    if ((oldID !== null)) {
                        this.clearCheckedItem(type, oldID);
                    }
                    this.setItemId(type, id);
                    this.checkAllStatesForButtonActivation();
                });
            }
        }
    },
};
Object.assign(model, view, eventsItems, itemsType);
const controller = Object.assign(Object.create(model), { selectedItemsID: { food: null, drink: null, dessert: null }, items: { food: {}, drink: {}, dessert: {} } });
controller.setupItems(itemsType);
function sendOrder() {
    controller.setupModal();
    let nome;
    let address;
    if (!controller.name || !controller.address) {
        nome = prompt("Por favor, digite seu nome.");
        address = prompt("Por favor, digite seu endereço.");
        controller.setNameAndAddres(nome, address);
    }
}
function closeModal() {
    controller.setCloseModal();
}
function sendWhatsAppMsg() {
    const { name, address } = controller;
    window.location.href = controller.getSendOrderMessage(name, address);
}