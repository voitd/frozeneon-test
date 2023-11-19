<script setup lang="ts">
import Modal from "../../components/UI/Modal.vue";
import PackageInfo from "../../components/PackageInfo/index.vue";

const modelValue = defineModel();
</script>
<template>
  <Modal v-model="modelValue">
    <PackageInfo />
  </Modal>
</template>
