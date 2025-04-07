import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminTabsProps {
  activeTab: 'menus' | 'drinks';
  setActiveTab: (tab: 'menus' | 'drinks') => void;
}

export const AdminTabs = ({ activeTab, setActiveTab }: AdminTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as 'menus' | 'drinks')}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="menus">Menus</TabsTrigger>
        <TabsTrigger value="drinks">Bebidas</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};