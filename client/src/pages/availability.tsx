import { useState, useMemo } from "react";
import { MapPin, Maximize2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import lotsHeroImage from "/lotesdips.avif";
import { LOTS, type Lot, type LotStatus } from "@/data/lots";
// fix Q1: usar hook compartido en lugar de useLocation + handleNavClick duplicado
import { useNavigation } from "@/hooks/use-navigation";

// ── Helpers de UI ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<LotStatus, { label: string; badgeClass: string; dotClass: string }> = {
  available: { label: "Disponible",     badgeClass: "bg-green-100 text-green-800", dotClass: "bg-green-500" },
  reserved:  { label: "Reservado",      badgeClass: "bg-red-100 text-red-800",     dotClass: "bg-red-500"   },
  sold:      { label: "No Disponible",  badgeClass: "bg-gray-100 text-gray-800",   dotClass: "bg-gray-500"  },
};

type FilterStatus = LotStatus | "all";

const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: "all",       label: "Todos"          },
  { value: "available", label: "Disponibles"    },
  { value: "reserved",  label: "Reservados"     },
  { value: "sold",      label: "No Disponibles" },
];

// ── Componente ───────────────────────────────────────────────────────────────

export default function Availability() {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [zoomedIn, setZoomedIn]       = useState(false);
  const [filter, setFilter]           = useState<FilterStatus>("all");

  // fix Q1: hook compartido — elimina el handleNavClick duplicado local
  const { handleNavClickEvent } = useNavigation();

  // fix Q2: datos vienen del archivo de datos, no del componente
  const filteredLots = useMemo(
    () => filter === "all" ? LOTS : LOTS.filter((l) => l.status === filter),
    [filter],
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[40vh] min-h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${lotsHeroImage})`,
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

      {/* Main */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Plano */}
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
                    <img
                      src="/Gemini_Generated_Image_91fpr591fpr591fp.jpeg"
                      alt="Plano general del proyecto Villas Doña Olga"
                      width={1200}
                      height={900}
                      className={`w-full h-auto border transition-transform ${zoomedIn ? "scale-150" : "scale-100"}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-4 right-4 bg-background/95 backdrop-blur"
                      onClick={() => setZoomedIn(!zoomedIn)}
                      aria-label={zoomedIn ? "Reducir plano" : "Ampliar plano"}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de lotes */}
            <div className="lg:col-span-1 space-y-4">
              {/* Leyenda */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Detalles de Lotes</h2>
                <div className="flex flex-wrap gap-3 mb-4">
                  {(Object.entries(STATUS_CONFIG) as [LotStatus, typeof STATUS_CONFIG[LotStatus]][]).map(
                    ([status, cfg]) => (
                      <div key={status} className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-full ${cfg.dotClass}`} />
                        <span className="text-sm">{cfg.label}</span>
                      </div>
                    ),
                  )}
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtrar lotes por estado">
                  {FILTER_OPTIONS.map((opt) => (
                    <Button
                      key={opt.value}
                      size="sm"
                      variant={filter === opt.value ? "default" : "outline"}
                      onClick={() => setFilter(opt.value)}
                      data-testid={`filter-${opt.value}`}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  Mostrando {filteredLots.length} de {LOTS.length} lotes
                </p>
              </div>

              {/* Cards de lotes */}
              <div className="max-h-[600px] overflow-y-auto space-y-3 pr-1">
                {filteredLots.map((lot) => {
                  const cfg = STATUS_CONFIG[lot.status];
                  return (
                    <Card
                      key={lot.id}
                      className={`cursor-pointer transition-all ${
                        selectedLot?.id === lot.id ? "ring-2 ring-primary" : "hover:shadow-lg"
                      }`}
                      onClick={() => setSelectedLot(lot)}
                      data-testid={`lot-card-${lot.id}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">Lote {lot.number}</h3>
                          <Badge className={cfg.badgeClass}>{cfg.label}</Badge>
                        </div>

                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Maximize2 className="w-4 h-4" />
                            <span>{lot.area.toLocaleString()} m²</span>
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
                            data-testid={`btn-interested-${lot.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavClickEvent(e, "/contacto");
                            }}
                          >
                            Interesado
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
