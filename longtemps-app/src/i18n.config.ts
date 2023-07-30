export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: "fr_FR",
    fallbackLocale: {
      de_DE: ["en_US"],
      en_GB: ["en_US"],
      pt_PT: ["pt_BR"],
      es_ES: ["es_MX"],
      it_IT: ["en_US"],
      ru_RU: ["en_US"],
      es_MX: ["en_US"],
      pt_BR: ["en_US"],
      ko_FR: ["en_US"],
      zh_TW: ["en_US"],
      zh_CN: ["en_US"],
      default: ["fr_FR"],
    },
  };
});
