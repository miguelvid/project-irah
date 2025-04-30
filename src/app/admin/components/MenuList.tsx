// components/MenuList.tsx
'use client';

import { Menu } from '../types/admin';

interface MenuListProps {
  menus: Menu[];
  onEdit: (menu: Menu) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export default function MenuList({ menus, onEdit, onDelete, isLoading }: MenuListProps) {
  return (
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
                    onClick={() => onEdit(menu)}
                    disabled={isLoading}
                  >
                    Editar
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    onClick={() => onDelete(menu.id)}
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