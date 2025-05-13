<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  galleryItems: Array<{
    id: number;
    name: string;
    title: string;
  }>;
  selectedId?: number;
}>();

const emit = defineEmits<{
  (e: "select", id: number): void;
}>();

const selectedItemId = ref(props.selectedId || props.galleryItems[0]?.id || 0);

watch(
  () => props.selectedId,
  (newId) => {
    if (newId) {
      selectedItemId.value = newId;
    }
  },
);

function selectItem(id: number) {
  selectedItemId.value = id;
  emit("select", id);
}
</script>

<template>
  <div class="flex w-full flex-wrap gap-2 px-4 pt-5 pb-3">
    <button
      v-for="item in galleryItems"
      class="cursor-pointer border border-white bg-transparent px-2 py-1 text-[10px] uppercase transition-all duration-200 hover:bg-white/10"
      :key="item.id"
      :class="[
        { 'bg-white text-black': selectedItemId === item.id },
        { 'text-white': selectedItemId !== item.id },
      ]"
      @click="selectItem(item.id)"
    >
      {{ item.name }}
    </button>
  </div>
</template>
