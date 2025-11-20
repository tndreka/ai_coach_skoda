import { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockEmployees: Record<string, { password: string; data: Employee }> = {
  'EMP001': {
    password: 'demo123',
    data: {
      id: '1',
      employeeId: 'EMP001',
      fullName: 'Jan Novák',
      email: 'jan.novak@skoda-auto.cz',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      skills: ['React', 'TypeScript', 'Node.js', 'Team Leadership']
    }
  },
  'EMP002': {
    password: 'demo123',
    data: {
      id: '2',
      employeeId: 'EMP002',
      fullName: 'Eva Svobodová',
      email: 'eva.svobodova@skoda-auto.cz',
      department: 'Product Management',
      position: 'Product Manager',
      skills: ['Product Strategy', 'Agile', 'Market Analysis', 'Stakeholder Management']
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(() => {
    const stored = localStorage.getItem('skoda_employee');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (employeeId: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const employeeData = mockEmployees[employeeId];
    if (employeeData && employeeData.password === password) {
      setEmployee(employeeData.data);
      localStorage.setItem('skoda_employee', JSON.stringify(employeeData.data));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setEmployee(null);
    localStorage.removeItem('skoda_employee');
  };

  return (
    <AuthContext.Provider value={{ employee, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

