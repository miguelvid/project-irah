'use client';

import { useEffect,useState } from 'react';

import { AdminTabs } from './components/AdminTabs';
import DrinkForm from './components/DrinkForm';
import DrinkList from './components/DrinkList';
import { LoadingOverlay } from './components/LoadingOverlay';
import LoginForm from './components/LoginForm';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';
import { Notification } from './components/Notification';
import { useApiData } from './hooks/useApi';
import { useNotification } from './hooks/useNotification';
import { useAuth } from './providers/AuthProvider';
import { Drink, DrinkFormData, Menu, MenuFormData } from './types/admin';

const restaurantId = process.env.NEXT_PUBLIC_ID_RESTAURANTE;

export default function AdminPanelContent() {
  const { isAuthorized, isLoading: isAuthLoading } = useAuth();
  const { notification, showNotification, closeNotification } = useNotification();
  const { isLoading: isApiLoading, fetchData, mutateData } = useApiData();

  const [activeTab, setActiveTab] = useState<'menus' | 'drinks'>('menus');
  const [menus, setMenus] = useState<Menu[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [editingMenuId, setEditingMenuId] = useState<number | null>(null);
  const [editingDrinkId, setEditingDrinkId] = useState<number | null>(null);

  const [menuForm, setMenuForm] = useState<MenuFormData>({
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

  const [drinkForm, setDrinkForm] = useState<DrinkFormData>({
    name: '',
    description: '',
    price: 0,
    category: 'WINE',
    wineType: 'RED'
  });

  useEffect(() => {
    if (isAuthorized) {
      loadData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const loadData = async () => {
    const [menusData, drinksData] = await Promise.all([
      fetchData<Menu[]>('/api/menus'),
      fetchData<Drink[]>('/api/drinks')
    ]);

    if (menusData) setMenus(menusData);
    if (drinksData) setDrinks(drinksData);
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

  const handleMenuSubmit = async (data: MenuFormData) => {
    const result = await mutateData<Menu>(
      '/api/menus',
      editingMenuId ? 'PUT' : 'POST',
      {
        ...data,
        restaurantId,
        ...(editingMenuId && { id: editingMenuId })
      }
    );

    if (result) {
      showNotification('success', editingMenuId ? 'Menu atualizado com sucesso!' : 'Menu criado com sucesso!');
      loadData();
      resetMenuForm();
    }
  };

  const handleDrinkSubmit = async (data: DrinkFormData) => {
    const result = await mutateData<Drink>(
      '/api/drinks',
      editingDrinkId ? 'PUT' : 'POST',
      {
        ...data,
        restaurantId,
        ...(editingDrinkId && { id: editingDrinkId })
      }
    );

    if (result) {
      showNotification('success', editingDrinkId ? 'Bebida atualizada com sucesso!' : 'Bebida criada com sucesso!');
      loadData();
      resetDrinkForm();
    }
  };

  const handleEditMenu = (menu: Menu) => {
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

  const handleEditDrink = (drink: Drink) => {
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
    
    const result = await mutateData(`/api/menus?id=${id}`, 'DELETE');
    if (result) {
      showNotification('success', 'Menu excluído com sucesso!');
      loadData();
    }
  };

  const handleDeleteDrink = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta bebida?')) return;
    
    const result = await mutateData(`/api/drinks?id=${id}`, 'DELETE');
    if (result) {
      showNotification('success', 'Bebida excluída com sucesso!');
      loadData();
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return <LoginForm />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <Notification 
          notification={notification} 
          onClose={closeNotification} 
        />
      )}
      
      <LoadingOverlay isLoading={isApiLoading} />

      <h1 className="text-3xl font-bold mb-8">Painel de Administração</h1>
      
      <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'menus' ? (
        <div>
          <MenuForm
            initialData={menuForm}
            editingId={editingMenuId}
            onSubmit={handleMenuSubmit}
            onCancel={resetMenuForm}
            isLoading={isApiLoading}
          />
          
          <MenuList
            menus={menus}
            onEdit={handleEditMenu}
            onDelete={handleDeleteMenu}
            isLoading={isApiLoading}
          />
        </div>
      ) : (
        <div>
          <DrinkForm
            initialData={drinkForm}
            editingId={editingDrinkId}
            onSubmit={handleDrinkSubmit}
            onCancel={resetDrinkForm}
            isLoading={isApiLoading}
          />
          
          <DrinkList
            drinks={drinks}
            onEdit={handleEditDrink}
            onDelete={handleDeleteDrink}
            isLoading={isApiLoading}
          />
        </div>
      )}
    </div>
  );
}