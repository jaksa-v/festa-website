<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>

<template>
  <!-- Top Navbar -->
  <div
    class="fixed top-0 left-0 z-50 w-full transition-opacity duration-0 ease-in-out"
    :style="{
      height: isMenuOpen ? '340px' : '80px',
      background: `url(${isMenuOpen ? '/src/assets/nav-top-bg-expanded.svg' : '/src/assets/nav-top-bg.svg'}) center/cover no-repeat`,
      opacity: isMenuOpen ? '1' : '0.95',
    }"
  >
    <div class="relative flex justify-center px-4 py-3">
      <a
        href="https://www.instagram.com/festa_official_/"
        target="_blank"
        class="absolute left-4 text-white"
      >
        Instagram
      </a>
      <button @click="toggleMenu" class="text-white focus:outline-none">
        <span v-if="!isMenuOpen" class="text-white">Menu</span>
        <span v-else class="text-festa-500">Close</span>
      </button>
      <a
        href="https://www.instagram.com/festa_official_/"
        target="_blank"
        class="absolute right-4 text-white"
      >
        Tickets
      </a>
    </div>

    <!-- Menu Items -->
    <div
      class="absolute top-8 left-0 w-full py-4 transition-all duration-0 ease-in-out"
      :class="{
        'invisible -translate-y-2 opacity-0': !isMenuOpen,
        'visible translate-y-0 opacity-100': isMenuOpen,
      }"
    >
      <nav class="flex flex-col items-center">
        <a href="/" class="py-2 text-white hover:text-gray-300"> About Us </a>
        <a href="/our-work" class="py-2 text-white hover:text-gray-300">
          Our Work
        </a>
        <a href="/" class="py-2 text-white hover:text-gray-300"> Services </a>
        <a href="/gallery" class="py-2 text-white hover:text-gray-300">
          Gallery
        </a>
        <a href="/" class="py-2 text-white hover:text-gray-300"> Contact </a>
      </nav>
    </div>
  </div>

  <!-- Bottom Navbar -->
  <div
    class="fixed bottom-0 left-0 z-50 flex h-32 w-full flex-col-reverse items-center pb-4"
    style="
      background: url(&quot;/src/assets/nav-bottom-bg.svg&quot;) center/cover
        no-repeat;
    "
  >
    <img
      src="/src/assets/notch.svg"
      alt="Notch"
      class="absolute top-5 left-1/2 h-24 w-24 -translate-x-1/2"
    />
    <div class="flex w-full items-center justify-center">
      <div class="z-50 flex w-48 flex-shrink-0 items-center justify-center">
        <button @click="scrollToTop" class="focus:outline-none">
          <img
            src="/src/assets/festa-logo-text.svg"
            alt="Festa Logo"
            class="cursor-pointer object-contain"
          />
        </button>
      </div>
    </div>
  </div>
</template>
