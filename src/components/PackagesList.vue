<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePackagesListStore } from "../stores/packagesList";
import { computed } from "vue";
import { PackageInfo } from "../stores/types";
import { ref } from "vue";
import { usePackageInfoStore } from "../stores/packageInfo";
import PackageInfoModal from "./PackageInfo/InfoModal.vue";

const store = usePackagesListStore();
const { packages } = storeToRefs(store);

const packageInfoStore = usePackageInfoStore();
const { getPackageInfo, updatePackageInfo } = packageInfoStore;
const { packageInfo } = storeToRefs(packageInfoStore);

const preparedPackages = computed(() =>
  packages.value.map(
    ({
      name,
      author,
      version,
      description,
    }: {
      name: string;
      author: any;
      version: string;
      description: string;
    }) => ({
      name,
      description,
      version,
      author: author?.name || author?.username,
    }),
  ),
);

const show = ref<boolean>(false);

const showPackageDetails = (item: PackageInfo) => {
  show.value = !show.value;
  if (packageInfo.value?.name !== item.name) {
    updatePackageInfo(item);
    getPackageInfo({ packageName: item.name });
  }
};
</script>
<template>
  <v-data-table :items="preparedPackages" class="my-4 bg-transparent">
    <template #item="{ item }">
      <tr class="table-item" @click="showPackageDetails(item)">
        <td class="text-subtitle-1">{{ item.name }}</td>
        <td class="text-subtitle-2">{{ item.description }}</td>
        <td class="">
          <v-chip class="ma-2" color="blue-accent-1">{{ item.version }}</v-chip>
        </td>
        <td class="">{{ item.author }}</td>
      </tr>
    </template>
    <template #bottom>
      <slot name="pagination" />
    </template>
  </v-data-table>
  <PackageInfoModal v-model="show" />
</template>

<style scoped lang="scss">
.table {
  &-item {
    cursor: pointer;
  }
}
</style>
