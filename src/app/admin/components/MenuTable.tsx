import { Menu } from "@/app/admin/types/admin";
import { Button } from "@/components/ui/button";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";


interface MenuTableProps {
    menus: Menu[];
    isLoading: boolean;
    onEdit: (menu: Menu) => void;
    onDelete: (menu: Menu) => void;
}

export const MenuTable = ({ 
    menus, 
    isLoading,
    onEdit,
    onDelete,
}: MenuTableProps) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Prato Principal</TableHead>
                    <TableHead>Sobremesa</TableHead>
                    <TableHead className="text-right">Preço Total</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
               {menus.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            Nenhum menu encontrado
                        </TableCell>
                    </TableRow>
               ) : (
                    menus.map((menu) => (
                        <TableRow key={menu.id}>
                            <TableCell className="font-medium">{menu.name}</TableCell>
                            <TableCell>{menu.starter}</TableCell>
                            <TableCell>{menu.mainCourse}</TableCell>
                            <TableCell>{menu.dessert}</TableCell>
                            <TableCell className="text-right">
                                {menu.totalPrice.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </TableCell>
                            <TableCell className="text-center">
                                <Button
                                variant="outline"
                                size="sm" 
                                onClick={() => onEdit(menu)}>
                                    Editar
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => onDelete(menu)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}

