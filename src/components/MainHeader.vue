<script setup lang="ts">
import { useTheme } from "vuetify";
import ToggleThemeBtn from "../components/ToggleThemeBtn.vue";
import { computed } from "vue";

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
</script>

<template>
  <v-toolbar :color="isDark ? 'grey-darken-4' : ''">
    <router-link to="/">
      <v-icon icon="mdi-npm" class="ml-4" size="64" />
    </router-link>
    <v-spacer />
    <toggle-theme-btn />
  </v-toolbar>
</template>
