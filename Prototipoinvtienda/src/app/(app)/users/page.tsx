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
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

// Dummy data for users - replace with actual data fetching
const users = [
  {
    id: "user_1",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Administrador",
    status: "Activo",
  },
  {
    id: "user_2",
    name: "María García",
    email: "maria.garcia@example.com",
    role: "Vendedor",
     status: "Activo",
  },
  {
    id: "user_3",
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    role: "Vendedor",
     status: "Inactivo",
  },
   {
    id: "user_4",
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    role: "Invitado",
     status: "Activo",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <Button asChild>
          <Link href="/users/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Usuario
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            Gestiona los usuarios del sistema. Puedes añadir, editar o eliminar usuarios.
          </CardDescription>
           <div className="pt-4 relative">
              <Search className="absolute left-2.5 top-7 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar usuarios por nombre, email o rol..."
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
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                     <TableCell>
                       <Badge variant={user.status === 'Activo' ? 'default' : 'secondary'}>
                         {user.status}
                       </Badge>
                    </TableCell>
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
                            <Link href={`/users/edit/${user.id}`} className="w-full">Editar</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                 <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No se encontraron usuarios.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Mostrando <strong>{filteredUsers.length}</strong> de <strong>{users.length}</strong> usuarios
          </div>
           {/* Add pagination controls here if needed */}
        </CardFooter>
      </Card>
    </div>
  );
}
