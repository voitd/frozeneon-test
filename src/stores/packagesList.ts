import { defineStore, acceptHMRUpdate } from "pinia";
import { Ref, ref } from "vue";
import api from "../api";
import { RegistryReqParams, PackageMeta } from "./types";

interface Store {
  packages: Ref<PackageMeta[]>;
  total: Ref<number>;
  searchPackage: (params: RegistryReqParams) => Promise<void>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
}

export const usePackagesListStore = defineStore("packagesList", (): Store => {
  const packages = ref<PackageMeta[]>([]);
  const total = ref(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const searchPackage = async (params: RegistryReqParams) => {
    isLoading.value = true;
    try {
      const { data } = await api.searchPackges(params);
      total.value = data.total;
      const res = data.objects.map((obj) => obj.package);
      packages.value = res;
    } catch (e) {
      console.error(e);
      const err = e as Error;
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { packages, total, isLoading, searchPackage, error };
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePackagesListStore, import.meta.hot),
  );
}
