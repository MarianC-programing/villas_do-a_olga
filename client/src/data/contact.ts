/**
 * data/contact.ts
 * S2-P2: Fuente de verdad única para métodos de contacto y horario.
 * Antes estaba duplicado en lots.tsx y contact.tsx.
 */

export const CONTACT_METHODS = [
  {
    type: "phone" as const,
    label: "Teléfono",
    value: "+507 6325-9282",
    href: "tel:+50763259282",
    testId: "link-phone",
  },
  {
    type: "email" as const,
    label: "Correo Electrónico",
    value: "marianbarba1208@gmail.com",
    href: "mailto:marianbarba1208@gmail.com",
    testId: "link-email",
  },
  {
    type: "whatsapp" as const,
    label: "WhatsApp",
    value: "Enviar Mensaje",
    href: "https://wa.me/50763259282",
    testId: "link-whatsapp",
  },
] as const;

export const BUSINESS_HOURS = {
  weekdays: { label: "Lunes a Viernes", hours: "9:00 AM – 6:00 PM" },
  saturday: { label: "Sábados",         hours: "10:00 AM – 2:00 PM" },
} as const;

export const LOCATION = {
  name: "Villas Doña Olga",
  mapsUrl:
    "https://www.google.com/maps/place/Villas+Do%C3%B1a+Olga/@8.976258,-79.7525055,17z/data=!3m1!4b1!4m6!3m5!1s0x8fac9f2b0a39d749:0xffd954a325ed142b!8m2!3d8.976258!4d-79.7525055!16s%2Fg%2F11vynjfl5d",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.123456789!2d-79.7525055!3d8.976258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fac9f2b0a39d749%3A0xffd954a325ed142b!2sVillas+Do%C3%B1a+Olga!5e0!3m2!1ses!2sus!4v1700000000!5m2!1ses!2sus",
} as const;
