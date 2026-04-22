"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Product } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

const products: Product[] = [
  {
    id: "1",
    name: "Akar ERP System",
    price: 1200,
    image: "/Akar.png",
    description: "Enterprise resource planning solution for modern businesses.",
  },
  {
    id: "2",
    name: "Akhasap Cloud",
    price: 450,
    image: "/Akhasap.png",
    description: "Secure and scalable cloud accounting software.",
  },
  {
    id: "3",
    name: "Archalyk Security",
    price: 800,
    image: "/Archalyk.webp",
    description: "Advanced cybersecurity suite for enterprise protection.",
  },
  {
    id: "4",
    name: "Gosha Chynar Network",
    price: 1500,
    image: "/GoshaChynar.png",
    description: "High-performance networking hardware and software.",
  },
];

export function Products() {

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent"
            >
              Premium IT Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Discover our cutting-edge software and hardware solutions designed to accelerate your digital transformation.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" className="rounded-full px-8 h-12 border-primary/20 hover:bg-primary/5">
              View All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted/30 border border-border/50 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/5">
                {/* Product Image */}
                <div className="absolute inset-0 p-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>

                {/* View Details Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-background/90 to-transparent">
                  <Button 
                    className="w-full rounded-2xl h-12 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    View Details
                  </Button>
                </div>
              </div>

              <div className="mt-6 px-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-primary">
                    ${product.price}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
