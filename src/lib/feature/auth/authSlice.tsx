// @ts-nocheck

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = {
        _id: action.payload.id, // Use id consistently
        id: action.payload.id,  // Keep both for compatibility
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        userType: action.payload.userType,
        role: action.payload.role, // This will now be properly typed as 'user' | 'admin'
        companyName: action.payload.companyName ?? '',
        companyRole: action.payload.companyRole ?? '',
        phone: action.payload.phone ?? '',
        state: action.payload.state ?? '',
        country: action.payload.country ?? ''
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export all actions
export const { setUser, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;