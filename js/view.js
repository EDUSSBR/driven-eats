export const view = {
    test: function test() {
        console.log(this)
        return `O valor de this é ${this}`
    },
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

// view()