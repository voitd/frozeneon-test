export interface Links {
  npm: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
}

export interface Author {
  name: string;
  email?: string;
  username?: string;
  url?: string;
}

export interface Package {
  name: string;
  scope: string;
  version: string;
  description: string;
  date: string;
  links: Links;
  author: Author;
  keywords?: string[];
}

export interface RegistryReqParams {
  text: string;
  size?: number;
  from?: number;
}

export interface RegistryApiRes {
  objects: Object[];
  total: number;
  time: string;
}

export interface PackageInfo extends Package {
  readme: string;
  hits: {
    rank: number;
    typeRank: number;
    total: number;
    dates: Record<string, number>;
  };
  bandwidth: {
    rank: number;
    typeRank: number;
    total: number;
    dates: Record<string, number>;
  };
  downloads: Record<string, number>;
}
