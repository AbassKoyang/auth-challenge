// customHooks/useSession.js
import { useEffect } from 'react';
import { useSession as useNextAuthSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const useSession = () => {
  const { data: session } = useNextAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Redirect to the home page upon successful authentication
      router.replace('/api/auth/callback/google');
    }
  }, [session]);

  return session;
};

export default useSession;
