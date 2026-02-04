import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import lotsHeroImage from "@assets/generated_images/scene-construction-site-with-equipment.webp";

interface ProjectImage {
  id: number;
  url: string;
  title: string;
  description: string;
  date?: string;
}

export default function ProjectProgress() {
  const [images, setImages] = useState<ProjectImage[]>([
    {
      id: 1,
      url: "/Progress_img/fase inicial.webp",
      title: "Inicio de Construcción",
      description: "Preparación del terreno y cimientos principales",
      date: "Noviembre 2025",
    },
    {
      id: 2,
      url: "/Progress_img/Calle Noviembre 2025.webp",
      title: "Pavimentación de Calles",
      description: "Construcción de accesos principales",
      date: "18 Noviembre 2025",
    }, 
    {
      id: 3,
      url: "/Progress_img/Calle Diciembre 20265.webp",
      title: "Últimas actualizaciones",
      description: "Progreso reciente en diversas áreas del proyecto",
      date: "Diciembre 2024",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="min-h-screen">
      {/* Header */}
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
            Avance del Proyecto
          </h1>
          <p className="text-lg md:text-xl text-white/95">
            Síguenos en el desarrollo de Villas Doña Olga
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Gallery */}
          {images.length > 0 && (
            <Card className="overflow-hidden mb-12">
              <div className="relative bg-muted aspect-video flex items-center justify-center">
                <img
                  src={currentImage.url}
                  alt={currentImage.title}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur hover:bg-background/95"
                      onClick={handlePrevious}
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur hover:bg-background/95"
                      onClick={handleNext}
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`h-2 rounded-full transition-all ${
                            index === currentIndex
                              ? "w-8 bg-primary"
                              : "w-2 bg-white/50 hover:bg-white"
                          }`}
                          onClick={() => setCurrentIndex(index)}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Image Details */}
              <CardContent className="p-8">
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold">{currentImage.title}</h2>
                  {currentImage.date && (
                    <p className="text-sm text-muted-foreground">
                      {currentImage.date}
                    </p>
                  )}
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {currentImage.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline View */}
          {images.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-8">Galería de Fotos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <Card
                    key={image.id}
                    className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                      index === currentIndex ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      {image.date && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                          <p className="text-white text-xs">{image.date}</p>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {image.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {images.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                Aún no hay fotos del proyecto. ¡Sé el primero en agregar una!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
