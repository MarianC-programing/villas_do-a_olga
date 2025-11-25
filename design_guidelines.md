# Design Guidelines: Villas Doña Olga Real Estate Website

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern real estate platforms like Zillow, Redfin, and boutique property development sites that emphasize natural landscapes and residential tranquility. The design should convey exclusivity, trust, and connection to nature.

## Color Palette
Based on the provided logo:
- **Primary Green**: Deep forest green from logo (headers, CTAs, accents)
- **Earth Tones**: Warm browns and terracotta (secondary elements, borders)
- **Cream/Beige**: Light neutrals (backgrounds, cards)
- **White**: Clean backgrounds for contrast and readability
- Use green as primary action color, earth tones for supporting elements, cream/beige for section backgrounds

## Typography
- **Headings**: Modern serif or elegant sans-serif that conveys sophistication and stability (e.g., Playfair Display, Lora for titles)
- **Body Text**: Clean, highly readable sans-serif (e.g., Inter, Open Sans)
- **Hierarchy**: 
  - H1: 3xl-5xl (hero titles)
  - H2: 2xl-3xl (section headers)
  - H3: xl-2xl (subsections)
  - Body: base-lg

## Layout & Spacing
Use Tailwind spacing units: **4, 6, 8, 12, 16, 20** for consistency
- Section padding: py-16 to py-24 on desktop, py-12 on mobile
- Container max-width: max-w-7xl
- Card spacing: gap-6 to gap-8
- Generous whitespace to convey luxury and space

## Page Structure

### Homepage (index.html)

**Hero Section** (90vh):
- Full-width background image of countryside/villas landscape
- Overlay gradient (dark at bottom for text readability)
- Centered content with:
  - Main headline: "Construye tu Futuro en Villas Doña Olga"
  - Subheading: "Lotes Exclusivos con Financiamiento Directo"
  - Primary CTA button with blurred background: "Ver Lotes Ahora"
- Logo watermark or integrated into header

**"Nuestra Oferta" Section**:
- 3-column grid (stacks to 1 column on mobile)
- Icon cards with:
  - Icon at top (large, in primary green)
  - Bold title: "Precios Competitivos" / "Financiamiento Flexible" / "Servicios Incluidos"
  - Short description with key details ($60/m², 20% abono/$200 mes, Luz/Agua/Calle)
- Light cream background, white cards with subtle shadows

**"Plano General del Proyecto" Section**:
- White/neutral background
- Section title centered
- Large image placeholder for master plan/lot layout (show sold vs. available lots with legend)
- CTA button below: "Ver Disponibilidad Detallada"

**Final CTA Section**:
- Full-width with nature-inspired background image
- Centered messaging: invitation to contact
- "Contáctanos" button with blurred background

### Lots & Contact Page (lotes.html)

**Hero/Title Section** (smaller, 40vh):
- Background image
- Title: "Descubre tu Lote Ideal"

**Pricing & Financing Details Section**:
- 2-column layout (mobile stacks):
  - Left: Pricing breakdown in organized list
  - Right: Financing terms with visual emphasis on key numbers
- Use cards or bordered sections for clarity
- Highlight flexibility in lot sizes

**Services Information Section**:
- Icon-based presentation of included services
- Note about street development in subtle text

**Contact Section**:
- 2-column layout:
  - Left: Contact information cards with:
    - Phone number (tel: link, phone icon)
    - Email (mailto: link, email icon)  
    - WhatsApp (direct link, WhatsApp icon)
    - Business hours
  - Right: Simple contact form (Name, Email, Phone, Message) with note about backend requirement or use mailto fallback
- Optional: Embedded Google Maps below if address available

## Common Elements

**Header** (all pages):
- Fixed/sticky on scroll
- Logo left, navigation right (horizontal on desktop)
- Mobile: Hamburger menu
- Links: Inicio, Lotes Disponibles, Financiamiento, Contacto
- Semi-transparent background with blur when scrolled

**Footer**:
- 3-column layout (mobile stacks):
  - Logo and brief mission statement
  - Quick links navigation
  - Social media icons and contact info
- Copyright line at bottom
- Earth tone background

## Component Library

**Buttons**:
- Primary: Solid green, white text, rounded-lg, py-3 px-8, bold text
- Secondary: Outlined green border, green text
- Hero buttons: Add backdrop-blur-md and semi-transparent dark background
- All buttons have subtle hover lift and scale effects

**Cards**:
- White background, rounded-lg, shadow-md
- Padding: p-6 to p-8
- Hover: subtle shadow increase

**Icons**:
- Use Font Awesome or Heroicons via CDN
- Consistent size within sections (w-8 h-8 for feature icons, w-6 h-6 for utility)

**Forms**:
- Input fields: border-2, rounded-md, focus ring in primary green
- Labels above inputs, required fields marked with asterisk

## Images

**Required Images**:
1. **Hero Background** (Homepage): Wide landscape shot of countryside, villas, or natural scenery with homes - should evoke tranquility and aspiration
2. **Nuestra Oferta Icons**: House/property icon, handshake/financing icon, utilities/services icon
3. **Master Plan**: Architectural site plan showing lot divisions, sold/available status with legend
4. **CTA Section Background**: Another nature/property image (can be same as hero with different treatment)
5. **Lots Page Hero**: Smaller version of property/landscape imagery
6. **Logo**: Circular logo with "Villas Doña Olga" text and hillside houses illustration (provided)

All images should be optimized, use WebP format where possible, with fallbacks.

## Responsive Behavior
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid columns collapse to single column on mobile
- Hero text scales down appropriately
- Navigation converts to hamburger menu below md breakpoint
- Maintain generous spacing even on mobile (minimum py-8 for sections)

## Accessibility
- Semantic HTML5 tags throughout
- Alt text for all images describing visual content
- Proper heading hierarchy
- Sufficient color contrast ratios (WCAG AA minimum)
- Focus states on all interactive elements
- Tel/mailto links for easy mobile access