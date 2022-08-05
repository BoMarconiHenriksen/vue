import { ref, reactive } from "vue";

export function piniaHistoryPlugin({ pinia, app, store, options }) {
  // A store has to provide an history option to obt in otherwise the plugin will be added to all stores
  if(!options.historyEnabled) return;

  const history = reactive([]);
  const future = reactive([]);
  const doingHistory = ref(false);

  history.push(JSON.stringify(store.$state));

  store.$subscribe((mutation, state) => {
    console.log({ mutation });
    console.log({ state });

    if(!doingHistory.value) {
      history.push(JSON.stringify(state));
      // this is if you click undo and add a new product then the future is reset so nothing happens if you click redo
      future.splice(0, future.length);
    };
  });

  return {
    // will make history and future visible in the dev tools
    history,
    future,
    undo: () => {
      if(history.length === 1) return;
      doingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1));
      doingHistory.value = false;
    },

    redo: () => {
      const latestState = future.pop();
      if(!latestState) return;
      doingHistory.value = true;
      history.push(latestState);
      store.$state = JSON.parse(latestState);
      doingHistory.value = false;
    }
  };
};
