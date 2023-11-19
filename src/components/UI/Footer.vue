<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) },
});
defineEmits(["update:modelValue"]);
</script>
<template>
  <v-footer app height="64" class="bg-indigo">
    <div class="w-100 d-flex align-center justify-center">
      {{ new Date().getFullYear() }} —
      <a
        class="text-blue text-decoration-none"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        <strong> voitd </strong>
        <v-icon icon="mdi-github"></v-icon>
      </a>
    </div>
  </v-footer>
</template>
