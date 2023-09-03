import Request from "../request";
import type { RequestType } from "@/lib/types/http.type";
import type {
  RegisterUserInput,
  LoginUserInput,
} from "@/lib/validations/user.schema";

class authModule extends Request<RequestType> {
  // this module endpoint
  private ENDPOINT = "/api/auth";

  async apiRegisterUser(credentials: RegisterUserInput) {
    return this.call("POST", `${this.ENDPOINT}/register`, credentials);
  }
  async apiLoginUser(credentials: LoginUserInput) {
    return this.call("POST", `${this.ENDPOINT}/login`, credentials);
  }
  async apiLogoutUser() {
    return this.call("GET", `${this.ENDPOINT}/logout`);
  }
}
export default authModule;
