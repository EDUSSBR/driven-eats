import { controller } from "./controller.js";
import { itemsType } from "./model.js";
controller.setupItems(itemsType);
window.sendOrder = function sendOrder() {
    controller.setupModal();
    let nome;
    let address;
    if (!controller.name || !controller.address) {
        nome = prompt("Por favor, digite seu nome.");
        address = prompt("Por favor, digite seu endereço.");
        controller.setNameAndAddres(nome, address);
    }
}
window.closeModal = function closeModal() {
    controller.setCloseModal();
}
window.sendWhatsAppMsg = function sendWhatsAppMsg() {
    const { name, address } = controller;
    window.location.href = controller.getSendOrderMessage(name, address);
}