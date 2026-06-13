import { useNavigation } from "@/hooks/use-navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { handleNavClick } = useNavigation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Pagina no encontrada</h2>
        <p className="text-muted-foreground max-w-md">
          La pagina que buscas no existe o fue movida.
        </p>
        <Button onClick={() => handleNavClick("/")}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
