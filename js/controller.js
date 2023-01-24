import { view } from "./view.js";
import { model, itemsType } from "./model.js";
import { eventsItems } from "./events.js";

Object.assign(model, view, eventsItems, itemsType);
const controller = Object.assign(Object.create(model), { selectedItemsID: { food: null, drink: null, dessert: null }, items: { food: {}, drink: {}, dessert: {} } });

export { controller };