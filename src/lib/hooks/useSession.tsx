import { useEffect } from "react";
import useStore, { type IStore } from "@/store";
import useHttp from "./useHttp";

export default function useSession() {
  const store: any = useStore();
  const { user } = useHttp();

  async function fetchUser() {
    try {
      const thisUser = await user.apiGetAuthUser();
      store.setAuthUser(thisUser);
    } catch (error: any) {
      store.reset();
    }
  }

  useEffect(() => {
    if (!store.authUser) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
}
