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
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Import Spanish locale

// Dummy data for sales - replace with actual data fetching
const sales = [
  {
    id: "sale_1",
    date: new Date(2024, 6, 20), // Month is 0-indexed (6 = July)
    customer: "Cliente Ejemplo 1",
    total: 195.50,
    items: [
      { productId: "prod_1", quantity: 1, price: 120.00 },
      { productId: "prod_2", quantity: 1, price: 75.50 },
    ],
     status: "Completado",
  },
  {
    id: "sale_2",
    date: new Date(2024, 6, 19),
    customer: "Cliente Ejemplo 2",
    total: 350.00,
    items: [{ productId: "prod_3", quantity: 1, price: 350.00 }],
     status: "Pendiente",
  },
   {
    id: "sale_3",
    date: new Date(2024, 6, 18),
    customer: "Cliente Ejemplo 3",
    total: 500.00,
    items: [{ productId: "prod_4", quantity: 2, price: 250.00 }],
     status: "Completado",
  },
];

export default function SalesPage() {
   const [searchTerm, setSearchTerm] = React.useState("");

   const filteredSales = sales.filter((sale) =>
     sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     format(sale.date, 'PPP', { locale: es }).toLowerCase().includes(searchTerm.toLowerCase())
   );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Ventas</h1>
        <Button asChild>
          <Link href="/sales/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Registrar Venta
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
          <CardDescription>
            Consulta y gestiona las ventas registradas.
          </CardDescription>
          <div className="pt-4 relative">
              <Search className="absolute left-2.5 top-7 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar ventas por ID, cliente o fecha..."
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
                <TableHead>ID Venta</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    {/* Format date using date-fns */}
                    <TableCell>{format(sale.date, 'PPP', { locale: es })}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>${sale.total.toFixed(2)}</TableCell>
                    <TableCell>{sale.status}</TableCell>
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
                              <Link href={`/sales/view/${sale.id}`} className="w-full">Ver Detalles</Link>
                          </DropdownMenuItem>
                          {/* Add Edit/Delete if applicable */}
                          {/* <DropdownMenuItem>Editar</DropdownMenuItem> */}
                          {/* <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                 <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron ventas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Mostrando <strong>{filteredSales.length}</strong> de <strong>{sales.length}</strong> ventas
          </div>
           {/* Add pagination controls here if needed */}
        </CardFooter>
      </Card>
    </div>
  );
}
