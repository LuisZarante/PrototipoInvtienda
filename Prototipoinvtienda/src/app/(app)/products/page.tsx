"use client";

import * as React from "react";
import { PlusCircle, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

// Dummy data for products - replace with actual data fetching
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

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Button asChild>
          <Link href="/products/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
          <CardDescription>
            Gestiona tus productos aquí. Puedes añadir, editar o eliminar productos.
          </CardDescription>
          <div className="pt-4 relative">
              <Search className="absolute left-2.5 top-7 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos por nombre o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full md:w-1/3"
              />
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">Descripción</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.description}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Alternar menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href={`/products/edit/${product.id}`} className="w-full">Editar</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron productos.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
          </div>
          {/* Add pagination controls here if needed */}
        </CardFooter>
      </Card>
    </div>
  );
}
