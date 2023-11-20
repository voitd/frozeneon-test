<script setup lang="ts">
const modelValue = defineModel();
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    transition="dialog-top-transition"
    width="auto"
    content-class="modal"
  >
    <v-card class="mx-auto modal-card" max-width="70vw">
      <v-toolbar title="Package Info" class="">
        <v-btn
          variant="text"
          icon="mdi-close"
          @click="$emit('update:modelValue', false)"
        />
      </v-toolbar>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.modal {
  &-card {
    min-width: 40dvw;
    min-width: 40vw;
    border-radius: 1rem !important;
  }
}
</style>
