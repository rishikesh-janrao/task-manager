import SERVICES from "../constants/SERVICES";


export const initApplication = async (_) => {
  const response = await fetch(SERVICES.TRANSLATIONS);
  const translations = await response.json();
  global.data = {
    translations,
  }
  _();
};
