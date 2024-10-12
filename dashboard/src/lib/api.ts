import getConfig from "next/config";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// Get URL base on SSR or CSR
const API_URI = serverRuntimeConfig.URI || publicRuntimeConfig.URI;

export type ApiTag = "TODO_LIST" | "GET_TODO"; // etc..

interface IRequestInit {
  next?: {
    tags?: ApiTag[] | undefined | string[];
  };
}

export default async function api(
  url: string,
  options?: RequestInit & IRequestInit
) {
  const newUrl = new URL(url, API_URI);
  return fetch(newUrl, options);
}
