"use client";
import Link from "next/link";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import useHttp from "@/lib/hooks/useHttp";
const Header = () => {
  const store: any = useStore((state) => state);
  const user = store.authUser;
  const router = useRouter();
  const { auth } = useHttp();

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      await auth.apiLogoutUser();
      router.push("/login");
    } catch (error) {
    } finally {
      store.reset();
      router.push("/login");
    }
  };

  return (
    <>
      <header className="bg-white h-20 fixed top-0 w-full z-40 shadow-3xl shadow-shadow-500">
        <nav className="h-full flex justify-between container mx-auto items-center">
          <div>
            <Link
              href="/"
              className="text-gray-600 text-xl lg:text-2xl font-semibold"
            >
              Exchange
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-500 ">
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-400 hover:text-gray-500 "
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    Dashboard
                  </Link>
                </li>
                <li
                  className="cursor-pointer text-primary-300 hover:text-primary-400"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
