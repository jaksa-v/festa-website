<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ref, onMounted } from "vue";

// Define props for gallery data passed from Astro
const props = defineProps<{
  galleryData?: any;
}>();

// Create a reactive reference for gallery images
const galleryImages = ref<
  Array<{
    src: string;
    alt: string;
  }>
>([]);

// Process gallery data from content collection
onMounted(() => {
  try {
    // Check if we have gallery data and extract images
    const gallery = props.galleryData?.[0]?.data;
    
    if (gallery?.images?.length) {
      galleryImages.value = gallery.images.map((imageName: string, index: number) => ({
        src: `/gallery/${imageName}`,
        alt: `${gallery.title || 'Gallery'} - Image ${index + 1}`,
      }));
    } else {
      galleryImages.value = [];
    }
  } catch (error) {
    console.error("Error loading gallery data:", error);
    galleryImages.value = [];
  }
});
</script>

<template>
  <div class="relative">
    <Carousel class="mx-auto w-full max-w-5xl" :opts="{ loop: true }">
      <CarouselContent>
        <CarouselItem
          v-for="(image, index) in galleryImages"
          :key="index"
          class="flex items-center md:basis-1/2 lg:basis-1/3"
        >
          <div class="flex h-full w-full items-center justify-center">
            <div
              class="relative flex h-[300px] w-full items-center justify-center overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <img
                :src="image.src"
                :alt="image.alt"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="left-2" />
      <CarouselNext class="right-2" />
    </Carousel>
  </div>
</template>
