import { useState } from "react";
import { toast } from "react-hot-toast";

import { Menu } from "../types/admin";

export const useMenus = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const featchMenus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/menus");
      if (!response.ok) {
        throw new Error("Falha ao carregar menus");
      }
      const data = await response.json();
      setMenus(data);
    } catch (error) {
      console.error("Erro ao buscar menus:", error);
      toast.error("Erro ao buscar menus");
    } finally {
      setIsLoading(false);
    }
  };

  const createMenu = async (menu: Omit<Menu, "id">) => {
    try {
      const response = await fetch("/api/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar menu");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao criar menu:", error);
      toast.error("Erro ao criar menu");
    }
  };

  const updateMenu = async (menu: Menu) => {
    try {
      const response = await fetch(`/api/menus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar menu");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar menu:", error);
      toast.error("Erro ao atualizar menu");
      throw error;
    }
  };
  const deleteMenu = async (id: number) => {
    try {
      const response = await fetch(`/api/menus/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar menu");
      }
      return true;
    } catch (error) {
      console.error("Erro ao deletar menu:", error);
      toast.error("Erro ao deletar menu");
      throw error;
    }
  };

  return {
    menus,
    isLoading,
    featchMenus,
    createMenu,
    updateMenu,
    deleteMenu,
  };
};
