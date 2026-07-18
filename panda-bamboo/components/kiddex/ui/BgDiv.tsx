import type { CSSProperties, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  image: string;
};

/** Div with Kiddex-style background-image inline style. */
export function BgDiv({ image, style, className, ...rest }: Props) {
  const bg: CSSProperties = {
    backgroundImage: `url(${image})`,
    ...style,
  };
  return <div className={className} style={bg} {...rest} />;
}
