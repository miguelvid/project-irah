'use client';

import { Suspense } from 'react';

import AdminPanelContent from './AdminPanelContent';
import { AuthProvider } from './providers/AuthProvider';

function LoadingFallBack() {
    return <div>Carregando...</div>
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