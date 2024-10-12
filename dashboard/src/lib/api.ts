import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const API_URI = serverRuntimeConfig.URI || publicRuntimeConfig.URI;

type Tag = "GET_TODO" | "GET_ITEMS"; // etc..

interface RequestInit {
  next?: {
    tags?: Tag[] | undefined | string[];
  };
}

export default async function api(url: string, options?: RequestInit) {
  const newUrl = new URL(url, API_URI);

  return fetch(newUrl, options);
}
