import Router from 'next/router';
import Link from 'next/link';
import { Button } from 'reactstrap';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { useUser } from '../lib/hooks';

export default function ProfilePage() {
  const [user, { mutate }] = useUser();

  const logoutHandler = () => {
    Cookies.remove('auth_token');
    mutate(null);
    Router.replace('/login');
  };

  return (
    <Layout>
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
          <br />
          <br />
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>
        {`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}
      </style>
    </Layout>
  );
}
