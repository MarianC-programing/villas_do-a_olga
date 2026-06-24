import { Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONTACT_METHODS } from "@/data/contact";

const ICON_MAP = {
  phone:    Phone,
  email:    Mail,
  whatsapp: MessageCircle,
};

// Readonly props — inmutables por contrato (SonarCloud S6534)
interface ContactFormProps {
  readonly preselectedLot?: string;
  readonly title?: string;
}

export function ContactForm({ preselectedLot, title = "Contáctanos" }: ContactFormProps) {
  const whatsappMessage = preselectedLot
    ? `Hola, estoy interesado en el Lote ${preselectedLot} de Villas Doña Olga.`
    : "Hola, me gustaría obtener información sobre los lotes de Villas Doña Olga.";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {preselectedLot && (
          <p className="text-sm text-muted-foreground mt-1">
            Consultando sobre:{" "}
            <span className="font-semibold text-primary">Lote {preselectedLot}</span>
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Elige tu método preferido para comunicarte con nosotros:
        </p>

        {CONTACT_METHODS.map((method) => {
          const Icon = ICON_MAP[method.type];
          const href = method.type === "whatsapp"
            ? `${method.href}?text=${encodeURIComponent(whatsappMessage)}`
            : method.href;

          return (
            <a
              key={method.testId}
              href={href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-testid={method.testId}
              className="block"
            >
              <Button variant="outline" className="w-full justify-start gap-3 h-14">
                <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">{method.label}</p>
                  <p className="text-xs text-muted-foreground">{method.value}</p>
                </div>
              </Button>
            </a>
          );
        })}
      </CardContent>
    </Card>
  );
}
