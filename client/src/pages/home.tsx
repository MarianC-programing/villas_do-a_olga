import { useLocation } from "wouter";
import { DollarSign, Handshake, Lightbulb, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/countryside_villas_hero_background.png";
import ctaImage from "@assets/generated_images/community_aerial_view_background.png";

export default function Home() {
  const [, navigate] = useLocation();

  const handleNavClick = (path: string) => {
    if (path.includes("#")) {
      const [route, hash] = path.split("#");
      navigate(route);
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(path);
    }
  };
  const benefits = [
    {
      icon: DollarSign,
      title: "Precios Competitivos",
      description: "$60 por metro cuadrado. Lotes desde 500m² con un precio mínimo de $30,000.",
      highlight: "$60/m²",
    },
    {
      icon: Handshake,
      title: "Financiamiento Flexible",
      description: "20% de abono inicial ($6,000) y $200 mensuales con solo 6% de interés anual.",
      highlight: "$200/mes",
    },
    {
      icon: Lightbulb,
      title: "Servicios Incluidos",
      description: "Luz eléctrica, agua potable y acceso por calle pavimentada en desarrollo.",
      highlight: "Luz • Agua • Calle",
    },
  ];

  return (
    <div className="min-h-screen">
      <section
        className="relative h-[90vh] min-h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Construye tu Futuro en Villas Doña Olga
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-8 font-light">
            Lotes Exclusivos con Financiamiento Directo
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-primary/90 hover:bg-primary backdrop-blur-sm border border-primary-border"
            onClick={() => handleNavClick("/disponibilidad")}
            data-testid="button-ver-lotes"
          >
            Ver Lotes Ahora
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Nuestra Oferta
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre las ventajas de invertir en tu propio terreno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-elevate transition-all duration-300"
                data-testid={`card-benefit-${index}`}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold">
                      {benefit.title}
                    </h3>
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                      {benefit.highlight}
                    </p>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Plano General del Proyecto
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Visualiza la distribución de lotes y encuentra el espacio perfecto
              para tu hogar
            </p>
          </div>

          <div className="bg-muted rounded-lg p-8 md:p-12 flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-border">
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <Map className="w-16 h-16 text-primary" />
              </div>
              <p className="text-xl font-semibold">
                Plano del Proyecto Disponible
              </p>
              <p className="text-muted-foreground max-w-md">
                Consulta la disponibilidad actualizada de lotes y sus
                características específicas
              </p>
              <Button
                size="lg"
                variant="default"
                className="mt-4"
                onClick={() => handleNavClick("/disponibilidad")}
                data-testid="button-ver-disponibilidad"
              >
                Ver Disponibilidad Detallada
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-24 md:py-32 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${ctaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
            ¿Listo para Invertir en tu Futuro?
          </h2>
          <p className="text-lg md:text-xl text-white/95 mb-8">
            Nuestro equipo está listo para ayudarte a encontrar el lote perfecto
            y guiarte en el proceso de financiamiento.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-primary/90 hover:bg-primary backdrop-blur-sm border border-primary-border"
            onClick={() => handleNavClick("/lotes")}
            data-testid="button-contactanos"
          >
            Contáctanos
          </Button>
        </div>
      </section>
    </div>
  );
}
