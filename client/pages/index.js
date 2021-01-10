import { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useUser } from "../lib/hooks";

export default function HomePage() {
  const [user, { loading }] = useUser();
  useEffect(() => {
    // redirect to login if user is not authenticated
    if (!loading && !user.data) Router.push("/login");
  }, [user, loading]);

  if (!user) return "Loading....";
  return (
    <>
      <h1>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </h1>
      <h2>{user.data.email}</h2>
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
