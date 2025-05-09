'use client'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetCurrentUserQuery } from '@/lib/feature/auth/auththunk';
import { setUser } from '@/lib/feature/auth/authSlice';
import { User } from '@/types/user';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data: user, isSuccess } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && user) {
      // Ensure user data matches the User interface
      const userData: User = {
        _id: user.id || user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        role: user.role ,
        companyName: user.companyName || '',
        companyRole: user.companyRole || '',
        phone: user.phone || '',
        state: user.state || '',
        country: user.country || ''
      };
      dispatch(setUser(userData));

      // Debug log
      console.log('Setting user in AuthLayout:', userData);
    }
  }, [dispatch, isSuccess, user]);

  return <>{children}</>;

}