<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ref, onMounted } from "vue";

// Import all gallery images
const galleryImagesModules = import.meta.glob("/src/assets/gallery/*", { eager: true });

// Define props for gallery data passed from Astro
const props = defineProps<{
  galleryData?: any;
}>();

// Create a reactive reference for gallery images
const galleryImages = ref<
  Array<{
    src: string;
    altSrc: string;
    alt: string;
  }>
>([]);

// Create fallback images if needed
const fallbackImages = [
  {
    src: "/src/assets/gallery/gallery.png",
    altSrc: "https://placehold.co/600x400/e44/fff?text=Gallery+Image",
    alt: "Gallery Image 1",
  },
  {
    src: "/src/assets/gallery/gallery.png",
    altSrc: "https://placehold.co/600x400/3d6/fff?text=Rubix+Festival",
    alt: "Rubix Festival 2024",
  },
  {
    src: "/src/assets/gallery/gallery.png",
    altSrc: "https://placehold.co/600x400/36d/fff?text=Mihai+Popoviciu",
    alt: "Mihai Popoviciu",
  },
];

// Track image loading errors
const imageErrors = ref<number[]>([]);

// Process gallery data from content collection
onMounted(() => {
  try {
    if (props.galleryData) {
      // If data is passed from Astro, format it for the carousel
      const gallery = Array.isArray(props.galleryData)
        ? props.galleryData[0]
        : props.galleryData;

      if (gallery && gallery.images && Array.isArray(gallery.images)) {
        galleryImages.value = gallery.images.map(
          (imageName: string, index: number) => {
            // Get image path and use the import.meta.glob pattern similar to your our-work.astro file
            const imagePath = `/src/assets/gallery/${imageName}`;
            const imageModule = galleryImagesModules[imagePath];
            return {
              // Use the actual image or fallback to the placeholder
              src: imageModule?.default?.src || `/src/assets/gallery/${imageName}`,
              altSrc: `https://placehold.co/600x400/${index % 2 === 0 ? "e44" : "36d"}/fff?text=Image+${index + 1}`,
              alt: `${gallery.title} - Image ${index + 1}`,
            };
          },
        );
      } else {
        // Fallback to default images if gallery data is invalid
        galleryImages.value = fallbackImages;
      }
    } else {
      // Fallback to default images if no gallery data is provided
      galleryImages.value = fallbackImages;
    }
  } catch (error) {
    console.error("Error loading gallery data:", error);
    galleryImages.value = fallbackImages;
  }
});

// Handle image loading errors
const handleImageError = (index: number) => {
  console.error(
    `Failed to load image at index ${index}:`,
    galleryImages.value[index].src,
  );
  imageErrors.value.push(index);
};
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
              <!-- Try original image first, if error use placeholder -->
              <img
                v-if="!imageErrors.includes(index)"
                :src="image.src"
                :alt="image.alt"
                class="h-full w-full object-cover"
                @error="handleImageError(index)"
              />
              <!-- Fallback placeholder image -->
              <img
                v-else
                :src="image.altSrc"
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
