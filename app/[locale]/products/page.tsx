import { ProductsClient } from "./ProductsClient";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProductsPage" });
  return {
    title: t("title") || "Products",
    description: t("description") || "Explore our products.",
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; categoryId?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page, 10) : 1;
  const search = resolvedSearchParams.search || "";
  const categoryId = resolvedSearchParams.categoryId || "All Products";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      const response = await fetch(`${API_URL}/public/product?${params.toString()}`, {
        next: { revalidate: 60 },
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return null;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/public/category`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        return data.data.reduce((acc: any[], curr: any) => {
          if (!acc.find((item: any) => item.id === curr.id)) {
            acc.push(curr);
          }
          return acc;
        }, []);
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  };

  const [productsData, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  let totalPages = 1;
  let rawApiProducts: any[] = [];

  if (productsData?.status === "success" && Array.isArray(productsData.data)) {
    rawApiProducts = productsData.data.filter(
      (item: any) => item.id && item.isActive
    );
    totalPages = productsData.pagination?.pages || 1;
  }

  return (
    <ProductsClient
      initialProducts={rawApiProducts}
      initialCategories={categories}
      initialTotalPages={totalPages}
    />
  );
}
