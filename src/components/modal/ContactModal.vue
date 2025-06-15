<script setup>
import Modal from "./Modal.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:isOpen"]);
</script>

<template>
  <Modal
    :isOpen="isOpen"
    @update:isOpen="(value) => emit('update:isOpen', value)"
  >
    <div class="flex flex-col gap-y-2">
      <p class="text-xl font-light md:text-5xl md:font-semibold">Contact us:</p>
      <div class="flex flex-col gap-y-1 md:flex-row md:gap-x-8">
        <p class="text-3xl">office@festa.live</p>
        <p class="text-3xl">+382 69 123 321</p>
        <p class="text-3xl">+382 67 987 789</p>
      </div>
      <p class="text-xl font-light">or send us a message:</p>
      <form class="flex flex-col gap-y-2 md:gap-y-4">
        <div class="flex flex-col gap-y-2 md:flex-row md:gap-x-4">
          <input
            type="text"
            placeholder="Your Name"
            class="active:border-festa-500 focus:border-festa-500 border border-gray-500 p-3 text-lg font-light outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            class="active:border-festa-500 focus:border-festa-500 border border-gray-500 p-3 text-lg font-light outline-none"
          />
        </div>
        <textarea
          rows="5"
          placeholder="Message..."
          class="active:border-festa-500 focus:border-festa-500 w-full border border-gray-500 p-3 text-lg font-light outline-none"
        ></textarea>
        <button
          class="bg-festa-500 ms-auto mt-2 px-4 py-1.5 md:px-5 md:py-2"
          type="submit"
        >
          <span class="text-xs font-light text-white">SEND MESSAGE</span>
        </button>
      </form>
    </div>
  </Modal>
</template>
