import config from "@/config/config";

export default (url) => {
  return /^files/i.test(url) ? `${config.dataBaseUrl}${url}` : `data:image/jpg;base64,${url}`;
};
