<script setup>
import { ref } from "vue";
import ContactModal from "./ContactModal.vue";

const isOpen = ref(false);
</script>

<template>
  <div>
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="bg-festa-500 fixed right-0 bottom-24 z-50 flex rotate-180 cursor-pointer items-center justify-center px-4 py-2 text-xs font-medium text-white transition-transform [writing-mode:vertical-lr] hover:-translate-y-1 hover:bg-white hover:text-festa-500 md:px-6 md:py-3 md:text-base"
    >
      LET'S TALK
    </button>

    <ContactModal v-model:isOpen="isOpen" />
  </div>
</template>
