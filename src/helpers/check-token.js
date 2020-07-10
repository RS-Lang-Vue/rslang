import config from "@/config/config";

export default {
  deltaTime() {
    return Date.now() - localStorage.getItem("tokenReceiptTime");
  },
  isTokenOutdated() {
    return this.deltaTime() > config.tokenLifetime;
  },
  isTokenRequiresUpdating() {
    return this.deltaTime() > config.tokenLifetime / 4 && this.deltaTime() < config.tokenLifetime;
  },
};
