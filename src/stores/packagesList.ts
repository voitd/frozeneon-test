import { defineStore, acceptHMRUpdate } from "pinia";
import { Ref, ref } from "vue";
import api from "../api";
import { RegistryReqParams, Package } from "./types";

interface Store {
  packages: Ref<Package[]>;
  total: Ref<number>;
  searchPackage: Function;
  isLoading: Ref<boolean>;
}

export const usePackagesListStore = defineStore("packagesList", (): Store => {
  const packages = ref<Package[]>([]);
  const total = ref(0);
  const isLoading = ref(false);

  const searchPackage = async (params: RegistryReqParams) => {
    isLoading.value = true;
    try {
      const { data } = await api.searchPackges(params);
      total.value = data.total;
      const res = data.objects.map((obj) => obj.package);
      packages.value = res;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return { packages, total, isLoading, searchPackage };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePackagesListStore, import.meta.hot),
  );
}
