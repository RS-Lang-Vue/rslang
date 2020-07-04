import words from "./services/words";
import users from "./services/users";

export default {
  modules: {
    words,
    users,
  },
  state: {
    baseApiUrl: "https://afternoon-falls-25894.herokuapp.com",
  },
};
