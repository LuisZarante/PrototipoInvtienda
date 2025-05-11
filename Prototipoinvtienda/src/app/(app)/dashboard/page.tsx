import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

export default function DashboardPage() {
  // Dummy data - replace with actual data fetching
  const summaryData = {
    totalProducts: 125,
    totalUsers: 15,
    recentSalesCount: 5,
    totalRevenue: 1250.75,
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos Totales
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Productos registrados en el inventario
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios Registrados
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios con acceso al sistema
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Recientes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{summaryData.recentSalesCount}</div>
            <p className="text-xs text-muted-foreground">
              Ventas realizadas en las últimas 24 horas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryData.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Ingresos generados por ventas
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Add sections for recent sales table and key metrics charts later */}
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 mt-6">
         {/* Placeholder for Recent Sales Table */}
         <Card>
            <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
                <CardDescription>Últimas 5 ventas registradas.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Tabla de ventas recientes aparecerá aquí.</p>
                 {/* Implement Table component here */}
            </CardContent>
         </Card>

         {/* Placeholder for Key Metrics Chart */}
         {/* <Card>
            <CardHeader>
                <CardTitle>Métricas Clave</CardTitle>
                <CardDescription>Gráfico de rendimiento.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground">Gráfico de métricas clave aparecerá aquí.</p>
                 // Implement Chart component here
            </CardContent>
         </Card> */}
       </div>
    </div>
  );
}
