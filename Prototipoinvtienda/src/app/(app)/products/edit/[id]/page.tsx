
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, useParams } from 'next/navigation';
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
import { ArrowLeft, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Dummy data - replace with actual data fetching later
const products = [
  {
    id: "prod_1",
    name: "Laptop Pro",
    description: "Laptop de alto rendimiento",
    price: 1200.00,
    stock: 50,
    category: "Electrónicos",
  },
  {
    id: "prod_2",
    name: "Teclado Mecánico",
    description: "Teclado con switches azules",
    price: 75.50,
    stock: 120,
    category: "Accesorios",
  },
  {
    id: "prod_3",
    name: "Monitor Curvo 27\"",
    description: "Monitor QHD 144Hz",
    price: 350.00,
    stock: 30,
    category: "Electrónicos",
  },
   {
    id: "prod_4",
    name: "Silla Gamer Ergonómica",
    description: "Silla cómoda para largas sesiones",
    price: 250.00,
    stock: 15,
    category: "Muebles",
  },
];


const productFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  description: z.string().optional(),
  price: z.coerce.number().positive({ message: "El precio debe ser un número positivo." }),
  stock: z.coerce.number().int().nonnegative({ message: "La cantidad debe ser un número entero no negativo." }),
  category: z.string().min(1, { message: "La categoría es obligatoria." }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// Simulate fetching a single product
const fetchProductById = async (id: string): Promise<ProductFormValues | null> => {
    console.log("Fetching product with id:", id);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const product = products.find(p => p.id === id);
    if (product) {
        // Map to form values (if necessary, types might differ)
        return {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
        };
    }
    return null;
};


export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const [productNotFound, setProductNotFound] = React.useState(false);

  const productId = params.id as string;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: async () => {
        setIsFetching(true);
        const productData = await fetchProductById(productId);
        setIsFetching(false);
        if (productData) {
            return productData;
        } else {
            setProductNotFound(true);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Producto no encontrado.",
            });
            router.replace('/products'); // Redirect if not found
            return { name: "", description: "", price: 0, stock: 0, category: "" }; // Return empty defaults
        }
    }
  });

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true);
    console.log("Updating product data:", data);
    // Simulate API call to update the product
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    toast({
      title: "Producto Actualizado",
      description: `El producto "${data.name}" ha sido actualizado exitosamente.`,
    });
    router.push('/products'); // Redirect back to products list
  }

   if (productNotFound) {
        return (
             <div className="container mx-auto py-6 text-center">
                 <p className="text-destructive">Producto no encontrado.</p>
                  <Button variant="outline" onClick={() => router.push('/products')} className="mt-4">
                   Volver a Productos
                 </Button>
             </div>
        );
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
         <h1 className="text-3xl font-bold">Editar Producto</h1>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Producto</CardTitle>
          <CardDescription>
            Modifica la información del producto existente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isFetching ? (
             <div className="space-y-6">
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-20 w-full" />
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                 </div>
                  <div className="flex justify-end gap-2 pt-4">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-32" />
                  </div>
             </div>
           ) : (
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
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </Form>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
