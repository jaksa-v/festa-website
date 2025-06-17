<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:isOpen"]);

const isSubmitting = ref(false);
const isThankYou = ref(false);

const handleSubmit = async (event) => {
  event.preventDefault();
  isSubmitting.value = true;

  const myForm = event.target;
  const formData = new FormData(myForm);

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });

    isThankYou.value = true;
  } catch (error) {
    alert("Error submitting form. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  isThankYou.value = false;
};
</script>

<template>
  <Modal
    :isOpen="isOpen"
    @update:isOpen="(value) => emit('update:isOpen', value)"
  >
    <!-- Thank You State -->
    <div
      v-if="isThankYou"
      class="flex flex-col items-center gap-y-4 text-center"
    >
      <div
        class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 md:h-20 md:w-20"
      >
        <svg
          class="h-8 w-8 text-green-600 md:h-10 md:w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <div class="flex flex-col gap-y-2">
        <h3 class="text-2xl font-light md:text-4xl md:font-semibold">
          Thank you!
        </h3>
        <p class="text-lg font-light text-gray-600 md:text-xl">
          Your message has been sent successfully.<br />
          We'll get back to you soon.
        </p>
      </div>
      <button
        @click="resetForm"
        class="bg-festa-500 mt-4 px-6 py-2 md:px-8 md:py-3"
      >
        <span class="text-sm font-light text-white md:text-base"
          >SEND ANOTHER MESSAGE</span
        >
      </button>
    </div>

    <!-- Contact Form -->
    <div v-else class="flex flex-col gap-y-2">
      <p class="text-xl font-light md:text-5xl md:font-semibold">Contact us:</p>
      <div class="flex flex-col gap-y-1 md:flex-row md:gap-x-8">
        <p class="text-3xl">office@festa.live</p>
        <p class="text-3xl">+382 69 123 321</p>
        <p class="text-3xl">+382 67 987 789</p>
      </div>
      <p class="text-xl font-light">or send us a message:</p>
      <form
        @submit="handleSubmit"
        class="flex flex-col gap-y-2 md:gap-y-4"
        method="POST"
        data-netlify="true"
        name="contact"
      >
        <input type="hidden" name="form-name" value="contact" />
        <div class="flex flex-col gap-y-2 md:flex-row md:gap-x-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            class="active:border-festa-500 focus:border-festa-500 border border-gray-500 p-3 text-lg font-light outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            class="active:border-festa-500 focus:border-festa-500 border border-gray-500 p-3 text-lg font-light outline-none"
          />
        </div>
        <textarea
          rows="5"
          name="message"
          placeholder="Message..."
          required
          class="active:border-festa-500 focus:border-festa-500 w-full border border-gray-500 p-3 text-lg font-light outline-none"
        ></textarea>
        <button
          :disabled="isSubmitting"
          class="bg-festa-500 ms-auto mt-2 cursor-pointer px-4 py-1.5 disabled:opacity-50 md:px-5 md:py-2"
          type="submit"
        >
          <span class="text-xs font-light text-white">
            {{ isSubmitting ? "SENDING..." : "SEND MESSAGE" }}
          </span>
        </button>
      </form>
    </div>
  </Modal>
</template>
