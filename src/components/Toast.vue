<template>
  <Toast position="bottom-center" group="bc">
    <template #message="slotProps">
      <div class="flex flex-column">
        <div class="text-center">
          <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
          <h4>{{ slotProps.message.summary }}</h4>
          <p>{{ slotProps.message.detail }}</p>
        </div>
        <div class="grid p-fluid">
          <div class="col-6">
            <Button class="p-button-success" label="Yes"></Button>
          </div>
          <div class="col-6">
            <Button class="p-button-secondary" label="No"></Button>
          </div>
        </div>
      </div>
    </template>
  </Toast>
</template>

<script setup lang="ts"></script>

<style scoped></style>
