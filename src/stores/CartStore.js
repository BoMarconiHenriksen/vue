import { defineStore } from 'pinia';
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: []
    }
  },
  getters: {
    count: (state) => state.items.length, 
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    
    // dynamic getter
    groupCount: (state) => (name) => state.grouped[name].length
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
