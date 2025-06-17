<template>
  <div class="relative hidden w-full md:block">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      :class="{ 'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index }"
    >
      <img
        :src="image.src"
        :alt="image.alt"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
    <!-- Black gradients overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const images = [
  { src: '/src/assets/above_footer_1.png', alt: 'Above footer background 1' },
  { src: '/src/assets/above_footer_2.png', alt: 'Above footer background 2' },
  { src: '/src/assets/above_footer_3.png', alt: 'Above footer background 3' },
];

const currentIndex = ref(0);
let interval: number | null = null;

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

onMounted(() => {
  interval = setInterval(nextImage, 4000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>
