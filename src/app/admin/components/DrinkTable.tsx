import { Drink } from '@/app/admin/types/admin';  
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
  
interface DrinkTableProps {
    drinks: Drink[];
    isLoading: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}
  
export const DrinkTable = ({
    drinks,
    isLoading,
    onEdit,
    onDelete,
}: DrinkTableProps) => {
    if (isLoading) return <div>Carregando...</div>;
  
    const getWineTypeName = (type: string | null) => {
      if (!type) return '-';
      switch (type) {
        case 'red': return 'Tinto';
        case 'white': return 'Branco';
        case 'rose': return 'Rosé';
        case 'sparkling': return 'Espumante';
        case 'dessert': return 'Sobremesa';
        default: return type;
      }
    };
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drinks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhum drink cadastrado
              </TableCell>
            </TableRow>
          ) : (
            drinks.map((drink) => (
              <TableRow key={drink.id}>
                <TableCell className="font-medium">{drink.name}</TableCell>
                <TableCell className="capitalize">{drink.category}</TableCell>
                <TableCell>
                  {drink.category === 'wine'
                    ? getWineTypeName(drink.wineType)
                    : '-'}
                </TableCell>
                <TableCell className="text-right">
                  R$ {drink.price.toFixed(2)}
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(drink.id as number)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(drink.id as number)}
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
};