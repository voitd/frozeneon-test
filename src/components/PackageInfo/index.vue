<script setup lang="ts">
import { computed } from "vue";
import { usePackageInfoStore } from "../../stores/packageInfo";
import { storeToRefs } from "pinia";
import VueMarkdown from "vue-markdown-render";
import Stats from "./Stats.vue";
import Spinner from "./../UI/Spinner.vue";

const store = usePackageInfoStore();
const { packageInfo, isLoading } = storeToRefs(store);

const version = computed(() => `Version: ${packageInfo.value?.version}`);
const readme = computed(() => packageInfo.value?.readme);
</script>
<template>
  <v-card-text class="py-4" max-width="500">
    <spinner v-if="isLoading" />
    <v-row v-else align="start" justify="center">
      <v-col cols="8">
        <v-row align="center" class="my-6">
          <v-col
            ><p class="text-subtitle-1">
              <v-icon icon="mdi-account" color="green" class="mr-2 my-auto" />{{
                packageInfo?.author?.name
              }}
            </p></v-col
          >
          <v-col class="text-right"
            ><v-chip color="green">{{ version }}</v-chip></v-col
          ></v-row
        >
        <div class="card-readme">
          <vue-markdown :source="readme" />
        </div>
        <p class="text-subtitle-1 font-weight-bold">Statistics</p>
      </v-col>

      <v-col cols="4">
        <Stats />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<style lang="scss">
.v-card {
  display: grid;
  place-items: center;
  &-text {
    line-height: 1.75rem !important;
    h2 {
      padding: 1rem 0 !important;
    }
  }
}
.card-readme {
  max-width: 100%;
  h1 {
    font-size: 2.5rem;
    padding: 1rem 0;
  }
  pre {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
}
</style>
