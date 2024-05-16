const useTranslations = () => {
  function getTranslationData() {
    return global.data.translations || [];
  }

  const t = (param) => {
    const translations = getTranslationData();
    return Object.keys(translations).includes(param) ? translations[param] : "";
  };
  return {
    t,
  };
};

export default useTranslations;
