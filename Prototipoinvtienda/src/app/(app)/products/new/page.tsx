"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const productFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  description: z.string().optional(),
  price: z.coerce.number().positive({ message: "El precio debe ser un número positivo." }),
  stock: z.coerce.number().int().nonnegative({ message: "La cantidad debe ser un número entero no negativo." }),
  category: z.string().min(1, { message: "La categoría es obligatoria." }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true);
    console.log("Product data:", data);
    // Simulate API call to save the product
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    toast({
      title: "Producto Creado",
      description: `El producto "${data.name}" ha sido registrado exitosamente.`,
    });
    router.push('/products'); // Redirect back to products list
  }

  return (
    <div className="container mx-auto py-6">
       <div className="flex items-center mb-6">
         <Button variant="outline" size="icon" className="mr-4" asChild>
           <Link href="/products">
             <ArrowLeft className="h-4 w-4" />
             <span className="sr-only">Volver a Productos</span>
           </Link>
         </Button>
         <h1 className="text-3xl font-bold">Registrar Nuevo Producto</h1>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Producto</CardTitle>
          <CardDescription>
            Completa la información del nuevo producto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Camiseta Azul" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe brevemente el producto..."
                        className="resize-none"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad en Stock</FormLabel>
                        <FormControl>
                          <Input type="number" step="1" placeholder="0" {...field} disabled={isLoading} />
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
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Ropa, Electrónicos" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                   Cancelar
                 </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar Producto"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
