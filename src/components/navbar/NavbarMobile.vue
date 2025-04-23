<script setup>
import { ref } from "vue";
import ContactModal from "../modal/ContactModal.vue";

const isMenuOpen = ref(false);
const isContactModalOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const handleContactClick = () => {
  isContactModalOpen.value = true;
  isMenuOpen.value = false;
};
</script>

<template>
  <!-- Top Navbar -->
  <div
    :class="[
      isMenuOpen ? 'nav-top-mobile-bg-expanded' : 'nav-top-mobile-bg',
      'fixed top-0 left-0 z-50 w-full transition-opacity duration-0 ease-in-out'
    ]"
    :style="{
      height: isMenuOpen ? '340px' : '80px',
      opacity: isMenuOpen ? '1' : '0.95',
    }"
  >
    <div class="relative flex justify-center px-4 py-3">
      <a
        class="absolute left-4 text-white"
        href="https://www.instagram.com/festa_official_/"
        target="_blank"
      >
        Instagram
      </a>
      <button class="text-white focus:outline-none" @click="toggleMenu">
        <span v-if="!isMenuOpen" class="text-white">Menu</span>
        <span v-else class="text-festa-500">Close</span>
      </button>
      <a
        class="absolute right-4 text-white"
        href="https://www.instagram.com/festa_official_/"
        target="_blank"
      >
        Tickets
      </a>
    </div>

    <!-- Menu Items -->
    <div
      :class="{
        'invisible -translate-y-2 opacity-0': !isMenuOpen,
        'visible translate-y-0 opacity-100': isMenuOpen,
      }"
      class="absolute top-8 left-0 w-full py-4 transition-all duration-0 ease-in-out"
    >
      <nav class="flex flex-col items-center">
        <a class="py-2 text-white hover:text-gray-300" href="/"> About Us </a>
        <a class="py-2 text-white hover:text-gray-300" href="/our-work">
          Our Work
        </a>
        <a class="py-2 text-white hover:text-gray-300" href="/"> Services </a>
        <a class="py-2 text-white hover:text-gray-300" href="/gallery">
          Gallery
        </a>
        <button
          class="py-2 text-white hover:text-gray-300"
          @click="handleContactClick"
        >
          Contact
        </button>
        <ContactModal v-model:isOpen="isContactModalOpen" />
      </nav>
    </div>
  </div>

  <!-- Bottom Navbar -->
  <div
    class="nav-bottom-mobile-bg fixed bottom-0 left-0 z-50 flex h-32 w-full flex-col-reverse items-center pb-4"
  >
    <img
      alt="Notch"
      class="absolute top-5 left-1/2 h-24 w-24 -translate-x-1/2"
      src="/src/assets/notch.svg"
    />
    <div class="flex w-full items-center justify-center">
      <div class="z-50 flex w-48 flex-shrink-0 items-center justify-center">
        <button class="focus:outline-none" @click="scrollToTop">
          <img
            alt="Festa Logo"
            class="cursor-pointer object-contain"
            src="/src/assets/festa-logo-text.svg"
          />
        </button>
      </div>
    </div>
  </div>
</template>
