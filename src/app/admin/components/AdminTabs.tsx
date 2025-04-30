type LoadingOverlayProps = {
    isLoading: boolean;
    message?: string;
  };
  
  export const LoadingOverlay = ({ isLoading, message = 'Carregando...' }: LoadingOverlayProps) => {
    if (!isLoading) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>{message}</p>
        </div>
      </div>
    );
  };type Tab = 'menus' | 'drinks';

  type AdminTabsProps = {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
  };
  
  export const AdminTabs = ({ activeTab, onTabChange }: AdminTabsProps) => (
    <div className="flex mb-6 border-b">
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === 'menus' 
            ? 'border-b-2 border-blue-500 text-blue-600' 
            : 'text-gray-500'
        }`}
        onClick={() => onTabChange('menus')}
      >
        Menus
      </button>
      <button
        className={`px-4 py-2 font-medium ${
          activeTab === 'drinks' 
            ? 'border-b-2 border-blue-500 text-blue-600' 
            : 'text-gray-500'
        }`}
        onClick={() => onTabChange('drinks')}
      >
        Bebidas
      </button>
    </div>
  );