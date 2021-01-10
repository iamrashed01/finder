import useSWR from "swr";
import Cookies from "js-cookie";

export const fetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: { auth_token: Cookies.get("auth_token") },
  }).then((r) => r.json());

export function useUser() {
  const { data, mutate } = useSWR(
    "http://localhost:5000/api/auth/auth-status",
    fetcher
  );
  // if data is not defined, the query has not completed
  const user = data;
  const loading = !data;
  return [user, { mutate, loading }];
}
