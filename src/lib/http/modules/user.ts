import Request from "../request";
import type { RequestType } from "@/lib/types/http.type";

class userModule extends Request<RequestType> {
  // this module endpoint
  private ENDPOINT = "/api/users";

  async apiGetAuthUser(token?: string) {
    return this.call("GET", `${this.ENDPOINT}/me`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default userModule;
