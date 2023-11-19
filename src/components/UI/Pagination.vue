<script setup lang="ts">
import { computed } from "vue";

const {
  total = 1,
  visible = 6,
  size = 10,
} = defineProps<{
  total: number;
  visible?: number;
  size?: number;
}>();
const model = defineModel<number>();

const pageCount = computed(() => Math.ceil(total / size));
</script>
<template>
  <div class="text-center my-6">
    <v-pagination
      v-model="model"
      :length="pageCount"
      rounded="circle"
      :total-visible="visible"
    />
  </div>
</template>
