import { useLocation } from "wouter";

/**
 * useNavigation — hook compartido para navegación con soporte de anclas (#hash).
 *
 * Reemplaza la función handleNavClick que estaba duplicada en:
 *   - client/src/pages/home.tsx
 *   - client/src/components/header.tsx
 *   - client/src/components/footer.tsx
 *
 * fix Q1: eliminar duplicación de lógica de navegación (DRY)
 */
export function useNavigation() {
  const [location, navigate] = useLocation();

  const handleNavClick = (path: string) => {
    if (path.includes("#")) {
      const [route, hash] = path.split("#");
      if (location !== route) {
        navigate(route);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  /**
   * Versión para usar en event handlers de React (e.g. onClick de <Button>)
   * que reciben un MouseEvent como primer argumento.
   */
  const handleNavClickEvent = (
    e: React.MouseEvent,
    path: string,
    onNavigate?: () => void,
  ) => {
    e.preventDefault();
    onNavigate?.();
    handleNavClick(path);
  };

  return { handleNavClick, handleNavClickEvent, location, navigate };
}
