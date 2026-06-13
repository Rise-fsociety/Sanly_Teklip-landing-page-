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
        src: "/kamil.webp",
        name: "Kamil Kargo",
        description:
            "Добро пожаловать в Kamil Kargo – вашего универсального логистического партнера! Управляйте своими грузоперевозками с легкостью, используя официальное мобильное приложение Kamil Kargo.",
        isInvertable: true,
        href: "https://play.google.com/store/apps/details?id=tm.com.sanlyteklip.kamilkargo",
    },
    {
        src: "/kargotm.webp",
        name: "Kargoo tm",
        description:
            "Kargoo — ваш незаменимый помощник в логистике! Мы объединяем множество транспортных компаний, чтобы предложить вам лучшие тарифы и услуги в одном месте.",
        isInvertable: true,
        icon: <DecorIcon position="bottom-left" />,
        href: "https://play.google.com/store/apps/details?id=tm.com.sanlyteklip.kargoo",
    },
    {
        src: "/yb.webp",
        name: "YBExpress",
        description:
            "Простое и удобное приложение для отслеживания посылок, отправляемых из Китая в Туркменистан. Просто введите номер отслеживания и следите за каждым шагом.",
        href: "https://play.google.com/store/apps/details?id=tm.com.st.ybexpress",
    },
    {
        src: "/warehouse.webp",
        name: "Kargoo Warehouse",
        description:
            "Организуйте свой грузовой центр как никогда раньше!С Kargoo ваши сотрудники смогут быстро создавать отправки, добавлять клиентские посылки и отслеживать всё от начала до конца.",
        isInvertable: true,
        href: "https://play.google.com/store/apps/details?id=tm.com.sanlyteklip.kargoo.wh",
    },
    {
        src: "/cashbox.webp",
        name: "Kargoo Cashbox",
        description:
            "Kargoo Cashbox — это современное мобильное приложение, разработанное для эффективного управления денежными операциями и финансовыми потоками вашего бизнеса.",
        href: "https://play.google.com/store/apps/details?id=tm.com.sanlyteklip.kgocashbox",
    },
    {
        src: "/umytly.webp",
        name: "Umytly Market",
        description:
            "Онлайн-рынок Umytly Market может быть полезен всем, кто хочет иметь остров, или болан, или харитларинызы, аматли бахадан саргит Эдип билерсиниз!",
        icon: <DecorIcon position="top-left" />,
        href: "https://play.google.com/store/apps/details?id=tm.com.hs.umytlymarket",
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