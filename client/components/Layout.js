import Router from 'next/router';
import { useEffect } from 'react';
import Loader from './uiStyle/loader';
import { useUser } from '../lib/hooks';

const Layout = ({ children }) => {
  const [user, { loading }] = useUser();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log(!user, '!user!user!user');
        return Router.push('/login');
      }
      if (!user.isVerified) {
        console.log('go to email');
        return Router.push('/email-verify');
      }
    }
  }, [loading, user]);

  if (loading || !user || !user.isVerified) return <Loader />;
  return <div>{ children }</div>;
};

export default Layout;
