<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ref, onMounted, computed } from "vue";
import GallerySelector from "./GallerySelector.vue";
import ContactButtonFooter from "../modal/ContactButtonFooter.vue";

const props = defineProps<{
  galleryData?: any;
}>();

const galleryItems = ref<Array<any>>([]);
const isMobile = ref(false);

const selectedGalleryId = ref<number>(0);
const currentImageIndex = ref<number>(0);

const galleryImages = ref<
  Array<{
    src: string;
    alt: string;
  }>
>([]);

const selectorItems = computed(() => {
  return galleryItems.value.map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title,
  }));
});

const selectedGallery = computed(() => {
  return galleryItems.value.find((item) => item.id === selectedGalleryId.value);
});

function handleGallerySelect(id: number) {
  selectedGalleryId.value = id;
  currentImageIndex.value = 0;
  updateGalleryImages();
}

function updateGalleryImages() {
  const selectedGallery = galleryItems.value.find(
    (item) => item.id === selectedGalleryId.value,
  );

  if (selectedGallery?.images?.length) {
    galleryImages.value = selectedGallery.images.map(
      (imageName: string, index: number) => ({
        src: `/gallery/${imageName}`,
        alt: `${selectedGallery.title || "Gallery"} - Image ${index + 1}`,
      }),
    );
  } else {
    galleryImages.value = [];
  }
}

function nextImage() {
  if (galleryImages.value.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % galleryImages.value.length;
  }
}

const currentImage = computed(() => {
  return galleryImages.value[currentImageIndex.value];
});

function checkMobile() {
  isMobile.value = window.innerWidth < 768;
}

onMounted(() => {
  try {
    if (props.galleryData?.length) {
      galleryItems.value = props.galleryData.map((item: any) => item.data);

      if (galleryItems.value.length > 0) {
        selectedGalleryId.value = galleryItems.value[0].id;
        updateGalleryImages();
      }
    }

    // Check initial screen size
    checkMobile();
    // Add resize listener
    window.addEventListener("resize", checkMobile);
  } catch (error) {
    console.error("Error loading gallery data:", error);
    galleryItems.value = [];
    galleryImages.value = [];
  }
});
</script>

<template>
  <div class="flex w-full flex-col">
    <!-- Gallery Selector Component -->
    <GallerySelector
      :galleryItems="selectorItems"
      :selectedId="selectedGalleryId"
      @select="handleGallerySelect"
    />

    <!-- Mobile Gallery Carousel (visible on mobile) -->
    <div class="relative md:hidden">
      <Carousel class="mx-auto w-full max-w-5xl" :opts="{ loop: true }">
        <CarouselContent>
          <CarouselItem
            v-for="(image, index) in galleryImages"
            :key="index"
            class="flex items-center"
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

    <!-- Desktop Split Layout (visible on desktop) -->
    <div class="mt-4 hidden md:flex md:gap-8 lg:gap-12">
      <!-- Image Section -->
      <div class="flex-1">
        <div class="relative">
          <img
            v-if="currentImage"
            :src="currentImage.src"
            :alt="currentImage.alt"
            class="h-[400px] w-full object-cover lg:h-[500px]"
          />
          <!-- Navigation Arrow -->
          <button
            v-if="galleryImages.length > 1"
            @click="nextImage"
            class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30"
          >
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content Section -->
      <div
        class="flex flex-1 flex-col justify-center px-4 font-light text-white"
        v-if="selectedGallery"
      >
        <h1
          class="mb-6 text-4xl leading-tight lg:text-[60px] lg:leading-[60px]"
          v-html="selectedGallery.title"
        ></h1>
        <div
          class="mb-8 flex flex-col gap-y-4 text-lg leading-relaxed font-light lg:text-2xl lg:leading-[28px]"
        >
          <p>{{ selectedGallery.description1 }}</p>
          <p>{{ selectedGallery.description2 }}</p>
        </div>

        <!-- Like what you see section -->
        <!-- <div class="mt-auto">
          <h2 class="mb-4 text-2xl font-light lg:text-3xl">
            Like what you see?
          </h2>
          <ContactButtonGallery />
        </div> -->
      </div>
    </div>

    <!-- Mobile Content (visible on mobile) -->
    <div
      class="mt-5 px-4 font-light text-white md:hidden"
      v-if="selectedGallery"
    >
      <h1 class="text-4xl leading-[36px]" v-html="selectedGallery.title"></h1>
      <div class="my-3 flex flex-col gap-y-2 text-xl leading-5">
        <p>{{ selectedGallery.description1 }}</p>
        <p>{{ selectedGallery.description2 }}</p>
      </div>
    </div>

    <div class="mt-4 flex justify-end md:mt-8">
      <div class="flex items-center gap-x-4">
        <h2
          class="text-2xl font-light text-white md:text-[60px] md:leading-[70px]"
        >
          Like what you see?
        </h2>
        <ContactButtonFooter size="small" />
      </div>
    </div>
  </div>
</template>
