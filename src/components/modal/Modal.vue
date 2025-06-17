<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:isOpen"]);

const handleClose = () => {
  emit("update:isOpen", false);
};
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="!opacity-0"
      enter-to-class="!opacity-60"
      leave-active-class="transition duration-300 ease-out"
      leave-from-class="!opacity-60"
      leave-to-class="!opacity-0"
    >
      <div 
        v-if="isOpen" 
        @click="handleClose"
        class="fixed inset-0 z-40 bg-black opacity-60 cursor-pointer" 
      />
    </transition>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-300 ease-out"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          @click.stop
          class="relative mx-4 max-h-[90vh] w-full max-w-2xl transform overflow-auto bg-[url('/src/assets/modal-bg-mobile.png')] bg-cover bg-center bg-no-repeat p-3 md:max-w-4xl md:bg-gray-200 md:p-6"
        >
          <button
            @click="handleClose"
            class="absolute top-3 right-3 cursor-pointer md:top-6 md:right-6"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9743 20H17.9757L16.9771 19.633L9.98651 11.5963H9.48717L2.49662 19.633L1.49798 20H0.499337L0 19.633V18.422L7.48989 10.0183V9.61467L0.166446 1.61467V0.403672L0.665782 0H1.66442L2.66307 0.403672L9.65362 8H10.153L16.8106 0.403672L17.8093 0H18.8079L19.3072 0.403672V1.61467L11.8174 9.61467V10.0183L19.3072 18.422V19.633L18.9743 20Z"
                fill="#B9B9B9"
              />
            </svg>
          </button>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style>
.transition {
  transition-property: all;
}
</style>
