export interface User {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyRole: string;
  phone: string;
  state: string;
  country: string;
  userType: 'IT' | 'Solar';
  role: 'user' | 'admin';
}
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends Omit<User, '_id' | 'id' | 'role'> {
  password: string;
}

export interface AuthResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'IT' | 'Solar';
  role: 'user' | 'admin';
  token: string;
}



 export interface JoinRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  country: string;
  companyName: string;
  companyRole: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Add interface for creating join request
export interface CreateJoinRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  country: string;
  companyName: string;
  companyRole: string;
}