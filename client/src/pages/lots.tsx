import { Phone, Mail, MessageCircle, MapPin, Clock, Zap, Droplet, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import lotsHeroImage from "@assets/generated_images/development_street_view.png";
import lotsImage from "@assets/lotesdips.avif";

export default function Lots() {

  const pricingDetails = [
    { label: "Precio por m²", value: "$60 USD" },
    { label: "Tamaño mínimo", value: "500 m²" },
    { label: "Precio Total (500 m²)", value: "$30,000 USD" },
    { label: "Abono Inicial (20%)", value: "$6,000 USD" },
    { label: "Saldo a Financiar", value: "$24,000 USD" },
    { label: "Cuota Mensual Fija", value: "$200 USD" },
    { label: "Tasa de Interés", value: "6% Fijo (Anual)" },
  ];

  const services = [
    { icon: Zap, label: "Luz Eléctrica", description: "Instalación disponible" },
    { icon: Droplet, label: "Agua Potable", description: "Servicio garantizado" },
    { icon: Navigation, label: "Calle Pavimentada", description: "En desarrollo" },
  ];

  const contactMethods = [
    {
      icon: Phone,
      label: "Teléfono",
      value: "+507 6325-9282",
      href: "tel:+50763259282",
      testId: "link-phone",
    },
    {
      icon: Mail,
      label: "Correo Electrónico",
      value: "marianbarba1208@gmail.com",
      href: "mailto:marianbarba1208@gmail.com",
      testId: "link-email",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Enviar Mensaje",
      href: "https://wa.me/50763259282",
      testId: "link-whatsapp",
    },
  ];

  return (
    <div className="min-h-screen">
      <section
        className="relative h-[40vh] min-h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${lotsHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Descubre tu Lote Ideal
          </h1>
          <p className="text-lg md:text-xl text-white/95">
            Información detallada sobre precios, financiamiento y servicios
          </p>
        </div>
      </section>

      <section id="financiamiento" className="py-16 md:py-24 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Precios y Financiamiento
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Planes flexibles diseñados para hacer realidad tu inversión
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">Detalles de Precio</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {pricingDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b last:border-0"
                      data-testid={`pricing-${index}`}
                    >
                      <span className="text-muted-foreground">
                        {detail.label}
                      </span>
                      <span className="font-semibold text-lg">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">Servicios Incluidos</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                      data-testid={`service-${index}`}
                    >
                      <div className="flex-shrink-0">
                        <service.icon className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">
                          {service.label}
                        </h4>
                        <p className="text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Los lotes tienen tamaños flexibles
                    desde 500m². Consulta disponibilidad específica.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financing Plan Full Width Card */}
          <div className="mt-8">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">Plan de Financiamiento Flexible</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <p>
                    Ofrecemos un plan de pagos directo con el propietario, diseñado para facilitar su compra.
                  </p>

                  <h4 className="font-semibold">Cálculo Base (para un Lote de 500 m²):</h4>
                  <ul className="list-disc list-inside">
                    <li><strong>Precio Total:</strong> $30,000 USD</li>
                    <li><strong>Abono Inicial (20% del total):</strong> <strong>$6,000 USD</strong></li>
                    <li><strong>Saldo a Financiar:</strong> $24,000 USD</li>
                  </ul>

                  <h4 className="font-semibold">Condiciones del Financiamiento:</h4>
                  <ul className="list-disc list-inside">
                    <li><strong>Tasa de Interés Anual:</strong> <strong>6% Fijo</strong> (Financiamiento Directo)</li>
                    <li><strong>Cuota Mensual Fija:</strong> <strong>$200 USD</strong> (Aplicable hasta liquidar los intereses, abonando luego directamente a capital e intereses restantes).</li>
                    <li><strong>Plazo:</strong> El plazo total será determinado por el tiempo que tome cubrir el saldo restante con la cuota mensual mínima y el interés anual del 6%.</li>
                  </ul>

                  <p className="italic">
                    Ejemplo: Con un abono inicial de $6,000 USD y una cuota fija de $200 USD/mes, usted asegura su terreno hoy mismo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      <section
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${lotsImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Lotes Disponibles
          </h2>
          <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto">
            Explora nuestros terrenos exclusivos y encuentra el perfecto para ti
          </p>
        </div>
      </section>
    </div>
  );
}
