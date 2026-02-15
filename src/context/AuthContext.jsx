import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../apiBase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Role can be: 'guest', 'student', 'driver', 'admin'
  const [user, setUser] = useState(null); 
  const [role, setRole] = useState('guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persisted session
    const storedRole = localStorage.getItem('kiitbus_role');
    const storedUser = localStorage.getItem('kiitbus_user');
    
    if (storedRole && storedUser) {
      setRole(storedRole);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (selectedRole, credentials = {}) => {
    if (selectedRole === 'admin') {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        
        // Admin login successful
        const userData = { email: credentials.email, name: 'Transport Admin' };
        updateSession('admin', userData);
        return { success: true };
      } catch (error) {
        return { success: false, message: error.message };
      }
    } else {
      // Mock login for Student and Driver (since no API provided)
      const mockUser = {
        name: selectedRole === 'student' ? 'Student User' : 'Bus Driver',
        id: '12345'
      };
      updateSession(selectedRole, mockUser);
      return { success: true };
    }
  };

  const logout = () => {
    setRole('guest');
    setUser(null);
    localStorage.removeItem('kiitbus_role');
    localStorage.removeItem('kiitbus_user');
  };

  const updateSession = (newRole, newUser) => {
    setRole(newRole);
    setUser(newUser);
    localStorage.setItem('kiitbus_role', newRole);
    localStorage.setItem('kiitbus_user', JSON.stringify(newUser));
  };

  const value = {
    user,
    role,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
