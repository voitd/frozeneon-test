<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import PackagesList from "../components/PackagesList.vue";
import Footer from "../components/UI/Footer.vue";
import Input from "../components/UI/Input.vue";
import Spinner from "../components/UI/Spinner.vue";
import Pagination from "../components/UI/Pagination.vue";
import { usePackagesListStore } from "../stores/packagesList";
import { RegistryReqParams } from "../stores/types";
import { watchDebounced } from "@vueuse/core";

const store = usePackagesListStore();
const { isLoading, total } = storeToRefs(store);

const { searchPackage } = store;

const page = ref(1);
const size = ref(10);
const text = ref("jq");

const params = computed<RegistryReqParams>(() => ({
  text: text.value,
  size: size.value,
  from: (page.value - 1) * size.value,
}));

onMounted(() => {
  searchPackage(params.value);
});

watch(
  () => text.value,
  (val) => {
    if (val.length < 2) return;
    page.value = 1;
  },
);

watchDebounced(
  () => params.value,
  () => {
    if (params.value.text.length < 2) return;
    searchPackage(params.value);
  },
  { debounce: 500 },
);
</script>

<template>
  <v-app id="inspire">
    <v-main class="bg-indigo-darken-3">
      <v-container>
        <v-card flat title="NPM Search" class="my-4 bg-indigo">
          <v-card-text>
            <Input v-model="text" />
          </v-card-text>
        </v-card>

        <v-card flat class="my-4 bg-indigo">
          <v-card-text>
            <spinner v-if="isLoading" />
            <PackagesList v-else>
              <template #pagination>
                <Pagination v-model="page" :total="total" :size="size" />
              </template>
            </PackagesList>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style scoped lang="scss"></style>
