import { defineStore, acceptHMRUpdate } from 'pinia';
import { groupBy } from "lodash";
import { useAuthUserStore } from "@/stores/AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: []
    }
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name)
      const sorted = Object.keys(grouped).sort();
      let inOrder = {}
      sorted.forEach(key => inOrder[key] = grouped[key]);
      return inOrder;
    },
    total: (state) => state.items.reduce((returnOfPreviousRun, curentElementInArray) => returnOfPreviousRun + curentElementInArray.price, 0),

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
    checkout() {
      const authUserStore = useAuthUserStore()
      alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`);
    },
    addItems(count, item) {
      count = parseInt(count)

      throw new Error("Example error");

      for (let index = 0; index < count; index++) {
        // objects are passed by reference, not value that the reson for cloning item
        this.items.push({ ...item })
      }
    },
    clearItem(itemName) {
      this.items = this.items.filter(item => item.name !== itemName)
    },
    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItems(count, item);
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
};
