'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function LoginForm() {
  const router = useRouter();
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin?token=${token}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
        <p className="mb-6">Você não tem autorização para acessar esta página. Por favor, verifique o token de acesso.</p>
        
        
        <form 
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
              Token de Acesso
            </label>
            <input
              type="password"
              id="token"
              name="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o token de acesso"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}