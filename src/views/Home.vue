<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePackagesListStore } from "../stores/packagesList";
import { onMounted, computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { RegistryReqParams } from "../stores/types";
import Footer from "../components/UI/Footer.vue";
import Spinner from "../components/UI/Spinner.vue";
import Input from "../components/UI/Input.vue";
import PackagesList from "../components/PackagesList.vue";
import { watchDebounced } from "@vueuse/core";

const router = useRouter();
const route = useRoute();

const store = usePackagesListStore();
const { isLoading, total } = storeToRefs(store);

const { searchPackage } = store;

const page = ref(1);
const size = ref(10);
const text = ref("jq");
const pageCount = computed(() => Math.ceil(total.value / size.value));

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
    router.push({ query: params.value });
    searchPackage(params.value);
  },
  { debounce: 500, maxWait: 1000 },
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
          <spinner v-if="isLoading" />
          <v-card-text v-else>
            <PackagesList>
              <template #pagination>
                <div class="text-center my-6">
                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                    rounded="circle"
                    :total-visible="6"
                  />
                </div>
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
