import type { $Fetch, FetchOptions } from "ofetch";

export interface RequestType {
  $fetch: $Fetch;
  call(
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<"json">
  ): () => Promise<object>;
}
