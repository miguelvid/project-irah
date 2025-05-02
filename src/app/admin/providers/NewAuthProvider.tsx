// src/app/admin/providers/NewAuthProvider.tsx
"use client";

import { deleteCookie, getCookie } from "cookies-next"; // Import deleteCookie
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Nome do cookie que armazena o token JWT
const SESSION_COOKIE_NAME = "admin_session_token";

interface AuthContextType {
  isAuthorized: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a NewAuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function NewAuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Começa carregando

  // Verifica o estado inicial de autenticação baseado na presença do cookie JWT
  // Nota: A presença do cookie não garante que o token é válido (o middleware verifica isso),
  // mas é um indicador inicial para a UI.
  useEffect(() => {
    const sessionToken = getCookie(SESSION_COOKIE_NAME);
    setIsAuthorized(!!sessionToken); // Considera autorizado se o cookie existir
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthorized(true);
        setIsLoading(false);
        // Redireciona para /admin após login bem-sucedido
        // O middleware já deve ter sido aplicado, mas um refresh garante
        router.push("/admin");
        router.refresh();
        return true;
      } else {
        // Limpa o estado de autorizado e o cookie em caso de falha no login
        setIsAuthorized(false);
        deleteCookie(SESSION_COOKIE_NAME); // Garante que não haja cookie inválido
        console.error("Login failed:", await response.json());
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Error during login request:", error);
      setIsAuthorized(false);
      deleteCookie(SESSION_COOKIE_NAME);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error during logout request:", error);
    } finally {
      // Limpa o estado e redireciona para a raiz (onde o login pode ser mostrado)
      setIsAuthorized(false);
      // deleteCookie já foi chamado no backend, mas podemos chamar aqui por segurança
      deleteCookie(SESSION_COOKIE_NAME);
      setIsLoading(false);
      router.push("/"); // Redireciona para a raiz após logout
      router.refresh();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
