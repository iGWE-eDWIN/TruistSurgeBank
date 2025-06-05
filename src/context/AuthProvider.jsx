import { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  currentUser: null,
  loading: true,
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload, loading: false };
    case 'REGISTER':
      return { ...state, currentUser: action.payload, loading: false };
    case 'ADMIN_LOGIN':
      return { ...state, currentUser: action.payload, loading: false };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { currentUser, loading } = state;

  const register = async (email, password, fullName) => {
    try {
      // Convert amount to number before sending
      // const numericSsn = Number(Ssn);

      // if (isNaN(numericSsn)) {
      //   throw new Error('Please enter a valid number');
      // }
      const res = await fetch('https://api.truistsurgebank.org/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem('token', data.token);
      dispatch({ type: 'REGISTER', payload: data.user });

      return data.user;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('https://api.truistsurgebank.org/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      console.log(data.user);

      localStorage.setItem('token', data.token);
      dispatch({ type: 'LOGIN', payload: data.user });

      return data.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const res = await fetch('https://api.truistsurgebank.org/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem('token', data.token);
      dispatch({ type: 'ADMIN_LOGIN', payload: data.user });

      return data.user;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const checkAdmin = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const res = await fetch('https://api.truistsurgebank.org/admin/check', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      return data.isAdmin;
    } catch (err) {
      console.error('Admin check failed:', err);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    fetch('https://api.truistsurgebank.org/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          dispatch({ type: 'SET_USER', payload: data.user });
        }
      })
      .catch(console.error)
      .finally(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    adminLogin,
    checkAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
