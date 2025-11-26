import { useState } from "react";
import { MapPin, Maximize2, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Client } from "@neondatabase/serverless";

interface Lot {
  id: string;
  number: string;
  area: number;
  status: "available" | "reserved" | "sold";
  price: number;
  description?: string;
}

export default function Availability() {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [zoomedIn, setZoomedIn] = useState(false);

  const lotsDetails: Lot[] = [
    {
      id: "A1",
      number: "A1",
      area: 500,
      status: "available",
      price: 1765,
      description: "Esquina principal, excelente acceso",
    },
    {
      id: "A2",
      number: "A2",
      area: 600,
      status: "available",
      price: 2118,
      description: "Frente a calle principal",
    },
    {
      id: "A3",
      number: "A3",
      area: 550,
      status: "reserved",
      price: 1933,
      description: "En proceso de compra",
    },
    {
      id: "A4",
      number: "A4",
      area: 700,
      status: "available",
      price: 2471,
      description: "Lote grande con buena orientación",
    },
    {
      id: "A5",
      number: "A5",
      area: 500,
      status: "sold",
      price: 1765,
      description: "Vendido",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "reserved":
        return "Reservado";
      case "sold":
        return "Vendido";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-primary/10">
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            Disponibilidad de Lotes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Visualiza el plano y consulta los detalles de cada lote
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Plan Section */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Plano del Proyecto
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className={`relative bg-muted ${zoomedIn ? "p-4 overflow-auto max-h-[600px]" : ""}`}>
                    <div className="relative">
                      <img
                        src="/PlanoFinal.jpg"
                        alt="Plano general del proyecto Villas Doña Olga"
                        className={`w-full h-auto border transition-transform ${
                          zoomedIn ? "scale-150" : "scale-100"
                        }`}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-4 right-4 bg-background/95 backdrop-blur"
                        onClick={() => setZoomedIn(!zoomedIn)}
                        aria-label="Zoom plano"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-1 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Detalles de Lotes</h2>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Reservado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Vendido</span>
                  </div>
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto space-y-3">
                {lotsDetails.map((lot) => (
                  <Card
                    key={lot.id}
                    className={`cursor-pointer transition-all ${
                      selectedLot?.id === lot.id
                        ? "ring-2 ring-primary"
                        : "hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedLot(lot)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">Lote {lot.number}</h3>
                        <Badge className={getStatusColor(lot.status)}>
                          {getStatusLabel(lot.status)}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Maximize2 className="w-4 h-4" />
                          <span>{lot.area} m²</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-semibold">
                          <DollarSign className="w-4 h-4" />
                          <span>${lot.price.toLocaleString()} USD</span>
                        </div>
                        {lot.description && (
                          <p className="text-muted-foreground text-xs mt-2">
                            {lot.description}
                          </p>
                        )}
                      </div>

                      {lot.status === "available" && (
                        <Button
                          size="sm"
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to contact form with pre-filled lot info
                            const contactSection = document.getElementById(
                              "contacto"
                            );
                            if (contactSection) {
                              contactSection.scrollIntoView({
                                behavior: "smooth",
                              });
                            }
                          }}
                        >
                          Interesado
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="mt-16">
            <h2 className="text-3xl font-semibold mb-8">
              Características del Proyecto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Maximize2,
                  label: "Área Mínima",
                  value: "500 m²",
                },
                {
                  icon: DollarSign,
                  label: "Precio por m²",
                  value: "$3.50 USD",
                },
                {
                  icon: Home,
                  label: "Servicios",
                  value: "Luz • Agua • Calle",
                },
                {
                  icon: MapPin,
                  label: "Total de Lotes",
                  value: "+40 lotes",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {feature.label}
                    </p>
                    <p className="text-xl font-semibold">{feature.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
