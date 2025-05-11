
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

// Update schema to include password and confirm password
const userFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio." }),
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "Confirma la contraseña." }),
  role: z.string().min(1, { message: "El rol es obligatorio." }),
  // status: z.string().min(1, { message: "El estado es obligatorio." }), // Status might be set automatically or later
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"], // Set the error on the confirm password field
});


type UserFormValues = z.infer<typeof userFormSchema>;

// Define available roles
const roles = ["Administrador", "Vendedor", "Invitado"];

export default function NewUserPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      // status: "Activo", // Default status
    },
  });

  async function onSubmit(data: UserFormValues) {
    setIsLoading(true);
    // **IMPORTANT:** In a real application, DO NOT log the password.
    // Here you would typically call a backend API or service (e.g., Firebase Auth)
    // to securely create the user with their email and password.
    // The password should never be stored in plain text.
    console.log("User data (excluding password for security):", {
        name: data.name,
        email: data.email,
        role: data.role,
    });
    console.log("Simulating user creation for email:", data.email);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
      title: "Usuario Creado",
      description: `El usuario "${data.name}" (${data.email}) ha sido registrado exitosamente.`,
    });
    router.push('/users'); // Redirect back to users list
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
         <h1 className="text-3xl font-bold">Registrar Nuevo Usuario</h1>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles del Usuario</CardTitle>
          <CardDescription>
            Completa la información del nuevo usuario y sus credenciales de acceso.
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" {...field} disabled={isLoading} />
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
                          <FormLabel>Confirmar Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>


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

              {/* Removed Status field - typically managed elsewhere */}

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                   Cancelar
                 </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creando..." : "Crear Usuario"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

