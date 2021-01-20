import Router from 'next/router';
import { useEffect } from 'react';
import Loader from './uiStyle/loader';
import { useUser } from '../lib/hooks';

const PublicLayout = ({ children }) => {
  const [user, { loading }] = useUser();

  useEffect(() => {
    if (!loading && user) {
      if (user.isVerified) {
        return Router.push('/');
      }
      if (!user.isVerified) {
        return Router.push('/email-verify');
      }
    }
  }, [loading, user]);

  if (loading) return <Loader />;
  return <div>{ children }</div>;
};

export default PublicLayout;
