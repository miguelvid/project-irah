"use client";

import { Suspense } from "react";

import AdminPanelContent from "./AdminPanelContent";
import { NewAuthProvider } from "./providers/NewAuthProvider";

function LoadingFallBack() {
  return <div>Carregando...</div>;
}

export default function AdminPanel() {
  return (
    <Suspense fallback={<LoadingFallBack />}>
      <NewAuthProvider>
        <AdminPanelContent />
      </NewAuthProvider>
    </Suspense>
  );
}
