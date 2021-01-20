import Link from 'next/link';
import { useUser } from '../lib/hooks';
import Layout from '../components/Layout';

export default function HomePage() {
  const [user] = useUser();

  return (
    <Layout>
      <h1>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </h1>
      {user && (
        <>
          <h2>{user.email || user.googleEmail}</h2>
          <h5>{user.name}</h5>
        </>
      )}
      <style jsx>
        {`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}
      </style>
    </Layout>
  );
}
