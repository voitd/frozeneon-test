<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const icon = computed(() =>
  isDark.value ? "mdi-white-balance-sunny" : "mdi-moon-waning-crescent",
);
const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
  console.log("isDark: ", isDark.value, theme.global.name.value);
};
</script>
<template>
  <v-btn :icon="icon" variant="text" @click="toggleTheme" class="toggle-btn" />
</template>

<style scoped lang="scss">
.toogle-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
