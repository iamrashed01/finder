import { useEffect } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Link from "next/link";
import { Button } from "reactstrap";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const [user, { mutate, loading }] = useUser();

  useEffect(() => {
    // redirect user to login if not authenticated
    if (!loading && !user.data) Router.replace("/login");
  }, [user, loading]);

  const logoutHandler = () => {
    Cookies.remove("auth_token");
    mutate(null);
    Router.replace("/login");
  };

  return (
    <>
      <h1>Profile</h1>

      {user && (
        <>
          <Link href="/">
            <a>
              <Button>Home</Button>
            </a>
          </Link>
          <br />
          <Button onClick={logoutHandler}>Logout</Button>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
}
