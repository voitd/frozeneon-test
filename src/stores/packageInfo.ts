import { defineStore, acceptHMRUpdate } from "pinia";
import { Ref, ref } from "vue";
import api from "../api";
import { Package, PackageInfo } from "./types";

interface Store {
  packageInfo: Record<string, any>;
  isLoading: Ref<boolean>;
  getPackageInfo: Function;
  updatePackageInfo: Function;
}

export const usePackageInfoStore = defineStore("packageInfo", (): Store => {
  const packageInfo = ref<PackageInfo | Package | undefined>();
  const isLoading = ref(false);

  const getPackageInfo = async ({ name }: { name: string }) => {
    isLoading.value = true;

    const apis = [
      api.getPackageDetails(name),
      api.getPackageStats(name),
      api.getPackageDownloads(name),
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

        const info: PackageInfo = {
          ...packageInfo.value,
          ...detailsRes.data,
          ...statsRes.data,
          downloads: {
            dates: downloadsDates,
          },
        };
        console.log(info);
        packageInfo.value = info;
      })
      .catch((e) => console.error(e))
      .finally(() => {
        isLoading.value = false;
      });
  };

  const updatePackageInfo = (info: Package) => {
    packageInfo.value = info;
  };

  return { packageInfo, isLoading, getPackageInfo, updatePackageInfo };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePackageInfoStore, import.meta.hot));
}
