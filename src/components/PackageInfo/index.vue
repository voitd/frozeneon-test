<script setup lang="ts">
import { computed } from "vue";
import { usePackageInfoStore } from "../../stores/packageInfo";
import { storeToRefs } from "pinia";
import { formatBytes, sumArr } from "../../utils/index.ts";
import VueMarkdown from "vue-markdown-render";
import Stats from "./Stats.vue";
import Spinner from "./../UI/Spinner.vue";

const store = usePackageInfoStore();
const { packageInfo, isLoading } = storeToRefs(store);

const version = computed(() => `Version: ${packageInfo.value.version}`);

const hits = computed(() => packageInfo.value?.hits?.dates || []);
const weeklyHits = computed(() => Object.values(hits.value));
const totalWeeklyHits = computed(() => packageInfo.value.hits?.total);

const weeklyDownloads = computed(() =>
  Object.values(packageInfo?.value?.downloads.dates!),
);
const totalWeeklyDownloads = computed(() => sumArr(weeklyDownloads.value));

const bandwidthSize = computed(() =>
  formatBytes(packageInfo.value.bandwidth?.total),
);
</script>
<template>
  <v-card-text class="py-4" max-width="500">
    <spinner v-if="isLoading" />
    <v-row v-else align="start" justify="center">
      <v-col cols="8">
        <h1 class="my-6">{{ packageInfo.name }}</h1>
        <v-row align="center" class="my-6">
          <v-col
            ><p class="text-subtitle-1">
              <v-icon icon="mdi-account" color="green" class="mr-2 my-auto" />{{
                packageInfo.author?.name
              }}
            </p></v-col
          >
          <v-col class="text-right"
            ><v-chip color="green">{{ version }}</v-chip></v-col
          ></v-row
        >
        <vue-markdown :source="packageInfo.readme" class="card-readme" />
        <p class="text-subtitle-1 font-weight-bold">Statistics</p>
      </v-col>

      <v-col cols="4">
        <div class="mt-8">
          <stats
            :data="weeklyDownloads"
            id="downloads"
            color="green"
            period="weekly"
            label="downloads"
            :value="totalWeeklyDownloads"
          />
        </div>
        <div class="mt-8">
          <stats
            :data="weeklyHits"
            color="blue"
            period="weekly"
            label="requests"
            id="hits"
            :value="totalWeeklyHits"
          />
        </div>
        <div class="mt-8">
          <stats
            :data="weeklyDownloads"
            color="orange"
            period="weekly"
            label="bandwidth"
            id="bandwidth"
          >
            <template #value>
              {{ bandwidthSize }}
            </template>
          </stats>
        </div>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<style scoped lang="scss">
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
</style>
