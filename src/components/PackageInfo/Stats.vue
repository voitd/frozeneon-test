<script setup lang="ts">
import { computed } from "vue";
import Chart from "../../components/UI/Chart.vue";
import { usePackageInfoStore } from "../../stores/packageInfo";
import { storeToRefs } from "pinia";
import { formatBytes, sumArr } from "../../utils";

const store = usePackageInfoStore();
const { packageInfo } = storeToRefs(store);

const hits = computed(() => packageInfo.value?.hits);
const weeklyHits = computed(() =>
  hits.value ? Object.values(hits.value.dates) : [],
);
const totalWeeklyHits = computed(() => (hits.value ? hits.value.total : 0));

const weeklyDownloads = computed(() =>
  Object.values(packageInfo.value?.downloads?.dates ?? {}),
);
const totalWeeklyDownloads = computed(() => sumArr(weeklyDownloads.value));

const bandwidthSize = computed(() =>
  formatBytes(packageInfo.value?.bandwidth?.total ?? 0),
);
</script>
<template>
  <div class="mt-8">
    <Chart
      id="downloads"
      :data="weeklyDownloads"
      color="green"
      period="weekly"
      label="downloads"
      :value="totalWeeklyDownloads"
    />
  </div>
  <div class="mt-8">
    <Chart
      id="hits"
      :data="weeklyHits"
      color="blue"
      period="weekly"
      label="requests"
      :value="totalWeeklyHits"
    />
  </div>
  <div class="mt-8">
    <Chart
      id="bandwidth"
      :data="weeklyDownloads"
      color="orange"
      period="weekly"
      label="bandwidth"
    >
      <template #value>
        {{ bandwidthSize }}
      </template>
    </Chart>
  </div>
</template>
