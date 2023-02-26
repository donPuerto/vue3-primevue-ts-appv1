import { defineStore } from "pinia";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useDemoStore = defineStore("demo", {
  // a function that returns a fresh state
  state: () => ({
    counter: 42,
    name: "Eduardo",
  }),
  // Persisting state
  persist: {
    // CONFIG OPTIONS HERE
    key: "my-custom-key",
    paths: ["counter"],
  },
  // optional getters
  getters: {
    doubleCount: (state) => {
      return state.counter * 2;
    },
  },
  // optional actions
  actions: {
    countUp() {
      console.log("Counter");
      this.counter = this.counter + 1;
    },
    reset() {
      // `this` is the store instance
      this.counter = 0;
    },
  },
});
