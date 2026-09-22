import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthStore } from '../../store/authStore';

export const AuthSync = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { setAuth, setLoading, logout } = useAuthStore();

  useEffect(() => {
    setLoading(isLoading);
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Fetch token
        getAccessTokenSilently()
          .then((token) => {
            // Check roles in user payload if provided, default to visitor
            // E.g. user['https://havencrest.com/roles']
            const role = (user as any)?.['https://havencrest.com/roles']?.[0] || 'visitor';
            
            setAuth(
              {
                id: user.sub || 'unknown',
                role,
                full_name: user.name,
                email: user.email,
                avatar_url: user.picture,
                created_at: user.updated_at || new Date().toISOString()
              },
              token,
              role
            );
          })
          .catch((err) => {
            console.error('Failed to get token', err);
            logout();
          });
      } else {
        logout();
      }
    }
  }, [isAuthenticated, isLoading, user, getAccessTokenSilently, setAuth, setLoading, logout]);

  return null;
};
