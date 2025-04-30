// components/MenuForm.tsx
'use client';

import { useEffect,useState } from 'react';

import { MenuFormData } from '../types/admin';

interface MenuFormProps {
  initialData: MenuFormData;
  editingId: number | null;
  onSubmit: (data: MenuFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export default function MenuForm({ 
  initialData, 
  editingId, 
  onSubmit, 
  onCancel, 
  isLoading 
}: MenuFormProps) {
  const [formData, setFormData] = useState<MenuFormData>(initialData);

  // Reset form when initialData changes (for editing)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Calculate total price
  useEffect(() => {
    const total = formData.starterPrice + formData.saladPrice + formData.mainCoursePrice + formData.dessertPrice;
    setFormData(prev => ({...prev, totalPrice: total}));
  }, [formData.starterPrice, formData.saladPrice, formData.mainCoursePrice, formData.dessertPrice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? 'Editar Menu' : 'Criar Novo Menu'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Menu</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem (URL)</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
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
              value={formData.starter}
              onChange={(e) => setFormData({...formData, starter: e.target.value})}
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
              value={formData.starterPrice}
              onChange={(e) => setFormData({...formData, starterPrice: parseFloat(e.target.value)})}
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
              value={formData.salad}
              onChange={(e) => setFormData({...formData, salad: e.target.value})}
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
              value={formData.saladPrice}
              onChange={(e) => setFormData({...formData, saladPrice: parseFloat(e.target.value)})}
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
              value={formData.mainCourse}
              onChange={(e) => setFormData({...formData, mainCourse: e.target.value})}
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
              value={formData.mainCoursePrice}
              onChange={(e) => setFormData({...formData, mainCoursePrice: parseFloat(e.target.value)})}
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
              value={formData.dessert}
              onChange={(e) => setFormData({...formData, dessert: e.target.value})}
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
              value={formData.dessertPrice}
              onChange={(e) => setFormData({...formData, dessertPrice: parseFloat(e.target.value)})}
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
            value={formData.totalPrice}
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
            {editingId ? 'Atualizar Menu' : 'Criar Menu'}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}