import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore("AuthUserStore", { 
  state: () => {
    return {
      username: "bh_io"
    }
  }
})