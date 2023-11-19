<script setup lang="ts">
import { usePackagesListStore } from "../../stores/packagesList";
import { storeToRefs } from "pinia";

const store = usePackagesListStore();

const { isLoading } = storeToRefs(store);

defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleSearch = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <v-text-field
    :value="modelValue"
    @input="handleSearch"
    placeholder="Search"
    :loading="isLoading"
    :disabled="isLoading"
    prepend-inner-icon="mdi-magnify"
    single-line
    variant="outlined"
  ></v-text-field>
</template>
