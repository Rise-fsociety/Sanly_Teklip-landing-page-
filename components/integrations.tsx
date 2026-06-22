import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/decor-icon";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Integration = {
  src: string;
  name: string;
  descriptionKey: string; 
  isInvertable?: boolean;
  icon?: React.ReactNode;
  href: string;
};

export function Integrations() {
  const t = useTranslations("Integrations");

  const data: Integration[] = [
    {
      src: "/kamil.webp",
      name: "Kamil Kargo",
      descriptionKey: "kamilKargo",
      isInvertable: true,
      href: "https://play.google.com/store/apps/details?id=tm.com.sanlyteklip.kamilkargo",
    },
    {
      src: "/kargotm.webp",
      name: "Kargoo tm",
      descriptionKey: "kargooTm",
      isInvertable: true,
      icon: <DecorIcon position="bottom-left" />,
      href: "https://play.google.com/store/apps/details?id=tm.com.sanlyteklip.kargoo",
    },
    {
      src: "/yb.webp",
      name: "YBExpress",
      descriptionKey: "ybExpress",
      href: "https://play.google.com/store/apps/details?id=tm.com.st.ybexpress",
    },
    {
      src: "/warehouse.webp",
      name: "Kargoo Warehouse",
      descriptionKey: "kargooWarehouse",
      isInvertable: true,
      href: "https://play.google.com/store/apps/details?id=tm.com.sanlyteklip.kargoo.wh",
    },
    {
      src: "/cashbox.webp",
      name: "Kargoo Cashbox",
      descriptionKey: "kargooCashbox",
      href: "https://play.google.com/store/apps/details?id=tm.com.sanlyteklip.kgocashbox",
    },
    {
      src: "/umytly.webp",
      name: "Umytly Market",
      descriptionKey: "umytlyMarket",
      icon: <DecorIcon position="top-left" />,
      href: "https://play.google.com/store/apps/details?id=tm.com.hs.umytlymarket",
    },
  ];

  return (
    <div className="relative mx-auto border">
      <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-3">
        {data.map((item) => (
          <IntegrationCard integration={item} key={item.name}>
            {item.icon}
          </IntegrationCard>
        ))}
      </div>
      <DecorIcon position="top-left" />
      <DecorIcon position="top-right" />
      <DecorIcon position="bottom-left" />
      <DecorIcon position="bottom-right" />
    </div>
  );
}

function IntegrationCard({
  integration,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  integration: Integration;
}) {
  const t = useTranslations("Integrations");

  return (
    <Link
      href={integration.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col items-start gap-4 bg-blue-200 p-4 text-start md:p-6 md:even:bg-blue-50/20 hover:bg-blue-300 transition-colors duration-200 cursor-pointer",
        className,
      )}
      {...props}>
      <Image
        alt={integration.name}
        className={cn(
          "pointer-events-none size-8 xl:size-15 border-2 select-none object-contain",
        )}
        height={32}
        src={integration.src}
        width={82}
      />
      <div className="space-y-1 w-full min-w-0">
        <h3 className="font-bold text-slate-950 text-lg md:text-xl 2xl:text-2xl tracking-tight">
          {integration.name}
        </h3>
        <p className="text-slate-600 font-normal text-sm md:text-base 2xl:text-lg leading-relaxed truncate md:line-clamp-none md:whitespace-normal">
          {t(integration.descriptionKey)}
        </p>
      </div>
      {children}
    </Link>
  );
}
