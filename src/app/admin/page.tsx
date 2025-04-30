'use client';

import { Suspense } from 'react';

import AdminPanelContent from './AdminPanelContent';
import { AuthProvider } from './providers/AuthProvider';

function LoadingFallBack() { {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
      </div>
    );
  }
}
export default function AdminPanel() {
  return (
    <Suspense fallback={<LoadingFallBack />}>
      <AuthProvider> 
        <AdminPanelContent />
      </AuthProvider>
    </Suspense>
  );
}