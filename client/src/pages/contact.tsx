/**
 * pages/contact.tsx
 *
 * Página de contacto independiente — fix B1: antes /contacto usaba el mismo
 * componente que /lotes, lo cual era un bug de routing semántico.
 *
 * Contiene:
 *   - Hero section
 *   - ContactForm funcional (conectado a POST /api/contact)
 *   - Métodos de contacto directos (teléfono, email, WhatsApp)
 *   - Mapa de ubicación
 *   - Horario de atención
 */

import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import lotsHeroImage from "@assets/generated_images/development_street_view.png";

const CONTACT_METHODS = [
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

export default function Contact() {
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
            Contáctanos
          </h1>
          <p className="text-lg md:text-xl text-white/95">
            Estamos aquí para responder todas tus preguntas
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

            {/* Columna izquierda — info de contacto */}
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold">Información de Contacto</h2>

              {CONTACT_METHODS.map((method) => (
                <a
                  key={method.testId}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-testid={method.testId}
                >
                  <Card className="hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <method.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground mb-1">{method.label}</p>
                          <p className="font-semibold truncate">{method.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}

              {/* Horario */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Horario de Atención</p>
                      <p className="font-semibold">Lunes a Viernes</p>
                      <p className="text-muted-foreground">9:00 AM – 6:00 PM</p>
                      <p className="font-semibold mt-2">Sábados</p>
                      <p className="text-muted-foreground">10:00 AM – 2:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mapa */}
              <a
                href="https://www.google.com/maps/place/Villas+Do%C3%B1a+Olga/@8.976258,-79.7525055,17z"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-location"
              >
                <Card className="hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
                        <p className="font-semibold">Villas Doña Olga</p>
                        <p className="text-muted-foreground">Ver en Google Maps</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* Iframe del mapa */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Ubicación en el mapa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full rounded-md overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.123456789!2d-79.7525055!3d8.976258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fac9f2b0a39d749%3A0xffd954a325ed142b!2sVillas+Do%C3%B1a+Olga!5e0!3m2!1ses!2sus!4v1700000000!5m2!1ses!2sus"
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

            {/* Columna derecha — formulario funcional */}
            {/* fix B2: formulario conectado a POST /api/contact */}
            <div>
              <ContactForm title="Envíanos un Mensaje" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
