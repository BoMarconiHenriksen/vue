import { defineStore } from 'pinia';

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: []
    }
  },
  getters: {
    count: (state) => state.items.length, 
    isEmpty: (state) => state.count === 0,
    // count() {
    //   return this.items.length
    // },
    // isEmpty() {
    //   return this.count === 0
    // }
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
