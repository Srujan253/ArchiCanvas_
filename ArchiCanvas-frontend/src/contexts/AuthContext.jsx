import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// --- Configuration ---
// The base URL for your backend API.
// It's best practice to store this in a .env file for production.
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('archicanvas-token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    // --- Set Axios default headers ---
    // This tells axios to always send the token with every request if it exists.
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // You might also want to fetch the user profile here if the page reloads
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // --- Check for logged-in user on initial load ---
   useEffect(() => {
  const storedUser = localStorage.getItem('archicanvas-user');

  if (storedUser && storedUser !== "undefined" && token) {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error("❌ Invalid user in localStorage, clearing it:", storedUser);
      localStorage.removeItem('archicanvas-user');
    }
  }

  setLoading(false);
}, [token]);

  

    // --- REAL REGISTER FUNCTION ---
    const register = async (formData) => {
        try {
            // We don't need to send confirmPassword to the backend
            const { confirmPassword, ...registerData } = formData;

            // Make the actual API call to your backend's register endpoint
            const response = await axios.post(`${API_URL}/register`, registerData);
            
            // The backend handles the success message, but we can still show a toast
            toast.success('Registration successful! Please wait for admin approval.');
            
            return response.data;

        } catch (error) {
            // Display the actual error message from the backend
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
            throw error;
        }
    };

    // --- REAL LOGIN FUNCTION ---
    // --- REAL LOGIN FUNCTION ---
const login = async (email, password, selectedRole) => {
  try {
    console.log("hi",selectedRole);
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { token, data } = response.data;
    const user = data?.user;

    if (!user) {
      throw new Error("Login response missing user data.");
    }

    // ✅ Check role match
    if (user.role !== selectedRole) {
      toast.error(`This account is registered as ${user.role}. Please select the correct role.`);
      throw new Error("Role mismatch.");
    }

    // Update state
    setUser(user);
    setToken(token);

    // Store user and token in localStorage
    localStorage.setItem('archicanvas-user', JSON.stringify(user));
    localStorage.setItem('archicanvas-token', token);

    toast.success(`Welcome back, ${user.name}!`);

    // 🔥 Redirect based on role
    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user.role === 'artist' || user.role === 'seller') {
      navigate('/seller-dashboard');
    } else {
      navigate('/profile');
    }

    return user;

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed.';
    toast.error(errorMessage);
    throw error;
  }
};


    // --- REAL LOGOUT FUNCTION ---
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('archicanvas-user');
        localStorage.removeItem('archicanvas-token');
        toast.success('Logged out successfully');
    };

    // You can build out these functions to make API calls as well
    const updateProfile = (updates) => { /* ... API call to a /profile/update endpoint ... */ };
    const approveSeller = (sellerId) => { /* ... API call to an /admin/approve endpoint ... */ };
    const rejectSeller = (sellerId) => { /* ... API call to an /admin/reject endpoint ... */ };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        approveSeller,
        rejectSeller,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isSeller: user?.role === 'artist', // Matching your backend model
        isBuyer: user?.role === 'buyer'
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
