<script setup lang="ts">
import { useDemoStore } from "@/store";

const myRef = ref(3);
const demoStore = useDemoStore();
const counter = demoStore.counter;
const doubleCount = computed(() => demoStore.doubleCount);
</script>

<template>
  <div class="surface-0 text-center">
    <div class="mb-3 font-bold text-4xl">
      <span class="text-green-600">PrimeVue </span>
      <span class="text-blue-400"> & TypeScript</span>
      <span class="text-blue-600"> & Vite</span>
    </div>
    <h2 class="text-2xl pb-6">Starter for Vue.js Development.</h2>
    <Button label="Submit" />

    <div class="card">
      <h5 class="bg-blue-400">Pinia Demo</h5>
      <div class="flex flex-wrap card-container">
        <div
          class="flex align-content-center justify-content-center bg-gray-100 p-6 m-2 border-round"
        >
          <div>
            myRef Value: <span class="font-bold">{{ myRef }}</span>
          </div>
        </div>

        <div
          class="flex align-content-center justify-content-center bg-gray-100 p-6 m-2 border-round"
        >
          <div>
            State Counter:
            <span class="font-bold">{{ demoStore.counter }}</span>
          </div>
        </div>

        <div
          class="flex align-content-center justify-content-center bg-gray-100 p-6 m-2 border-round"
        >
          <div>
            Double Count: <span class="font-bold">{{ doubleCount }}</span>
          </div>
        </div>

        <div
          class="flex align-content-center justify-content-center bg-gray-100 p-6 m-2 border-round"
        >
          <div>
            <Button label="Count Up" @click="demoStore.countUp()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
