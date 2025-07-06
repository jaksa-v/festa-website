<script setup lang="ts">
import type { WithClassAsProps } from "./interface";
import { cn } from "@/lib/utils";
import { Button, type ButtonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-vue-next";
import { useCarousel } from "./useCarousel";

const props = withDefaults(
  defineProps<
    {
      variant?: ButtonVariants["variant"];
      size?: ButtonVariants["size"];
    } & WithClassAsProps
  >(),
  {
    variant: "outline",
    size: "icon",
  },
);

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canScrollNext"
    :class="
      cn(
        'absolute size-8 cursor-pointer rounded-none border-none bg-black/30 p-9 hover:bg-black/50',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    :variant="variant"
    :size="size"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight class="size-9 text-white" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
