'use client';

import AdminPanelContent from './AdminPanelContent';
import { AuthProvider } from './providers/AuthProvider';

export default function AdminPanel() {
  return (
    <AuthProvider>
      <AdminPanelContent />
    </AuthProvider>
  );
}