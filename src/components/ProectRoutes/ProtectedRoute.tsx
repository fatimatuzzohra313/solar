'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    if (!user) {
      router.push('/signIn');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}

