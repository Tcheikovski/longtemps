export default defineNuxtPlugin((nuxt) => {
  nuxt.hook("app:created", (/* app */) => {
    // Do async init
  });
});
