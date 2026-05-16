import { cn } from "../cn";
import { Container } from "./Container";

export function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
