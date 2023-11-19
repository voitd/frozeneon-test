export interface RegistryReqParams {
  text: string;
  size?: number;
  from?: number;
}

export interface RegistryApiRes {
  objects: Array<Record<string, any>>;
  total: number;
  time: string;
}

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: {
    name: string;
    email?: string;
    username?: string;
    url?: string;
  };
  readme?: string;
  hits?: {
    rank: number;
    typeRank: number;
    total: number;
    dates: Record<string, number>;
  };
  bandwidth?: {
    rank: number;
    typeRank: number;
    total: number;
    dates: Record<string, number>;
  };
  downloads?: {
    dates: Record<string, number>;
  };
}
