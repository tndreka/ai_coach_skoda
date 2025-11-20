export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  position: string;
  skills: string[];
}

export interface AuthContextType {
  employee: Employee | null;
  login: (employeeId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

