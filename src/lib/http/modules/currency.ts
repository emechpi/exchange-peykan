import { FetchOptions } from "ofetch";
import Request from "../request";
import type { RequestType } from "@/lib/types/http.type";
import { currencies } from "@/lib/constatnts/currency";

const currencyCodes = currencies.map((item) => item.code).join();

class currencyModule extends Request<RequestType> {
  // this module endpoint
  private ENDPOINT = "/latest";
  private APIKEY =
    process.env.CURRENCY_API_KEY ||
    "cur_live_FKZlFZ9ZGrLJhHdaEQyqD9lZZyTGtChyO5oegnZz";

  async getLatestCurrencyRates(options?: FetchOptions) {
    return this.call(
      "GET",
      `${this.ENDPOINT}?apikey=${this.APIKEY}&currencies=${currencyCodes}`,
      options
    );
  }
}

export default currencyModule;
