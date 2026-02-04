import { useState } from "react";
import { useLocation } from "wouter";
import { MapPin, Maximize2, Home, DollarSign, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import lotsHeroImage from "@assets/generated_images/lotesdips.webp";
import { Badge } from "@/components/ui/badge";

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

  const lotsDetails: Lot[] = [
   
    // Disponibles (available)
    { id: "LRC12", number: "LR C12", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC21", number: "LR C21", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC13", number: "LR C13", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC14", number: "LR C14", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC15", number: "LR C15", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC16", number: "LR C16", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC19", number: "LR C19", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC20", number: "LR C20", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC28", number: "LR C28", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC35", number: "LR C35", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC33", number: "LR C33", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC29", number: "LR C29", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC32", number: "LR C32", area: 500, status: "available", price: 500 * 60 },
    { id: "LR17", number: "LR 17", area: 1705, status: "available", price: 1705 * 60 },
    { id: "LR42", number: "LR 42", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC43", number: "LR C43", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC44", number: "LR C44", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC45", number: "LR C45", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC46", number: "LR C46", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC47", number: "LR C47", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC48", number: "LR C48", area: 500, status: "available", price: 500 * 60 },
    { id: "LRC02", number: "LR C02", area: 1010, status: "available", price: 1010 * 60 },
    { id: "LRC03", number: "LR C03", area: 957, status: "available", price: 957 * 60 },
    { id: "LRC04", number: "LR C04", area: 887, status: "available", price: 887 * 60 },
    { id: "LRC05", number: "LR C05", area: 669, status: "available", price: 669 * 60 },
    { id: "LRC06", number: "LR C06", area: 530, status: "available", price: 530 * 60 },
    { id: "LRC07", number: "LR C07", area: 557, status: "available", price: 557 * 60 },
    { id: "LRC08", number: "LR C08", area: 628, status: "available", price: 628 * 60 },
    { id: "LRC09", number: "LR C09", area: 1202, status: "available", price: 1202 * 60 },
    // Reservados (reserved)
    { id: "LRC11", number: "LR C11", area: 500, status: "reserved", price: 500 * 60 },
    { id: "LRC22", number: "LR C22", area: 500, status: "reserved", price: 500 * 60 },
    { id: "LRC25", number: "LR C25", area: 500, status: "reserved", price: 500 * 60 },
    { id: "LRC27", number: "LR C27", area: 500, status: "reserved", price: 500 * 60 },
    { id: "LRC34", number: "LR C34", area: 500, status: "reserved", price: 500 * 60 },
    { id: "LRC18", number: "LR C18", area: 500, status: "reserved", price: 500 * 60 },
    { id: "LRC17", number: "LR C17", area: 500, status: "reserved", price: 500 * 60 },
    { id: "LRC30", number: "LR C30", area: 500, status: "reserved", price: 500 * 60 },
    { id: "LRC31", number: "LR C31", area: 500, status: "reserved", price: 500 * 60 },
     // No Disponibles (sold)
    { id: "LC01", number: "LC 01", area: 4963, status: "sold", price: 4963 * 60 },
    { id: "LC02", number: "LC 02", area: 2932, status: "sold", price: 2932 * 60 },
    { id: "LRC01", number: "LR C01", area: 1047, status: "sold", price: 1047 * 60 },
    { id: "LRC10", number: "LR C10", area: 500, status: "sold", price: 500 * 60 },
    { id: "LRC23", number: "LR C23", area: 500, status: "sold", price: 500 * 60 },
    { id: "LRC24", number: "LR C24", area: 500, status: "sold", price: 500 * 60 },
    { id: "LRC37", number: "LR C37", area: 500, status: "sold", price: 500 * 60 },
    { id: "LRC38", number: "LR C38", area: 1108, status: "sold", price: 1108 * 60 },
    { id: "LRC39", number: "LR C39", area: 989, status: "sold", price: 989 * 60 },
    { id: "LRC40", number: "LR C40", area: 500, status: "sold", price: 500 * 60 },
    { id: "LRC41", number: "LR C41", area: 500, status: "sold", price: 500 * 60 },
    { id: "LRC49", number: "LR C49", area: 2205, status: "sold", price: 2205 * 60 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "reserved":
        return "bg-red-100 text-red-800";
      case "sold":
        return "bg-gray-100 text-gray-800";
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
        return "No Disponible";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen">
      <section
        className="relative h-[40vh] min-h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${lotsHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Disponibilidad de Lotes
          </h1>
          <p className="text-lg md:text-xl text-white/95">
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
                        src="/Gemini_Generated_Image_91fpr591fpr591fp.webp"
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
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Reservado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-500 rounded"></div>
                    <span className="text-sm">No Disponible</span>
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
                      </div>

                      {lot.status === "available" && (
                        <Button
                          size="sm"
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavClick("/lotes#contacto");
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


        </div>
      </section>
    </div>
  );
}
