
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

// Schema for editing - password is optional and only validated if provided
const userEditFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }).optional().or(z.literal('')), // Optional password
  confirmPassword: z.string().optional(),
  role: z.string().min(1, { message: "El rol es obligatorio." }),
}).refine((data) => {
    // Only validate passwords if a new password is being entered
    if (data.password) {
        return data.password === data.confirmPassword;
    }
    return true; // Skip validation if password fields are empty
}, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});


type UserEditFormValues = z.infer<typeof userEditFormSchema>;

const roles = ["Administrador", "Vendedor", "Invitado"];

// Simulate fetching a single user
const fetchUserById = async (id: string): Promise<Omit<UserEditFormValues, 'password' | 'confirmPassword'> | null> => {
    console.log("Fetching user with id:", id);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const user = users.find(u => u.id === id);
    if (user) {
        // Return only editable fields (no passwords)
        return {
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
    return null;
};

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const userId = params.id as string;

  const form = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditFormSchema),
    defaultValues: async () => {
        setIsFetching(true);
        const userData = await fetchUserById(userId);
        setIsFetching(false);
        if (userData) {
            return {
                ...userData,
                password: '', // Initialize password fields as empty
                confirmPassword: '',
            };
        } else {
            setUserNotFound(true);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Usuario no encontrado.",
            });
            router.replace('/users'); // Redirect if not found
            return { name: "", email: "", role: "", password: "", confirmPassword: "" }; // Return empty defaults
        }
    }
  });

  async function onSubmit(data: UserEditFormValues) {
    setIsLoading(true);
    // IMPORTANT: Handle password update logic securely on the backend.
    // Only send the password if it has been changed (i.e., data.password is not empty).
    const updateData: any = {
        name: data.name,
        email: data.email,
        role: data.role,
    };
    if (data.password) {
        // In a real app, you'd send the new password to the backend for hashing and saving.
        console.log("Updating password for user:", data.email); // Avoid logging the actual password
         updateData.password = data.password; // ONLY for simulation, DO NOT send plain text password
    }

    console.log("Updating user data:", updateData);


    // Simulate API call to update the user
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);

    toast({
      title: "Usuario Actualizado",
      description: `La información del usuario "${data.name}" ha sido actualizada.`,
    });
    router.push('/users'); // Redirect back to users list
  }

   if (userNotFound) {
        return (
             <div className="container mx-auto py-6 text-center">
                 <p className="text-destructive">Usuario no encontrado.</p>
                  <Button variant="outline" onClick={() => router.push('/users')} className="mt-4">
                   Volver a Usuarios
                 </Button>
             </div>
        );
    }

  return (
    <div className="container mx-auto py-6">
       <div className="flex items-center mb-6">
         <Button variant="outline" size="icon" className="mr-4" asChild>
           <Link href="/users">
             <ArrowLeft className="h-4 w-4" />
             <span className="sr-only">Volver a Usuarios</span>
           </Link>
         </Button>
         <h1 className="text-3xl font-bold">Editar Usuario</h1>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Usuario</CardTitle>
          <CardDescription>
            Modifica la información del usuario. Deja la contraseña en blanco para no cambiarla.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {isFetching ? (
                 <div className="space-y-6">
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-10 w-full" />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                     </div>
                      <Skeleton className="h-10 w-full" />
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
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Juan Pérez" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="usuario@ejemplo.com" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                 <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                           <SelectTrigger>
                            <SelectValue placeholder="Selecciona un rol" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h3 className="text-lg font-medium pt-4 border-t">Cambiar Contraseña (Opcional)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nueva Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Dejar en blanco para no cambiar" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirmar nueva contraseña" {...field} disabled={isLoading || !form.watch('password')} />
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
