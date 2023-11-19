<template>
  <div class="text-center w-100 spinner">
    <v-progress-circular indeterminate :size="64" :width="6" class="ma-12" />
  </div>
</template>

<style scoped lang="scss">
.spinner {
  display: grid;
  place-items: center;
}
</style>
