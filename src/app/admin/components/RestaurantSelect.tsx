// components/admin/RestaurantSelect.tsx
import { Restaurant } from "@/app/admin/types/admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RestaurantSelectProps {
  value: string;
  onChange: (value: string) => void;
  restaurants: Restaurant[];
  error?: string;
}

export const RestaurantSelect = ({
  value,
  onChange,
  restaurants,
  error,
}: RestaurantSelectProps) => {
  return (
    <div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={error ? "border-red-500" : ""}>
          <SelectValue placeholder="Selecione um restaurante" />
        </SelectTrigger>
        <SelectContent>
          {restaurants.map((restaurant) => (
            <SelectItem key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};