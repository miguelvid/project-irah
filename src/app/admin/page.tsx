"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

// Definição de tipos
interface Menu {
  id: number | null;
  name: string;
  starter: string;
  starterPrice: number;
  salad: string;
  saladPrice: number;
  mainCourse: string;
  mainCoursePrice: number;
  dessert: string;
  dessertPrice: number;
  totalPrice: number;
  imageUrl: string;
  restaurantId: string;
}

interface Drink {
  id: number | null;
  name: string;
  description: string;
  price: number;
  category: string;
  wineType: string | null;
  restaurantId: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"menus" | "drinks">("menus");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    show: boolean;
    id: number | null;
    type: string;
  }>({
    show: false,
    id: null,
    type: "",
  });

  // Estados para menus
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuForm, setMenuForm] = useState<Menu>({
    id: null,
    name: "",
    starter: "",
    starterPrice: 0,
    salad: "",
    saladPrice: 0,
    mainCourse: "",
    mainCoursePrice: 0,
    dessert: "",
    dessertPrice: 0,
    totalPrice: 0,
    imageUrl: "",
    restaurantId: "",
  });
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  const [menuErrors, setMenuErrors] = useState<Record<string, string>>({});

  // Estados para drinks
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [drinkForm, setDrinkForm] = useState<Drink>({
    id: null,
    name: "",
    description: "",
    price: 0,
    category: "",
    wineType: null,
    restaurantId: "",
  });
  const [isEditingDrink, setIsEditingDrink] = useState(false);
  const [drinkErrors, setDrinkErrors] = useState<Record<string, string>>({});

  // Fetch menus e drinks
  useEffect(() => {
    fetchMenus();
    fetchDrinks();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch("/api/menus");
      if (!res.ok) throw new Error("Falha ao carregar menus");

      const data = await res.json();
      setMenus(data);
    } catch (error) {
      console.error("Erro ao buscar menus:", error);
      toast.error("Erro ao carregar menus");
    }
  };

  const fetchDrinks = async () => {
    try {
      const res = await fetch("/api/drinks");
      if (!res.ok) throw new Error("Falha ao carregar drinks");

      const data = await res.json();
      setDrinks(data);
    } catch (error) {
      console.error("Erro ao buscar drinks:", error);
      toast.error("Erro ao carregar drinks");
    }
  };

  // Validação do formulário de menu
  const validateMenuForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!menuForm.name.trim()) errors.name = "O nome é obrigatório";
    if (!menuForm.restaurantId)
      errors.restaurantId = "O restaurante é obrigatório";
    if (menuForm.starterPrice < 0)
      errors.starterPrice = "O preço não pode ser negativo";
    if (menuForm.saladPrice < 0)
      errors.saladPrice = "O preço não pode ser negativo";
    if (menuForm.mainCoursePrice < 0)
      errors.mainCoursePrice = "O preço não pode ser negativo";
    if (menuForm.dessertPrice < 0)
      errors.dessertPrice = "O preço não pode ser negativo";

    setMenuErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validação do formulário de drink
  const validateDrinkForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!drinkForm.name.trim()) errors.name = "O nome é obrigatório";
    if (!drinkForm.category) errors.category = "A categoria é obrigatória";
    if (!drinkForm.restaurantId)
      errors.restaurantId = "O restaurante é obrigatório";
    if (drinkForm.price <= 0) errors.price = "O preço deve ser maior que zero";

    setDrinkErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handlers para menus
  const handleMenuInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    // Converter valores numéricos
    if (name.includes("Price")) {
      parsedValue = parseFloat(value) || 0;
    }

    setMenuForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    // Calcular preço total automaticamente quando qualquer preço for alterado
    if (name.includes("Price")) {
      setTimeout(() => {
        setMenuForm((prev) => ({
          ...prev,
          totalPrice:
            (prev.starterPrice || 0) +
            (prev.saladPrice || 0) +
            (prev.mainCoursePrice || 0) +
            (prev.dessertPrice || 0),
        }));
      }, 0);
    }
  };

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateMenuForm()) return;

    try {
      const method = isEditingMenu ? "PUT" : "POST";
      const res = await fetch("/api/menus", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuForm),
      });

      if (res.ok) {
        toast.success(
          isEditingMenu
            ? "Menu atualizado com sucesso!"
            : "Menu criado com sucesso!",
        );
        fetchMenus();
        resetMenuForm();
      } else {
        const error = await res.text();
        throw new Error(error || "Erro ao salvar menu");
      }
    } catch (error) {
      console.error("Erro ao salvar menu:", error);
      toast.error("Erro ao salvar menu");
    }
  };

  const resetMenuForm = () => {
    setMenuForm({
      id: null,
      name: "",
      starter: "",
      starterPrice: 0,
      salad: "",
      saladPrice: 0,
      mainCourse: "",
      mainCoursePrice: 0,
      dessert: "",
      dessertPrice: 0,
      totalPrice: 0,
      imageUrl: "",
      restaurantId: "",
    });
    setIsEditingMenu(false);
    setMenuErrors({});
  };

  const handleMenuEdit = (menu: Menu) => {
    setMenuForm(menu);
    setIsEditingMenu(true);
    setActiveTab("menus");
  };

  const confirmDeleteMenu = (id: number) => {
    setShowDeleteConfirm({ show: true, id, type: "menu" });
  };

  const handleMenuDelete = async () => {
    if (!showDeleteConfirm.id) return;

    try {
      const res = await fetch(`/api/menus?id=${showDeleteConfirm.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Menu excluído com sucesso!");
        fetchMenus();
      } else {
        throw new Error("Erro ao excluir menu");
      }
    } catch (error) {
      console.error("Erro ao excluir menu:", error);
      toast.error("Erro ao excluir menu");
    } finally {
      setShowDeleteConfirm({ show: false, id: null, type: "" });
    }
  };

  // Handlers para drinks
  const handleDrinkInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    let parsedValue: string | number | null = value;

    // Converter valores numéricos e tipo de vinho pode ser nulo
    if (name === "price") {
      parsedValue = parseFloat(value) || 0;
    } else if (name === "wineType" && value === "") {
      parsedValue = null;
    }

    setDrinkForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleDrinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDrinkForm()) return;

    try {
      const method = isEditingDrink ? "PUT" : "POST";
      const res = await fetch("/api/drinks", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(drinkForm),
      });

      if (res.ok) {
        toast.success(
          isEditingDrink
            ? "Drink atualizado com sucesso!"
            : "Drink criado com sucesso!",
        );
        fetchDrinks();
        resetDrinkForm();
      } else {
        const error = await res.text();
        throw new Error(error || "Erro ao salvar drink");
      }
    } catch (error) {
      console.error("Erro ao salvar drink:", error);
      toast.error("Erro ao salvar drink");
    }
  };

  const resetDrinkForm = () => {
    setDrinkForm({
      id: null,
      name: "",
      description: "",
      price: 0,
      category: "",
      wineType: null,
      restaurantId: "",
    });
    setIsEditingDrink(false);
    setDrinkErrors({});
  };

  const handleDrinkEdit = (drink: Drink) => {
    setDrinkForm(drink);
    setIsEditingDrink(true);
    setActiveTab("drinks");
  };

  const confirmDeleteDrink = (id: number) => {
    setShowDeleteConfirm({ show: true, id, type: "drink" });
  };

  const handleDrinkDelete = async () => {
    if (!showDeleteConfirm.id) return;

    try {
      const res = await fetch(`/api/drinks?id=${showDeleteConfirm.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Drink excluído com sucesso!");
        fetchDrinks();
      } else {
        throw new Error("Erro ao excluir drink");
      }
    } catch (error) {
      console.error("Erro ao excluir drink:", error);
      toast.error("Erro ao excluir drink");
    } finally {
      setShowDeleteConfirm({ show: false, id: null, type: "" });
    }
  };

  // Mock de restaurantes (em um caso real, isso seria buscado da API)
  const restaurants = [
    { id: "1", name: "Restaurante Principal" },
    { id: "2", name: "Restaurante Filial" },
  ];

  return (
    <div className="p-8">
      <Toaster position="top-right" />
      <h1 className="mb-6 text-3xl font-bold">Painel de Administração</h1>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <button
          onClick={() => setActiveTab("menus")}
          className={`mr-2 px-4 py-2 transition ${
            activeTab === "menus"
              ? "rounded-t-lg bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Menus
        </button>
        <button
          onClick={() => setActiveTab("drinks")}
          className={`px-4 py-2 transition ${
            activeTab === "drinks"
              ? "rounded-t-lg bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Drinks
        </button>
      </div>

      {/* Modal de confirmação para exclusão */}
      {showDeleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-bold">Confirmar exclusão</h3>
            <p className="mb-6">
              Tem certeza que deseja excluir este{" "}
              {showDeleteConfirm.type === "menu" ? "menu" : "drink"}? Esta ação
              não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowDeleteConfirm({ show: false, id: null, type: "" })
                }
                className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={
                  showDeleteConfirm.type === "menu"
                    ? handleMenuDelete
                    : handleDrinkDelete
                }
                className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo das abas */}
      {activeTab === "menus" && (
        <div>
          <h2 className="mb-4 text-xl font-bold">Gerenciar Menus</h2>

          {/* Formulário de menus */}
          <form
            onSubmit={handleMenuSubmit}
            className="mb-8 rounded-lg bg-gray-50 p-6 shadow-sm"
          >
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">Nome do Menu</label>
                <input
                  type="text"
                  name="name"
                  value={menuForm.name}
                  onChange={handleMenuInputChange}
                  className={`w-full rounded border p-2 ${menuErrors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {menuErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{menuErrors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium">Restaurante</label>
                <select
                  name="restaurantId"
                  value={menuForm.restaurantId}
                  onChange={handleMenuInputChange}
                  className={`w-full rounded border p-2 ${menuErrors.restaurantId ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Selecione um restaurante</option>
                  {restaurants.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </option>
                  ))}
                </select>
                {menuErrors.restaurantId && (
                  <p className="mt-1 text-sm text-red-500">
                    {menuErrors.restaurantId}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">Entrada</label>
                <input
                  type="text"
                  name="starter"
                  value={menuForm.starter}
                  onChange={handleMenuInputChange}
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  Preço da Entrada (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="starterPrice"
                  value={menuForm.starterPrice}
                  onChange={handleMenuInputChange}
                  className={`w-full rounded border p-2 ${menuErrors.starterPrice ? "border-red-500" : "border-gray-300"}`}
                />
                {menuErrors.starterPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {menuErrors.starterPrice}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">Salada</label>
                <input
                  type="text"
                  name="salad"
                  value={menuForm.salad}
                  onChange={handleMenuInputChange}
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  Preço da Salada (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="saladPrice"
                  value={menuForm.saladPrice}
                  onChange={handleMenuInputChange}
                  className={`w-full rounded border p-2 ${menuErrors.saladPrice ? "border-red-500" : "border-gray-300"}`}
                />
                {menuErrors.saladPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {menuErrors.saladPrice}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">
                  Prato Principal
                </label>
                <input
                  type="text"
                  name="mainCourse"
                  value={menuForm.mainCourse}
                  onChange={handleMenuInputChange}
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  Preço do Prato Principal (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="mainCoursePrice"
                  value={menuForm.mainCoursePrice}
                  onChange={handleMenuInputChange}
                  className={`w-full rounded border p-2 ${menuErrors.mainCoursePrice ? "border-red-500" : "border-gray-300"}`}
                />
                {menuErrors.mainCoursePrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {menuErrors.mainCoursePrice}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">Sobremesa</label>
                <input
                  type="text"
                  name="dessert"
                  value={menuForm.dessert}
                  onChange={handleMenuInputChange}
                  className="w-full rounded border border-gray-300 p-2"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  Preço da Sobremesa (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="dessertPrice"
                  value={menuForm.dessertPrice}
                  onChange={handleMenuInputChange}
                  className={`w-full rounded border p-2 ${menuErrors.dessertPrice ? "border-red-500" : "border-gray-300"}`}
                />
                {menuErrors.dessertPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {menuErrors.dessertPrice}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">URL da Imagem</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={menuForm.imageUrl}
                  onChange={handleMenuInputChange}
                  className="w-full rounded border border-gray-300 p-2"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  Preço Total do Menu (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="totalPrice"
                  value={menuForm.totalPrice}
                  readOnly
                  className="w-full rounded border border-gray-200 bg-gray-100 p-2"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Calculado automaticamente
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                {isEditingMenu ? "Atualizar Menu" : "Adicionar Menu"}
              </button>

              {isEditingMenu && (
                <button
                  type="button"
                  onClick={resetMenuForm}
                  className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
                >
                  Cancelar Edição
                </button>
              )}
            </div>
          </form>

          {/* Lista de menus */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-left">Entrada</th>
                  <th className="p-3 text-left">Salada</th>
                  <th className="p-3 text-left">Prato Principal</th>
                  <th className="p-3 text-left">Sobremesa</th>
                  <th className="p-3 text-right">Preço Total</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {menus.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-3 text-center text-gray-500">
                      Nenhum menu cadastrado
                    </td>
                  </tr>
                ) : (
                  menus.map((menu) => (
                    <tr key={menu.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{menu.name}</td>
                      <td className="p-3">{menu.starter || "-"}</td>
                      <td className="p-3">{menu.salad || "-"}</td>
                      <td className="p-3">{menu.mainCourse || "-"}</td>
                      <td className="p-3">{menu.dessert || "-"}</td>
                      <td className="p-3 text-right">
                        R$ {menu.totalPrice.toFixed(2)}
                      </td>
                      <td className="flex justify-center gap-2 p-3">
                        <button
                          onClick={() => handleMenuEdit(menu)}
                          className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => confirmDeleteMenu(menu.id as number)}
                          className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "drinks" && (
        <div>
          <h2 className="mb-4 text-xl font-bold">Gerenciar Drinks</h2>

          {/* Formulário de drinks */}
          <form
            onSubmit={handleDrinkSubmit}
            className="mb-8 rounded-lg bg-gray-50 p-6 shadow-sm"
          >
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">Nome do Drink</label>
                <input
                  type="text"
                  name="name"
                  value={drinkForm.name}
                  onChange={handleDrinkInputChange}
                  className={`w-full rounded border p-2 ${drinkErrors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {drinkErrors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {drinkErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium">Restaurante</label>
                <select
                  name="restaurantId"
                  value={drinkForm.restaurantId}
                  onChange={handleDrinkInputChange}
                  className={`w-full rounded border p-2 ${drinkErrors.restaurantId ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Selecione um restaurante</option>
                  {restaurants.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </option>
                  ))}
                </select>
                {drinkErrors.restaurantId && (
                  <p className="mt-1 text-sm text-red-500">
                    {drinkErrors.restaurantId}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-1 block font-medium">Descrição</label>
              <textarea
                name="description"
                value={drinkForm.description}
                onChange={handleDrinkInputChange}
                className="w-full rounded border border-gray-300 p-2"
                rows={3}
              />
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block font-medium">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={drinkForm.price}
                  onChange={handleDrinkInputChange}
                  className={`w-full rounded border p-2 ${drinkErrors.price ? "border-red-500" : "border-gray-300"}`}
                />
                {drinkErrors.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {drinkErrors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium">Categoria</label>
                <select
                  name="category"
                  value={drinkForm.category}
                  onChange={handleDrinkInputChange}
                  className={`w-full rounded border p-2 ${drinkErrors.category ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="wine">Vinho</option>
                  <option value="beer">Cerveja</option>
                  <option value="cocktail">Coquetel</option>
                  <option value="spirit">Destilado</option>
                  <option value="non-alcoholic">Sem Álcool</option>
                </select>
                {drinkErrors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {drinkErrors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block font-medium">Tipo de Vinho</label>
                <select
                  name="wineType"
                  value={drinkForm.wineType || ""}
                  onChange={handleDrinkInputChange}
                  disabled={drinkForm.category !== "wine"}
                  className="w-full rounded border border-gray-300 p-2 disabled:bg-gray-100"
                >
                  <option value="">Não aplicável</option>
                  <option value="red">Tinto</option>
                  <option value="white">Branco</option>
                  <option value="rose">Rosé</option>
                  <option value="sparkling">Espumante</option>
                  <option value="dessert">Sobremesa</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  {drinkForm.category !== "wine"
                    ? "Disponível apenas para vinhos"
                    : ""}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                {isEditingDrink ? "Atualizar Drink" : "Adicionar Drink"}
              </button>

              {isEditingDrink && (
                <button
                  type="button"
                  onClick={resetDrinkForm}
                  className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
                >
                  Cancelar Edição
                </button>
              )}
            </div>
          </form>

          {/* Lista de drinks */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-left">Descrição</th>
                  <th className="p-3 text-left">Categoria</th>
                  <th className="p-3 text-left">Tipo</th>
                  <th className="p-3 text-right">Preço</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {drinks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-3 text-center text-gray-500">
                      Nenhum drink cadastrado
                    </td>
                  </tr>
                ) : (
                  drinks.map((drink) => (
                    <tr key={drink.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{drink.name}</td>
                      <td className="max-w-xs truncate p-3">
                        {drink.description}
                      </td>
                      <td className="p-3 capitalize">{drink.category}</td>
                      <td className="p-3">
                        {drink.category === "wine" && drink.wineType
                          ? drink.wineType === "red"
                            ? "Tinto"
                            : drink.wineType === "white"
                              ? "Branco"
                              : drink.wineType === "rose"
                                ? "Rosé"
                                : drink.wineType === "sparkling"
                                  ? "Espumante"
                                  : drink.wineType === "dessert"
                                    ? "Sobremesa"
                                    : "-"
                          : "-"}
                      </td>
                      <td className="p-3 text-right">
                        R$ {drink.price.toFixed(2)}
                      </td>
                      <td className="flex justify-center gap-2 p-3">
                        <button
                          onClick={() => handleDrinkEdit(drink)}
                          className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => confirmDeleteDrink(drink.id as number)}
                          className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
