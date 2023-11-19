import { RegistryReqParams } from "../stores/types";

const REGISTRY_URL = import.meta.env.VITE_REGISTRY_URL;
const REGISTRY_API = import.meta.env.VITE_REGISTRY_API;
const JSDELIVER_API = import.meta.env.VITE_JSDELIVER_API;
const NPMJS_URL = import.meta.env.VITE_NPMJS_URL;

type PackageReq = {
  packageName: string;
  period?: string;
};

export default {
  searchPackageByName: ({ text, size = 10, from = 0 }: RegistryReqParams) =>
    `${REGISTRY_API}/search?text=${text}&size=${size}&from=${from}`,

  getPackageDownloads: ({ packageName, period = "last-month" }: PackageReq) =>
    `${NPMJS_URL}/downloads/range/${period}/${packageName}`,

  getPackageMeta: (packageName: string) =>
    `${JSDELIVER_API}/packages/npm/${packageName}`,

  getPackageStats: ({ packageName, period = "month" }: PackageReq) =>
    `${JSDELIVER_API}/stats/packages/npm/${packageName}?period=${period}`,

  getPackageDetails: (packageName: string) => `${REGISTRY_URL}/${packageName}`,
};
