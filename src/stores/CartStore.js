import { defineStore } from 'pinia';

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: []
    }
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count)

      for (let index = 0; index < count; index++) {
        // objects are passed by reference, not value that the reson for cloning item
        this.items.push({ ...item })
      }
    }
  }
});
