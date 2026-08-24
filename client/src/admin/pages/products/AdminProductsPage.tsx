import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import ProductFormModal from "./components/productEditor/ProductFormModal";
import ProductStats from "./components/ProductStats";
import ProductFilters from "./components/ProductFilters";
import ProductsTable from "./components/ProductsTable";

import { useProducts } from "../../../features/products/hooks/useProducts";
import { useCategories } from "../../../features/categories/hooks/useCategories";
import { useCreateProduct } from "../../../features/products/hooks/useCreateProduct";
import { useUpdateProduct } from "../../hooks/useAdminProductMutations";

import type { Product } from "../../../features/products/types/product";
import type { AdminProduct } from "./components/productEditor/types";

function AdminProductsPage() {
  /* ===================================== */
  /* MODAL STATE */
  /* ===================================== */

  const [isProductModalOpen, setIsProductModalOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [formMode, setFormMode] =
    useState<"create" | "edit">("create");

  /* ===================================== */
  /* FILTER STATE */
  /* ===================================== */

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  /* ===================================== */
  /* PRODUCTS */
  /* ===================================== */

  const {
    data,
    isLoading,
    isError,
    error,
  } = useProducts({
    page: 1,
    limit: 50,
    search: search || undefined,
    category: categoryFilter || undefined,
  });

  const products = useMemo(
    () => data?.data ?? [],
    [data?.data]
  );

  /* ===================================== */
  /* CATEGORIES */
  /* ===================================== */

  const {
    data: categories = [],
  } = useCategories();

  /* ===================================== */
  /* PRODUCT MUTATIONS */
  /* ===================================== */

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  /* ===================================== */
  /* FILTERED PRODUCTS */
  /* ===================================== */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!statusFilter) {
        return true;
      }

      if (statusFilter === "active") {
        return product.isActive === true;
      }

      if (statusFilter === "inactive") {
        return product.isActive === false;
      }

      if (statusFilter === "low-stock") {
        const threshold =
          (product as AdminProduct).lowStockThreshold ?? 5;

        return (
          product.stock > 0 &&
          product.stock <= threshold
        );
      }

      if (statusFilter === "out-of-stock") {
        return product.stock === 0;
      }

      return true;
    });
  }, [products, statusFilter]);

  /* ===================================== */
  /* STATISTICS */
  /* ===================================== */

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.isActive
  ).length;

  const lowStockProducts = products.filter((product) => {
    const threshold =
      (product as AdminProduct).lowStockThreshold ?? 5;

    return (
      product.stock > 0 &&
      product.stock <= threshold
    );
  }).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  /* ===================================== */
  /* ADD PRODUCT */
  /* ===================================== */

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormMode("create");
    setIsProductModalOpen(true);
  };

  /* ===================================== */
  /* VIEW PRODUCT */
  /* ===================================== */

  const handleViewProduct = (product: Product) => {
    console.log("View product:", product);
  };

  /* ===================================== */
  /* EDIT PRODUCT */
  /* ===================================== */

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormMode("edit");
    setIsProductModalOpen(true);
  };

  /* ===================================== */
  /* DELETE PRODUCT */
  /* ===================================== */

  const handleDeleteProduct = (product: Product) => {
    console.log("Delete product:", product);
  };

  /* ===================================== */
  /* CLOSE MODAL */
  /* ===================================== */

  const handleCloseModal = () => {
    if (
      createProductMutation.isPending ||
      updateProductMutation.isPending
    ) {
      return;
    }

    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  /* ===================================== */
  /* FORM SUBMIT */
  /* ===================================== */

  const handleFormSubmit = async (
    form: Partial<AdminProduct>,
    files: File[]
  ) => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      /*
       * Category can be:
       * - ObjectId string
       * - populated category object
       */
      if (key === "category") {
        if (
          typeof value === "object" &&
          value !== null &&
          "_id" in value
        ) {
          formData.append(
            "category",
            String(value._id)
          );
        } else if (value) {
          formData.append(
            "category",
            String(value)
          );
        }

        return;
      }

      /*
       * Arrays such as tags
       */
      if (Array.isArray(value)) {
        formData.append(
          key,
          JSON.stringify(value)
        );

        return;
      }

      formData.append(
        key,
        String(value)
      );
    });

    /*
     * Product images
     */
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      /* ===================================== */
      /* CREATE */
      /* ===================================== */

      if (formMode === "create") {
        await createProductMutation.mutateAsync(
          formData
        );
      }

      /* ===================================== */
      /* EDIT */
      /* ===================================== */

      else if (
        formMode === "edit" &&
        selectedProduct?._id
      ) {
        await updateProductMutation.mutateAsync({
          id: selectedProduct._id,
          data: formData,
        });
      }

      /* ===================================== */
      /* CLOSE AFTER SUCCESS */
      /* ===================================== */

      setIsProductModalOpen(false);
      setSelectedProduct(null);
    } catch {
      /*
       * React Query handles the mutation error.
       * Keep modal open so user can correct the form.
       */
    }
  };

  /* ===================================== */
  /* CLEAR FILTERS */
  /* ===================================== */

  const handleClearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStatusFilter("");
  };

  /* ===================================== */
  /* SUBMITTING STATE */
  /* ===================================== */

  const isSubmitting =
    createProductMutation.isPending ||
    updateProductMutation.isPending;

  /* ===================================== */
  /* RENDER */
  /* ===================================== */

  return (
    <div className="space-y-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage your store products and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-violet-500
          "
        >
          <FiPlus size={18} />
          Add Product
        </button>

      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}

      <ProductStats
        total={totalProducts}
        active={activeProducts}
        lowStock={lowStockProducts}
        outOfStock={outOfStockProducts}
      />

      {/* ===================================== */}
      {/* FILTERS */}
      {/* ===================================== */}

      <ProductFilters
        search={search}
        category={categoryFilter}
        status={statusFilter}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
        onClear={handleClearFilters}
      />

      {/* ===================================== */}
      {/* ERROR */}
      {/* ===================================== */}

      {isError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <p className="text-sm text-red-400">
            {error instanceof Error
              ? error.message
              : "Failed to load products."}
          </p>
        </div>
      )}

      {/* ===================================== */}
      {/* PRODUCTS TABLE */}
      {/* ===================================== */}

      {!isError && (
        <ProductsTable
          products={filteredProducts}
          isLoading={isLoading}
          onView={handleViewProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      )}

      {/* ===================================== */}
      {/* PRODUCT FORM MODAL */}
      {/* ===================================== */}

      <ProductFormModal
        isOpen={isProductModalOpen}
        mode={formMode}
        product={selectedProduct}
        categories={categories}
        isSubmitting={isSubmitting}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />

    </div>
  );
}

export default AdminProductsPage;