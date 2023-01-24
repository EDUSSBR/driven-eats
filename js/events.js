export const eventsItems = {
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