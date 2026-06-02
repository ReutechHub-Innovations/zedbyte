import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './admin/Dashboard';
import Users from './admin/Users';
import ServiceManager from './admin/ServiceManager';
import ProjectManager from './admin/ProjectManager';
import ContentManager from './admin/ContentManager';
import Settings from './admin/Settings';
import PrivateRoute from './components/PrivateRoute';
import WhatsAppButton from './components/ui/WhatsAppButton';

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('zedbytes-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zedbytes-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
        <AuthProvider>
            <Router>
                <Header theme={theme} onToggleTheme={toggleTheme} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/services" exact component={Services} />
                    <Route path="/services/:id" component={ServiceDetail} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/z-login" component={AdminLogin} />
                    <PrivateRoute path="/z-admin/dashboard" component={Dashboard} />
                    <PrivateRoute path="/z-admin/users" component={Users} />
                    <PrivateRoute path="/z-admin/services" component={ServiceManager} />
                    <PrivateRoute path="/z-admin/projects" component={ProjectManager} />
                    <PrivateRoute path="/z-admin/content" component={ContentManager} />
                    <PrivateRoute path="/z-admin/settings" component={Settings} />
                </Switch>
                <Footer />
                <WhatsAppButton phone="+260970067982" message="Hi ZEDBYTES, I would like a quote for a website or app project." />
            </Router>
        </AuthProvider>
    );
};

export default App;