/**
 * components/contact-form.tsx
 *
 * Formulario de contacto conectado a POST /api/message.
 * Endpoint renombrado de /api/contact para evitar bloqueo de ad-blockers.
 * S2-U1: acepta preselectedLot para pre-llenar el mensaje.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { API } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().email("Ingresa un correo electronico valido"),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]*$/, "Solo se permiten numeros y caracteres +()-")
    .max(20)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "Maximo 1000 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

async function submitMessage(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  const response = await fetch(API.message, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.message ?? "Error al enviar el mensaje");
  return json;
}

interface ContactFormProps {
  preselectedLot?: string;
  title?: string;
}

export function ContactForm({ preselectedLot, title = "Envianos un Mensaje" }: ContactFormProps) {
  const { toast } = useToast();

  const defaultMessage = preselectedLot
    ? `Hola, estoy interesado en el Lote ${preselectedLot}. Podrian darme mas informacion sobre precio y disponibilidad?`
    : "";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { message: defaultMessage },
  });

  const messageLength = watch("message")?.length ?? 0;

  const mutation = useMutation({
    mutationFn: submitMessage,
    onSuccess: (data) => {
      toast({ title: "Mensaje enviado!", description: data.message });
      reset();
    },
    onError: (error: Error) => {
      toast({ title: "Error al enviar", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate({ ...data, phone: data.phone || undefined });
  };

  const inputClass = (hasError: boolean) =>
    `flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm
     ring-offset-background placeholder:text-muted-foreground
     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
     disabled:cursor-not-allowed disabled:opacity-50
     ${hasError ? "border-destructive" : "border-input"}`;

  return (
    <Card data-testid="contact-form-card">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {preselectedLot && (
          <p className="text-sm text-muted-foreground mt-1">
            Consultando sobre: <span className="font-semibold text-primary">Lote {preselectedLot}</span>
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" data-testid="contact-form">

          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-sm font-medium">
              Nombre completo <span className="text-destructive">*</span>
            </label>
            <input id="contact-name" type="text" autoComplete="name"
              placeholder="Ej: Maria Gonzalez" data-testid="input-name"
              className={inputClass(!!errors.name)} {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive" role="alert" data-testid="error-name">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-sm font-medium">
              Correo electronico <span className="text-destructive">*</span>
            </label>
            <input id="contact-email" type="email" autoComplete="email"
              placeholder="tu@correo.com" data-testid="input-email"
              className={inputClass(!!errors.email)} {...register("email")} />
            {errors.email && (
              <p className="text-xs text-destructive" role="alert" data-testid="error-email">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-phone" className="text-sm font-medium">
              Telefono <span className="text-muted-foreground font-normal">(opcional)</span>
            </label>
            <input id="contact-phone" type="tel" autoComplete="tel"
              placeholder="+507 6000-0000" data-testid="input-phone"
              className={inputClass(!!errors.phone)} {...register("phone")} />
            {errors.phone && (
              <p className="text-xs text-destructive" role="alert" data-testid="error-phone">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="text-sm font-medium">
              Mensaje <span className="text-destructive">*</span>
            </label>
            <textarea id="contact-message" rows={5}
              placeholder="En que lote estas interesado? Tienes preguntas sobre financiamiento?"
              data-testid="input-message"
              className={`flex w-full rounded-md border bg-background px-3 py-2 text-sm
                ring-offset-background placeholder:text-muted-foreground
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                disabled:cursor-not-allowed disabled:opacity-50 resize-none
                ${errors.message ? "border-destructive" : "border-input"}`}
              {...register("message")} />
            <div className="flex justify-between items-start">
              {errors.message
                ? <p className="text-xs text-destructive" role="alert" data-testid="error-message">{errors.message.message}</p>
                : <span />
              }
              <span className={`text-xs tabular-nums ${messageLength > 950 ? "text-destructive" : "text-muted-foreground"}`}>
                {messageLength}/1000
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="btn-submit-contact">
            {mutation.isPending
              ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando...</>
              : <><Send className="mr-2 h-4 w-4" />Enviar Mensaje</>
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
