import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from '@/components/ui/alert-dialog'

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
    type: 'menu' | 'drink';
}

export const DeleteConfirmDialog = ({
    open,
    onOpenChange,
    onDelete,
    type,
}: DeleteConfirmDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Excluir {type}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja excluir este {type}? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className="bg-red-500 hover:bg-red-600">
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

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