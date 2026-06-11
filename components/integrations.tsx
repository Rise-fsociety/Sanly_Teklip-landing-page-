import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/decor-icon";
import { Link } from "@/i18n/navigation";

type Integration = {
    src: string;
    name: string;
    description: string;
    isInvertable?: boolean;
    icon?: React.ReactNode;
    href: string; // Absolute destination URL
};

const data: Integration[] = [
    {
        src: "https://storage.efferd.com/logo/vercel.svg",
        name: "Vercel",
        description:
            "Amet praesentium deserunt ex commodi tempore fuga voluptatem....",
        isInvertable: true,
        href: "https://vercel.com",
    },
    {
        src: "https://storage.efferd.com/logo/openai.svg",
        name: "OpenAI",
        description:
            "Amet praesentium deserunt ex commodi tempore fuga voluptatem....",
        isInvertable: true,
        icon: <DecorIcon position="bottom-left" />,
        href: "https://openai.com",
    },
    {
        src: "https://storage.efferd.com/logo/supabase.svg",
        name: "Supabase",
        description:
            "Amet praesentium deserunt ex commodi tempore fuga voluptatem....",
        href: "https://supabase.com",
    },
    {
        src: "https://storage.efferd.com/logo/github.svg",
        name: "GitHub",
        description:
            "Amet praesentium deserunt ex commodi tempore fuga voluptatem....",
        isInvertable: true,
        href: "https://github.com",
    },
    {
        src: "https://storage.efferd.com/logo/notion.svg",
        name: "Notion",
        description:
            "Amet praesentium deserunt ex commodi tempore fuga voluptatem....",
        href: "https://notion.so",
    },
    {
        src: "https://storage.efferd.com/logo/gmail.svg",
        name: "Gmail",
        description:
            "Amet praesentium deserunt ex commodi tempore fuga voluptatem....",
        icon: <DecorIcon position="top-left" />,
        href: "https://mail.google.com",
    },
];

export function Integrations() {
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
    return (
        <Link
            href={integration.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative flex flex-col items-start gap-4 bg-blue-200 p-4 text-start md:p-6 md:even:bg-blue-50/20 hover:bg-blue-300 transition-colors duration-200 cursor-pointer",
                className
            )}
            {...props}
        >
            <img
                alt={integration.name}
                className={cn(
                    "pointer-events-none size-8 shrink-0 select-none object-contain",
                    integration.isInvertable && "dark:invert"
                )}
                height={32}
                src={integration.src}
                width={32}
            />
            <div className="space-y-1">
                {/* Fully responsive and readable typography values */}
                <h3 className="font-bold text-slate-950 text-lg md:text-xl 2xl:text-2xl tracking-tight">
                    {integration.name}
                </h3>
                <p className="text-slate-600 font-normal text-sm md:text-base 2xl:text-lg leading-relaxed">
                    {integration.description}
                </p>
            </div>
            {children}
        </Link>
    );
}