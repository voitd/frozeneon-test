import axios from "axios";
import { RegistryApiRes, RegistryReqParams } from "../stores/types";
import endpoints from "./endpoints";

export default {
  searchPackges: (
    params: RegistryReqParams,
  ): Promise<{ data: RegistryApiRes }> =>
    axios.get(endpoints.searchPackageByName(params)),
  getPackageDetails: (packageName: string) =>
    axios.get(endpoints.getPackageDetails(packageName)),
  getPackageMeta: (packageName: string) =>
    axios.get(endpoints.getPackageMeta(packageName)),
  getPackageStats: (packageName: string) =>
    axios.get(endpoints.getPackageStats({ packageName })),
  getPackageDownloads: (packageName: string) =>
    axios.get(endpoints.getPackageDownloads({ packageName })),
};
