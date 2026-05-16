import { cn } from "../cn";
import { Heading } from "./Heading";
import { Text } from "./Text";

export function SectionTitle({
  title,
  highlight,
  subtitle,
  centered,
  className,
}: {
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-10", centered && "text-center", className)}>
      <Heading as="h2" highlight={highlight}>
        {title}
      </Heading>
      {subtitle ? (
        <Text muted className={cn("mt-3 max-w-2xl", centered && "mx-auto")}>
          {subtitle}
        </Text>
      ) : null}
    </div>
  );
}
