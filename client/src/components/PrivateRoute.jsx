import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <div style={{ padding: '80px', textAlign: 'center' }}>Checking access...</div>;
        }

        if (!user || user.role !== 'admin') {
          return <Redirect to="/z-login" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
