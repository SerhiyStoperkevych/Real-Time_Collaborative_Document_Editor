import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './services/firebase';
import Auth from './components/Auth';
import Dashboard from './pages/Dashboard';
import Document from './pages/Document';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        {!currentUser ? (
          <Auth />
        ) : (
          <Switch>
            <Route exact path="/">
              <Dashboard currentUser={currentUser} />
            </Route>
            <Route path="/document/:id">
              <Document currentUser={currentUser} />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
