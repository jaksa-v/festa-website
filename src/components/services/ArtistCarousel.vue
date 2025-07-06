<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const props = defineProps<{
  artists: Array<{
    image: any;
    name: string;
    description: string;
  }>;
}>();
</script>

<template>
  <div class="relative w-full">
    <Carousel class="mx-auto w-full max-w-7xl" :opts="{ loop: true }">
      <CarouselContent>
        <CarouselItem
          v-for="(artist, index) in artists"
          :key="index"
          class="md:basis-1/2 lg:basis-1/3"
        >
          <div class="w-full space-y-4">
            <img
              :src="artist.image.src"
              :alt="artist.name"
              class="h-[600px] w-full object-cover"
            />
            <div class="mt-6 px-2">
              <h3 class="text-festa-500 font-mono text-3xl leading-5 uppercase">
                {{ artist.name }}
              </h3>
              <p class="mt-3 text-xl font-light text-gray-300">
                {{ artist.description }}
              </p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="left-0" />
      <CarouselNext class="right-0" />
    </Carousel>
  </div>
</template>
