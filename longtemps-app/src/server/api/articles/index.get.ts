import { H3Event } from "h3";
import { Article } from "@/api";

const getArticles = async (event: H3Event) => {
  const fetch = await useApiFetch(event);
  return await fetch<Article[]>("/articles");
};

export default defineEventHandler((event) => getArticles(event));
