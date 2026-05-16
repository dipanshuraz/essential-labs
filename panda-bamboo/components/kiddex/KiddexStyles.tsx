import { KIDDEX_STYLES } from "@/lib/kiddex-styles";

export function KiddexStyles() {
  return (
    <>
      {KIDDEX_STYLES.map((href) => (
        <link key={href} href={href} rel="stylesheet" />
      ))}
    </>
  );
}
