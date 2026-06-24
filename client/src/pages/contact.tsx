import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { CONTACT_METHODS, BUSINESS_HOURS, LOCATION } from "@/data/contact";

// globalThis en lugar de window — ES2020, compatible SSR (SonarCloud S6421)
function useQueryParam(key: string): string | null {
  if (typeof globalThis.window === "undefined") return null;
  return new URLSearchParams(globalThis.window.location.search).get(key);
}

const ICON_MAP = { phone: Phone, email: Mail, whatsapp: MessageCircle };

export default function Contact() {
  const preselectedLot = useQueryParam("lote");

  return (
    <div className="min-h-screen">
      <section
        className="relative h-[40vh] min-h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(/pogrss.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Contáctanos
          </h1>
          <p className="text-lg md:text-xl text-white/95">
            Estamos aquí para responder todas tus preguntas
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">Información de Contacto</h2>

              {CONTACT_METHODS.map((method) => {
                const Icon = ICON_MAP[method.type];
                return (
                  <a
                    key={method.testId}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-testid={method.testId}
                  >
                    <Card className="hover-elevate transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-muted-foreground mb-1">{method.label}</p>
                            <p className="font-semibold truncate">{method.value}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Horario de Atención</p>
                      <p className="font-semibold">{BUSINESS_HOURS.weekdays.label}</p>
                      <p className="text-muted-foreground">{BUSINESS_HOURS.weekdays.hours}</p>
                      <p className="font-semibold mt-2">{BUSINESS_HOURS.saturday.label}</p>
                      <p className="text-muted-foreground">{BUSINESS_HOURS.saturday.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <a href={LOCATION.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid="link-location">
                <Card className="hover-elevate transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
                        <p className="font-semibold">{LOCATION.name}</p>
                        <p className="text-muted-foreground">Ver en Google Maps</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ubicación en el mapa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full rounded-md overflow-hidden">
                    <iframe
                      src={LOCATION.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Villas Doña Olga en Google Maps"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <ContactForm
                title="Contáctanos"
                preselectedLot={preselectedLot ?? undefined}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
