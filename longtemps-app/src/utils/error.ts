import { NuxtError } from "nuxt/app";

export const toNuxtError = (e: unknown): NuxtError => createError(e instanceof Error ? e : { data: e });
