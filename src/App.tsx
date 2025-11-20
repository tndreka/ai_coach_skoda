import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import LoadingTransition from './components/LoadingTransistion';
import Dashboard from './components/Dashboard';

function App() {
  const { employee, login, logout, isLoading } = useAuth();
  const [showLoading, setShowLoading] = useState(false);

  const handleLogin = async (employeeId: string, password: string) => {
    const success = await login(employeeId, password);
    if (success) {
      setShowLoading(true);
    }
    return success;
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (showLoading) {
    return <LoadingTransition onComplete={handleLoadingComplete} />;
  }

  if (!employee) {
    return <LoginPage onLogin={handleLogin} isLoading={isLoading} />;
  }

  return <Dashboard employee={employee} onLogout={logout} />;
}

export default App;

