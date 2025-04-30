// components/DrinkForm.tsx
'use client';

import { useEffect,useState } from 'react';

import { DrinkFormData } from '../types/admin';

interface DrinkFormProps {
  initialData: DrinkFormData;
  editingId: number | null;
  onSubmit: (data: DrinkFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DrinkForm({ 
  initialData, 
  editingId, 
  onSubmit, 
  onCancel, 
  isLoading 
}: DrinkFormProps) {
  const [formData, setFormData] = useState<DrinkFormData>(initialData);

  // Reset form when initialData changes (for editing)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? 'Editar Bebida' : 'Adicionar Nova Bebida'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
            <input
              type="number"
              step="0.01"
              className="w-full p-2 border rounded"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
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
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as DrinkFormData['category']})}
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
              value={formData.wineType}
              onChange={(e) => setFormData({...formData, wineType: e.target.value as DrinkFormData['wineType']})}
              disabled={isLoading || formData.category !== 'WINE'}
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
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
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
            {editingId ? 'Atualizar Bebida' : 'Adicionar Bebida'}
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