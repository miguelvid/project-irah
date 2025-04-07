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

type MenuFormValues = {
  name: string;
  price: number;
};

export const MenuForm = () => {
  const form = useForm<MenuFormValues>({
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = (values: MenuFormValues) => {
    // Validação manual antes de submeter
    if (!values.name || values.name.trim().length < 2) {
      form.setError("name", {
        type: "manual",
        message: "Nome deve ter pelo menos 2 caracteres",
      });
      return;
    }

    if (values.price <= 0) {
      form.setError("price", {
        type: "manual",
        message: "Preço deve ser maior que zero",
      });
      return;
    }

    console.log(values); // Dados válidos
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Menu</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    // Validação em tempo real (opcional)
                    if (
                      e.target.value.length < 2 &&
                      e.target.value.length > 0
                    ) {
                      form.setError("name", {
                        type: "manual",
                        message: "Nome muito curto",
                      });
                    } else {
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    field.onChange(value);
                    // Validação em tempo real (opcional)
                    if (value <= 0) {
                      form.setError("price", {
                        type: "manual",
                        message: "Preço inválido",
                      });
                    } else {
                      form.clearErrors("price");
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
};
