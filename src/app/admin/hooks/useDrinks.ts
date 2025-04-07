import { useState } from "react";
import { toast } from "react-hot-toast";

import { Drink } from "../types/admin";

export const useMenus = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const featchDrinks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/drinks");
      if (!response.ok) {
        throw new Error("Falha ao carregar bebidas");
      }
      const data = await response.json();
      setDrinks(data);
    } catch (error) {
      console.error("Erro ao buscar bebidas:", error);
      toast.error("Erro ao buscar bebidas");
    } finally {
      setIsLoading(false);
    }
  };

  const createDrink = async (menu: Omit<Drink, "id">) => {
    try {
      const response = await fetch("/api/drinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar bebida");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao criar bebida:", error);
      toast.error("Erro ao criar bebida");
    }
  };

  const updateDrink = async (menu: Drink) => {
    try {
      const response = await fetch(`/api/drink`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar bebida");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar bebida:", error);
      toast.error("Erro ao atualizar bebida");
      throw error;
    }
  };
  const deleteDrink = async (id: number) => {
    try {
      const response = await fetch(`/api/bebidas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar bebida");
      }
      return true;
    } catch (error) {
      console.error("Erro ao deletar bebida:", error);
      toast.error("Erro ao deletar bebida");
      throw error;
    }
  };

  return {
    drinks,
    isLoading,
    featchDrinks,
    createDrink,
    updateDrink,
    deleteDrink,
  };
};
