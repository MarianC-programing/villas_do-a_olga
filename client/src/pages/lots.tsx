import { Phone, Mail, MessageCircle, MapPin, Clock, Zap, Droplet, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import lotsHeroImage from "@assets/generated_images/development_street_view.png";

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

      <section id="contacto" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Contacto
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para responder todas tus preguntas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">
                Información de Contacto
              </h3>

              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  data-testid={method.testId}
                >
                  <Card className="hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <method.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-muted-foreground mb-1">
                            {method.label}
                          </p>
                          <p className="font-semibold truncate">
                            {method.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Horario de Atención
                      </p>
                      <p className="font-semibold">Lunes a Viernes</p>
                      <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                      <p className="font-semibold mt-2">Sábados</p>
                      <p className="text-muted-foreground">10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <a
                href="https://www.google.com/maps/place/Villas+Do%C3%B1a+Olga/@8.976258,-79.7525055,17z/data=!3m1!4b1!4m6!3m5!1s0x8fac9f2b0a39d749:0xffd954a325ed142b!8m2!3d8.976258!4d-79.7525055!16s%2Fg%2F11vynjfl5d?hl=es-419&entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
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
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Ubicación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.123456789!2d-79.7525055!3d8.976258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fac9f2b0a39d749%3A0xffd954a325ed142b!2sVillas+Do%C3%B1a+Olga!5e0!3m2!1ses!2sus!4v1700000000!5m2!1ses!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Villas Doña Olga"
                    ></iframe>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Visítanos en Villas Doña Olga para conocer nuestros lotes disponibles.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
