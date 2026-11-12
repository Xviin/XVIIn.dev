import { site } from "@/content/site";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className}`}>
      {site.links.map((l) => {
        const disabled = l.url === "#";
        return (
          <li key={l.id}>
            <a
              href={disabled ? undefined : l.url}
              aria-disabled={disabled || undefined}
              target={disabled || l.id === "email" ? undefined : "_blank"}
              rel={disabled ? undefined : "noopener noreferrer"}
              className={disabled ? "text-muted/60 cursor-default" : "text-muted hover:text-fg"}
            >
              {l.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
