import { defineStore, acceptHMRUpdate } from "pinia";
import { Ref, ref } from "vue";
import api from "../api";
import { PackageMeta, PackageInfo } from "./types";
import { PackageReq } from "@/api/endpoints.ts";

interface Store {
  packageInfo: Ref<PackageInfo | PackageMeta | undefined>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
  getPackageInfo: (params: PackageReq) => Promise<void>;
  updatePackageInfo: (info: PackageInfo) => void;
}

export const usePackageInfoStore = defineStore("packageInfo", (): Store => {
  const packageInfo = ref<PackageInfo | undefined>();
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getPackageInfo = async (params: PackageReq) => {
    isLoading.value = true;

    const apis = [
      api.getPackageDetails(params.packageName),
      api.getPackageStats(params.packageName),
      api.getPackageDownloads(params.packageName),
    ];

    await Promise.all(apis)
      .then(([detailsRes, statsRes, downloadsRes]) => {
        const downloadsDates = downloadsRes.data.downloads.reduce(
          (
            acc: Record<string, number>,
            stat: { day: string; downloads: number },
          ) => {
            acc = { ...acc, [stat.day]: stat.downloads };
            return acc;
          },
          {},
        );

        const info = {
          ...packageInfo.value,
          ...detailsRes.data,
          ...statsRes.data,
          downloads: {
            dates: downloadsDates,
          },
        };
        packageInfo.value = info as PackageInfo;
      })
      .catch((e) => {
        console.error(e);
        error.value = e.message;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  const updatePackageInfo = (info: PackageInfo) => {
    packageInfo.value = info;
  };

  return { packageInfo, isLoading, error, getPackageInfo, updatePackageInfo };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePackageInfoStore, import.meta.hot));
}
