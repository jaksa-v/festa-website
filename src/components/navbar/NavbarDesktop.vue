<script setup lang="ts">
import { ref } from "vue";
import ContactModal from "../modal/ContactModal.vue";

const isContactModalOpen = ref(false);

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 80;
    const targetPosition = element.offsetTop - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
};

const handleContactClick = () => {
  isContactModalOpen.value = true;
};
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-gradient-to-b from-black via-black/80 to-transparent pb-8"
  >
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="/" class="flex cursor-pointer items-center">
            <img
              src="/src/assets/logo-desktop.png"
              alt="Festa Events"
              class="h-10 w-auto"
            />
          </a>
        </div>

        <!-- Desktop Navigation Menu -->
        <div class="flex items-center">
          <button
            class="cursor-pointer px-4 text-white transition-colors duration-200 hover:text-gray-300"
            @click="scrollToSection('about')"
          >
            About Us
          </button>
          <div class="mx-2 h-px w-8 bg-white/30"></div>
          <a
            href="/our-work"
            class="cursor-pointer px-4 text-white transition-colors duration-200 hover:text-gray-300"
          >
            Our Work
          </a>
          <div class="mx-2 h-px w-8 bg-white/30"></div>
          <button
            class="cursor-pointer px-4 text-white transition-colors duration-200 hover:text-gray-300"
            @click="scrollToSection('services')"
          >
            Services
          </button>
          <div class="mx-2 h-px w-8 bg-white/30"></div>
          <a
            href="/gallery"
            class="cursor-pointer px-4 text-white transition-colors duration-200 hover:text-gray-300"
          >
            Gallery
          </a>
          <div class="mx-2 h-px w-8 bg-white/30"></div>
          <button
            class="cursor-pointer px-4 text-white transition-colors duration-200 hover:text-gray-300"
            @click="handleContactClick"
          >
            Contact
          </button>
        </div>

        <!-- RUBIX 2025 Tickets Button -->
        <div>
          <a
            href="https://www.instagram.com/festa_official_/"
            target="_blank"
            rel="noopener noreferrer"
            class="cursor-pointer font-medium tracking-wide text-white transition-colors duration-200 hover:text-gray-300"
          >
            RUBIX 2025 TICKETS
          </a>
        </div>
      </div>
    </div>

    <ContactModal v-model:isOpen="isContactModalOpen" />
  </nav>
</template>
