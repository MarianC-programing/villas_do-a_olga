/**
 * pages/lots.tsx — Precios, financiamiento y servicios.
 *
 * S2-U2: eliminada la sección "Contacto" duplicada — el usuario ya tiene /contacto.
 * S2-U3: sección de contacto rápido usa ContactForm en lugar de links sueltos.
 * S2-P2: datos de contacto importados de data/contact.ts (DRY).
 */

import { Zap, Droplet, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import lotsHeroImage from "@assets/generated_images/development_street_view.png";

const PRICING_DETAILS = [
  { label: "Precio por m²",         value: "$60 USD"       },
  { label: "Tamaño mínimo",         value: "500 m²"        },
  { label: "Precio Total (500 m²)", value: "$30,000 USD"   },
  { label: "Abono Inicial (20%)",   value: "$6,000 USD"    },
  { label: "Saldo a Financiar",     value: "$24,000 USD"   },
  { label: "Cuota Mensual Fija",    value: "$200 USD"      },
  { label: "Tasa de Interés",       value: "6% Fijo Anual" },
] as const;

const SERVICES = [
  { icon: Zap,        label: "Luz Eléctrica",    description: "Instalación disponible"  },
  { icon: Droplet,    label: "Agua Potable",      description: "Servicio garantizado"    },
  { icon: Navigation, label: "Calle Pavimentada", description: "En desarrollo"           },
] as const;

export default function Lots() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[40vh] min-h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${lotsHeroImage})`,
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

      {/* Precios y Financiamiento */}
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
            {/* Tabla de precios */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">Detalles de Precio</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {PRICING_DETAILS.map((detail, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b last:border-0"
                      data-testid={`pricing-${index}`}
                    >
                      <span className="text-muted-foreground">{detail.label}</span>
                      <span className="font-semibold text-lg">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Servicios */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">Servicios Incluidos</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {SERVICES.map((service, index) => (
                    <div key={index} className="flex items-start gap-4" data-testid={`service-${index}`}>
                      <service.icon className="w-10 h-10 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{service.label}</h4>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Los lotes tienen tamaños flexibles desde 500 m².
                    Consulta disponibilidad específica.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plan de financiamiento detallado */}
          <div className="mt-8">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">Plan de Financiamiento Flexible</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm">
                <p>
                  Ofrecemos un plan de pagos directo con el propietario, diseñado para facilitar su compra.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Cálculo Base (lote de 500 m²):</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Precio Total:</strong> $30,000 USD</li>
                    <li><strong>Abono Inicial (20%):</strong> $6,000 USD</li>
                    <li><strong>Saldo a Financiar:</strong> $24,000 USD</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Condiciones:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Tasa de Interés Anual:</strong> 6% Fijo (Financiamiento Directo)</li>
                    <li><strong>Cuota Mensual Fija:</strong> $200 USD</li>
                    <li><strong>Plazo:</strong> Determinado según saldo restante y cuota mensual</li>
                  </ul>
                </div>
                <p className="italic text-muted-foreground">
                  Con un abono de $6,000 USD y $200 USD/mes, aseguras tu terreno hoy mismo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacto rápido — S2-U3: usa ContactForm en lugar de links duplicados */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              ¿Listo para reservar tu lote?
            </h2>
            <p className="text-lg text-muted-foreground">
              Escríbenos directamente y te respondemos a la brevedad.
            </p>
          </div>
          <ContactForm title="Consulta aquí" />
        </div>
      </section>
    </div>
  );
}
