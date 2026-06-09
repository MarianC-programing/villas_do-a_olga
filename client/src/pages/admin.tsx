/**
 * pages/admin.tsx
 *
 * Panel de administracion para ver los mensajes del formulario de contacto.
 * Protegido por ADMIN_TOKEN — solo accesible con el token correcto.
 *
 * Ruta: /admin (agregada en App.tsx)
 * Acceso: /admin?token=TU_ADMIN_TOKEN
 *
 * Por que query param y no login form:
 *   - El sitio no tiene sistema de usuarios para admins
 *   - El token en la URL es suficiente para uso interno/personal
 *   - Se puede mejorar a Basic Auth en el futuro si escala
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, MessageSquare, Calendar, ShieldAlert } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data?: ContactSubmission[];
  count?: number;
  message?: string;
}

function useQueryParam(key: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(key);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("es-PA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Admin() {
  const token = useQueryParam("token");
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Token requerido. Accede con /admin?token=TU_ADMIN_TOKEN");
      setLoading(false);
      return;
    }

    fetch("/api/contact-submissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json() as Promise<ApiResponse>)
      .then((data) => {
        if (!data.success) throw new Error(data.message ?? "Error desconocido");
        setSubmissions(data.data ?? []);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-destructive">
          <CardContent className="p-6 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive mb-1">Acceso denegado</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Panel de Mensajes</h1>
            <p className="text-muted-foreground mt-1">Villas Dona Olga — Formulario de Contacto</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {submissions.length} mensaje{submissions.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Aun no hay mensajes de contacto.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <Card key={sub.id} className="overflow-hidden">
                <CardHeader className="pb-3 bg-muted/30">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg">{sub.name}</CardTitle>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(sub.createdAt)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${sub.email}`}
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {sub.email}
                    </a>
                    {sub.phone && (
                      <a
                        href={`tel:${sub.phone}`}
                        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        {sub.phone}
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-5">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
