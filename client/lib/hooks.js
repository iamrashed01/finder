import useSWR from "swr";
import Cookies from "js-cookie";

export const fetcher = async (url) => {
  const response = fetch(url, {
    method: "GET",
    headers: { auth_token: Cookies.get("auth_token") },
  })
    .then((r) => r.json())
    .then((res) => res.data)
    .catch((err) => console.error(err));

  try {
    const res = await response;
    if (res) return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export function useUser() {
  const { data, mutate } = useSWR(
    "http://localhost:5000/api/auth/auth-status",
    fetcher
  );
  // if data is not defined, the query has not completed
  const user = data;
  const loading = !data && data !== null;
  return [user, { mutate, loading }];
}
