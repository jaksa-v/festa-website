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

const props = defineProps<{
  galleryData?: any;
}>();

const galleryItems = ref<Array<any>>([]);

const selectedGalleryId = ref<number>(0);

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

onMounted(() => {
  try {
    if (props.galleryData?.length) {
      galleryItems.value = props.galleryData.map((item: any) => item.data);

      if (galleryItems.value.length > 0) {
        selectedGalleryId.value = galleryItems.value[0].id;
        updateGalleryImages();
      }
    }
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

    <!-- Gallery Carousel -->
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
    <div class="mt-5 px-4 font-light text-white" v-if="selectedGallery">
      <h1 class="text-4xl leading-[36px]" v-html="selectedGallery.title"></h1>
      <div class="my-3 flex flex-col gap-y-2 text-xl leading-5">
        <p>{{ selectedGallery.description1 }}</p>
        <p>{{ selectedGallery.description2 }}</p>
      </div>
    </div>
  </div>
</template>
