'use client';

import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const VALID_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TOKEN_URL;
const restaurantId = process.env.NEXT_PUBLIC_ID_RESTAURANTE;

export default function AdminPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'menus' | 'drinks'>('menus');
  const [menus, setMenus] = useState<{ 
    id: number; 
    name: string; 
    mainCourse: string; 
    starterPrice: number;
    saladPrice: number;
    mainCoursePrice: number;
    dessertPrice: number; 
    totalPrice: number 
  }[]>([]);
  const [drinks, setDrinks] = useState<{ id: number; name: string; category: string; wineType: string; price: number }[]>([]);
  const [editingMenuId, setEditingMenuId] = useState<number | null>(null);
  const [editingDrinkId, setEditingDrinkId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{type: 'success'|'error', message: string}|null>(null);  

  const [menuForm, setMenuForm] = useState({
    name: '',
    starter: '',
    starterPrice: 0,
    salad: '',
    saladPrice: 0,
    mainCourse: '',
    mainCoursePrice: 0,
    dessert: '',
    dessertPrice: 0,
    totalPrice: 0,
    imageUrl: ''
  });

  const [drinkForm, setDrinkForm] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'WINE',
    wineType: 'RED'
  });

  // Verificar token de acesso na inicialização
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token === VALID_ACCESS_TOKEN) {
      setIsAuthorized(true);
      fetchData();
    } else {
      setIsAuthorized(false);
    }
    
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Calculate total price
  useEffect(() => {
    const total = menuForm.starterPrice + menuForm.saladPrice + menuForm.mainCoursePrice + menuForm.dessertPrice;
    setMenuForm(prev => ({...prev, totalPrice: total}));
  }, [menuForm.starterPrice, menuForm.saladPrice, menuForm.mainCoursePrice, menuForm.dessertPrice]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [menusRes, drinksRes] = await Promise.all([
        fetch('/api/menus'),
        fetch('/api/drinks')
      ]);

      if (!menusRes.ok || !drinksRes.ok) {
        throw new Error('Erro ao carregar dados');
      }

      const [menusData, drinksData] = await Promise.all([
        menusRes.json(),
        drinksRes.json()
      ]);

      setMenus(menusData);
      setDrinks(drinksData);
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (type: 'success'|'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const resetMenuForm = () => {
    setMenuForm({
      name: '',
      starter: '',
      starterPrice: 0,
      salad: '',
      saladPrice: 0,
      mainCourse: '',
      mainCoursePrice: 0,
      dessert: '',
      dessertPrice: 0,
      totalPrice: 0,
      imageUrl: ''
    });
    setEditingMenuId(null);
  };

  const resetDrinkForm = () => {
    setDrinkForm({
      name: '',
      description: '',
      price: 0,
      category: 'WINE',
      wineType: 'RED'
    });
    setEditingDrinkId(null);
  };

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('/api/menus', {
        method: editingMenuId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...menuForm,
          restaurantId,
          ...(editingMenuId && { id: editingMenuId })
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar menu');
      }

      showNotification('success', editingMenuId ? 'Menu atualizado com sucesso!' : 'Menu criado com sucesso!');
      fetchData();
      resetMenuForm();
    } catch (error) {
      console.error('Error saving menu:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao salvar menu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('/api/drinks', {
        method: editingDrinkId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...drinkForm,
          restaurantId,
          ...(editingDrinkId && { id: editingDrinkId })
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar bebida');
      }

      showNotification('success', editingDrinkId ? 'Bebida atualizada com sucesso!' : 'Bebida criada com sucesso!');
      fetchData();
      resetDrinkForm();
    } catch (error) {
      console.error('Error saving drink:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao salvar bebida');
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditMenu = (menu: any) => {
    setMenuForm({
      name: menu.name,
      starter: menu.starter || '',
      starterPrice: menu.starterPrice || 0,
      salad: menu.salad || '',
      saladPrice: menu.saladPrice || 0,
      mainCourse: menu.mainCourse || '',
      mainCoursePrice: menu.mainCoursePrice || 0,
      dessert: menu.dessert || '',
      dessertPrice: menu.dessertPrice || 0,
      totalPrice: menu.totalPrice || 0,
      imageUrl: menu.imageUrl || ''
    });
    setEditingMenuId(menu.id);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditDrink = (drink: any) => {
    setDrinkForm({
      name: drink.name,
      description: drink.description || '',
      price: drink.price || 0,
      category: drink.category || 'WINE',
      wineType: drink.wineType || 'RED'
    });
    setEditingDrinkId(drink.id);
  };

  const handleDeleteMenu = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este menu?')) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/menus?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir menu');
      }

      showNotification('success', 'Menu excluído com sucesso!');
      fetchData();
    } catch (error) {
      console.error('Error deleting menu:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao excluir menu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDrink = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta bebida?')) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/drinks?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir bebida');
      }

      showNotification('success', 'Bebida excluída com sucesso!');
      fetchData();
    } catch (error) {
      console.error('Error deleting drink:', error);
      showNotification('error', error instanceof Error ? error.message : 'Erro ao excluir bebida');
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar tela de não autorizado se o token for inválido
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
          <p className="mb-6">Você não tem autorização para acessar esta página. Por favor, verifique o token de acesso.</p>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p className="font-mono text-sm">URL de exemplo: /admin?token=seu_token_aqui</p>
          </div>
          <form 
            className="flex flex-col space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const tokenInput = (e.currentTarget.elements.namedItem('token') as HTMLInputElement).value;
              router.push(`/admin?token=${tokenInput}`);
            }}
          >
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                Token de Acesso
              </label>
              <input
                type="password"
                id="token"
                name="token"
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

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-md z-50 ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {notification.message}
          <button 
            onClick={() => setNotification(null)} 
            className="ml-2 font-bold"
          >
            ×
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">Painel de Administração</h1>
      
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'menus' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('menus')}
        >
          Menus
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'drinks' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('drinks')}
        >
          Bebidas
        </button>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Carregando...</p>
          </div>
        </div>
      )}
      
      {activeTab === 'menus' ? (
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingMenuId ? 'Editar Menu' : 'Criar Novo Menu'}
            </h2>
            <form onSubmit={handleMenuSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Menu</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({...menuForm, name: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagem (URL)</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={menuForm.imageUrl}
                    onChange={(e) => setMenuForm({...menuForm, imageUrl: e.target.value})}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entrada</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={menuForm.starter}
                    onChange={(e) => setMenuForm({...menuForm, starter: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço Entrada</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border rounded"
                    value={menuForm.starterPrice}
                    onChange={(e) => setMenuForm({...menuForm, starterPrice: parseFloat(e.target.value)})}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salada</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={menuForm.salad}
                    onChange={(e) => setMenuForm({...menuForm, salad: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço Salada</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border rounded"
                    value={menuForm.saladPrice}
                    onChange={(e) => setMenuForm({...menuForm, saladPrice: parseFloat(e.target.value)})}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prato Principal</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={menuForm.mainCourse}
                    onChange={(e) => setMenuForm({...menuForm, mainCourse: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço Prato Principal</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border rounded"
                    value={menuForm.mainCoursePrice}
                    onChange={(e) => setMenuForm({...menuForm, mainCoursePrice: parseFloat(e.target.value)})}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sobremesa</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={menuForm.dessert}
                    onChange={(e) => setMenuForm({...menuForm, dessert: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço Sobremesa</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border rounded"
                    value={menuForm.dessertPrice}
                    onChange={(e) => setMenuForm({...menuForm, dessertPrice: parseFloat(e.target.value)})}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço Total</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-2 border rounded bg-gray-100"
                  value={menuForm.totalPrice}
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Calculado automaticamente com base nos preços individuais</p>
              </div>
              
              <div className="mt-4 flex">
                <button
                  type="submit"
                  className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {editingMenuId ? 'Atualizar Menu' : 'Criar Menu'}
                </button>
                {editingMenuId && (
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={resetMenuForm}
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Menus Existentes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salada</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P.Principal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sobremesa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {menus.map((menu) => (
                    <tr key={menu.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{menu.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">R$ {menu.starterPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">R$ {menu.saladPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">R$ {menu.mainCoursePrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">R$ {menu.dessertPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">R$ {menu.totalPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          className="text-blue-500 hover:text-blue-700 mr-2 disabled:opacity-50"
                          onClick={() => handleEditMenu(menu)}
                          disabled={isLoading}
                        >
                          Editar
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700 disabled:opacity-50"
                          onClick={() => handleDeleteMenu(menu.id)}
                          disabled={isLoading}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingDrinkId ? 'Editar Bebida' : 'Adicionar Nova Bebida'}
            </h2>
            <form onSubmit={handleDrinkSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={drinkForm.name}
                    onChange={(e) => setDrinkForm({...drinkForm, name: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border rounded"
                    value={drinkForm.price}
                    onChange={(e) => setDrinkForm({...drinkForm, price: parseFloat(e.target.value)})}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={drinkForm.category}
                    onChange={(e) => setDrinkForm({...drinkForm, category: e.target.value})}
                    disabled={isLoading}
                  >
                    <option value="WINE">Vinho</option>
                    <option value="SPARKLING">Espumante</option>
                    <option value="BEER">Cerveja</option>
                    <option value="DIVERSE">Diversos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vinho</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={drinkForm.wineType}
                    onChange={(e) => setDrinkForm({...drinkForm, wineType: e.target.value})}
                    disabled={isLoading || drinkForm.category !== 'WINE'}
                  >
                    <option value="RED">Tinto</option>
                    <option value="WHITE">Branco</option>
                    <option value="ROSE">Rosé</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={drinkForm.description}
                  onChange={(e) => setDrinkForm({...drinkForm, description: e.target.value})}
                  disabled={isLoading}
                />
              </div>
              
              <div className="mt-4 flex">
                <button
                  type="submit"
                  className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {editingDrinkId ? 'Atualizar Bebida' : 'Adicionar Bebida'}
                </button>
                {editingDrinkId && (
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={resetDrinkForm}
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Bebidas Existentes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria Vinho</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {drinks.map((drink) => (
                    <tr key={drink.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{drink.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {drink.category === 'WINE' ? 'Vinho' : 
                        drink.category === 'SPARKLING' ? 'Espumante' :
                        drink.category === 'BEER' ? 'Cerveja' : 'Diversos'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                          {drink.category === 'WINE' ? (
                            drink.wineType === 'RED' ? 'Tinto' :
                            drink.wineType === 'WHITE' ? 'Branco' :
                            drink.wineType === 'ROSE' ? 'Rosé' : ''
                          ) : (
                            '-------'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">R$ {drink.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            className="text-blue-500 hover:text-blue-700 mr-2 disabled:opacity-50"
                            onClick={() => handleEditDrink(drink)}
                            disabled={isLoading}
                          >
                            Editar
                          </button>
                          <button 
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            onClick={() => handleDeleteDrink(drink.id)}
                            disabled={isLoading}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }