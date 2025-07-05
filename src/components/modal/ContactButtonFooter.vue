<script setup>
import { ref } from "vue";
import ContactModal from "./ContactModal.vue";

const props = defineProps({
  size: {
    type: String,
    default: "default",
    validator: (value) => ["small", "default"].includes(value),
  },
});

const isOpen = ref(false);
</script>
<template>
  <button
    @click="isOpen = true"
    :class="[
      'bg-festa-500 flex cursor-pointer items-center justify-center text-white transition-transform hover:-translate-y-1',
      size === 'small'
        ? 'px-[22.5px] py-3 text-base'
        : 'px-5 py-2 text-lg font-medium md:px-8 md:py-4 md:text-2xl',
    ]"
  >
    LET'S TALK
  </button>
  <ContactModal v-model:isOpen="isOpen" />
</template>
