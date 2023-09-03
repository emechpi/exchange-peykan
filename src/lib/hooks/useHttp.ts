import { $fetch, FetchOptions } from "ofetch";

// modules
import currencyModule from "@/lib/http/modules/currency";
import authModule from "@/lib/http/modules/auth";
import userModule from "@/lib/http/modules/user";

interface IApiInstance {
  currency: currencyModule;
  auth: authModule;
  user: userModule;
}

const useHttp = () => {
  const authOptions: FetchOptions = {
    baseURL: "http://localhost:3000",
  };
  const authApiFecther = $fetch.create(authOptions);

  const otherApiOptions: FetchOptions = {
    baseURL: "https://api.currencyapi.com/v3",
  };
  const otherApiFecther = $fetch.create(otherApiOptions);

  // An object containing all modules we need to expose
  const modules: IApiInstance = {
    auth: new authModule(authApiFecther),
    user: new userModule(authApiFecther),
    currency: new currencyModule(otherApiFecther),
  };
  return modules;
};

export default useHttp;
