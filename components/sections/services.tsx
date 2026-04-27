"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Lightbulb, 
  MonitorSmartphone,
  HandCoins
} from "lucide-react";
import { MagicCard } from "../ui/magic-card";

const services = [
  {
    title: "Web-saýt",
    description: "Döwrebap we tiz işleýän web-saýtlary we platformalary döredýäris.",
    icon: Globe,
  },
  {
    title: "Android",
    description: "Siziň biznesiňiz üçin ýokary hilli Android mobil goşundylaryny işläp düzýäris.",
    icon: Smartphone,
  },
  {
    title: "iOS",
    description: "iPhone we iPad ulanyjylary üçin iň oňat tejribeleri hödürleýän iOS goşundylary.",
    icon: MonitorSmartphone,
  },
  {
    title: "Kompýuter Hyzmatlary",
    description: "Tehniki goldaw, kompýuterleri sazlamak we programmalary gurnamak hyzmatlary.",
    icon: Cpu,
  },
  {
    title: "Akhasap",
    description: "Maliýe, dermanhana, kafe we işgärleri dolandyrmak ýaly amallary ýeňilleşdirýär.",
    icon: HandCoins,
  },
  {
    title: "IT Konsultasiýa",
    description: "Sanly dünýäde biznesiňizi ösdürmek üçin iň oňat IT maslahatlaryny berýäris.",
    icon: Lightbulb,
  },
];

export function Services() {
  return (
    <section id="services" className="md:py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            Hyzmatlarymyz
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-slate-600 font-medium">
            Biz siziň ideýalaryňyzy sanly dünýäde janlandyrmak üçin dürli görnüşli tehnologiki çözgütleri hödürleýäris.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <MagicCard
                className="h-full cursor-pointer flex-col items-start text-left"
                gradientColor="#3AB4FF"
                gradientFrom="#3AB4FF"
                gradientTo="#0157A4"
                gradientOpacity={1}
              >
                <div className="p-8 h-full flex flex-col items-center border-gray-200 border">
                  <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <service.icon className="w-8 h-8 text-slate-700 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-slate-900">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed text-center font-medium">
                    {service.description}
                  </p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}