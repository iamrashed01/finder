import { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useUser } from "../lib/hooks";

export default function HomePage() {
  const [user, { loading }] = useUser();
  useEffect(() => {
    console.log("index page called");
    // redirect to login if user is not authenticated
    if (!loading && !user) Router.push("/login");
  }, [user, loading]);

  console.log(loading, "user===dash");

  if (!user) return "Loading....";

  const email = user.email || user.googleEmail;
  return (
    <>
      <h1>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </h1>
      <h2>{email}</h2>
      <h5>{user.name}</h5>
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
}
