"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type DrinkFormValues = {
  name: string;
  description: string;
  price: number;
  category: string;
  wineType?: string;
  restaurantId: string;
};

export const DrinkForm = () => {
  const form = useForm<DrinkFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      wineType: "",
      restaurantId: "",
    },
  });

  const selectedCategory = form.watch("category");

  const onSubmit = (values: DrinkFormValues) => {
    // Validação manual
    const errors: Partial<Record<keyof DrinkFormValues, string>> = {};

    if (!values.name || values.name.trim().length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (values.price <= 0) {
      errors.price = "Preço deve ser maior que zero";
    }

    if (!values.category) {
      errors.category = "Selecione uma categoria";
    }

    if (!values.restaurantId) {
      errors.restaurantId = "Selecione um restaurante";
    }

    // Validação específica para vinhos
    if (values.category === "wine" && !values.wineType) {
      errors.wineType = "Selecione o tipo de vinho";
    }

    // Se houver erros, exibe eles
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        form.setError(field as keyof DrinkFormValues, {
          type: "manual",
          message: message as string,
        });
      });
      return;
    }

    // Se passar na validação, processa os dados
    console.log("Dados válidos:", values);
  };

  // Opções para os selects
  const categories = [
    { value: "wine", label: "Vinho" },
    { value: "beer", label: "Cerveja" },
    { value: "cocktail", label: "Coquetel" },
    { value: "non-alcoholic", label: "Sem álcool" },
  ];

  const wineTypes = [
    { value: "red", label: "Tinto" },
    { value: "white", label: "Branco" },
    { value: "rose", label: "Rosé" },
    { value: "sparkling", label: "Espumante" },
  ];

  const restaurants = [
    { id: "1", name: "Restaurante Principal" },
    { id: "2", name: "Restaurante Filial" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Drink</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      if (
                        e.target.value.length >= 2 ||
                        e.target.value.length === 0
                      ) {
                        form.clearErrors("name");
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="restaurantId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurante</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um restaurante" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {restaurants.map((restaurant) => (
                      <SelectItem key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      field.onChange(value);
                      if (value > 0) {
                        form.clearErrors("price");
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wineType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Vinho</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  disabled={selectedCategory !== "wine"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          selectedCategory === "wine"
                            ? "Selecione"
                            : "Não aplicável"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {wineTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Salvar Drink</Button>
      </form>
    </Form>
  );
};
