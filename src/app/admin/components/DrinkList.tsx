'use client';

import { Drink } from '../types/admin';

interface DrinkListProps {
  drinks: Drink[];
  onEdit: (drink: Drink) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export default function DrinkList({ drinks, onEdit, onDelete, isLoading }: DrinkListProps) {
  return (
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
                    onClick={() => onEdit(drink)}
                    disabled={isLoading}
                  >
                    Editar
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    onClick={() => onDelete(drink.id)}
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
  );
}