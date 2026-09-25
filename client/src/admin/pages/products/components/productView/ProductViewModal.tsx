import React from "react";
import type { Product } from "../../../../../shared/types/product";

interface ProductViewModalProps {
  isOpen: boolean;
  product: Product | null;
  isLoading?: boolean;
  onClose: () => void;
}

function ProductViewModal({
  isOpen,
  product,
  isLoading = false,
  onClose,
}: ProductViewModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-lg font-semibold text-white">
              Product Details
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              View complete product information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            ×
          </button>
        </div>

        {/* CONTENT */}

        <div className="overflow-y-auto p-6">
          {isLoading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-gray-400">
                Loading product...
              </p>
            </div>
          )}

          {!isLoading && !product && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-red-400">
                Product could not be loaded.
              </p>
            </div>
          )}

          {!isLoading && product && (
            <div className="space-y-8">

              {/* ================================= */}
              {/* TOP SECTION */}
              {/* ================================= */}

              <div className="grid gap-6 lg:grid-cols-2">

                {/* IMAGES */}

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-white">
                    Product Images
                  </h3>

                  {product.images?.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {product.images.map(
                        (image, index) => (
                          <div
                            key={
                              image.publicId ??
                              index
                            }
                            className="
                              aspect-square
                              overflow-hidden
                              rounded-xl
                              border
                              border-white/10
                              bg-slate-900
                            "
                          >
                            <img
                              src={image.url}
                              alt={
                                product.title
                              }
                              className="
                                h-full
                                w-full
                                object-cover
                              "
                            />
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div
                      className="
                        flex
                        aspect-square
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-slate-900
                        text-sm
                        text-gray-500
                      "
                    >
                      No images
                    </div>
                  )}
                </div>

                {/* BASIC INFO */}

                <div className="space-y-5">

                  <div>
                    <p className="text-xs text-gray-500">
                      Title
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                      {product.title}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <InfoItem
                      label="Brand"
                      value={
                        product.brand ||
                        "—"
                      }
                    />

                    <InfoItem
                      label="SKU"
                      value={
                        product.sku ||
                        "—"
                      }
                    />

                    <InfoItem
                      label="Price"
                      value={`₹${product.price}`}
                    />

                    <InfoItem
                      label="Sale Price"
                      value={
                        product.salePrice
                          ? `₹${product.salePrice}`
                          : "—"
                      }
                    />

                    <InfoItem
                      label="Stock"
                      value={String(
                        product.stock
                      )}
                    />

                    <InfoItem
                      label="Status"
                      value={
                        product.isActive
                          ? "Active"
                          : "Inactive"
                      }
                    />

                  </div>
                </div>
              </div>

              {/* ================================= */}
              {/* DESCRIPTION */}
              {/* ================================= */}

              <section>
                <SectionTitle>
                  Description
                </SectionTitle>

                <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">

                  {product.shortDescription && (
                    <div>
                      <p className="text-xs text-gray-500">
                        Short Description
                      </p>

                      <p className="mt-1 text-sm text-gray-300">
                        {
                          product.shortDescription
                        }
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500">
                      Full Description
                    </p>

                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-300">
                      {product.description ||
                        "No description available."}
                    </p>
                  </div>

                </div>
              </section>

              {/* ================================= */}
              {/* INVENTORY */}
              {/* ================================= */}

              <section>
                <SectionTitle>
                  Inventory
                </SectionTitle>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                  <InfoCard
                    label="Stock"
                    value={String(
                      product.stock
                    )}
                  />

                  <InfoCard
                    label="Low Stock Threshold"
                    value={String(
                      product.lowStockThreshold ??
                        5
                    )}
                  />

                  <InfoCard
                    label="Track Inventory"
                    value={
                      product.trackInventory
                        ? "Yes"
                        : "No"
                    }
                  />

                  <InfoCard
                    label="Backorder"
                    value={
                      product.allowBackorder
                        ? "Allowed"
                        : "Not Allowed"
                    }
                  />

                </div>
              </section>

              {/* ================================= */}
              {/* SHIPPING */}
              {/* ================================= */}

              <section>
                <SectionTitle>
                  Shipping
                </SectionTitle>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                  <InfoCard
                    label="Weight"
                    value={
                      product.weight
                        ? `${product.weight}`
                        : "—"
                    }
                  />

                  <InfoCard
                    label="Length"
                    value={
                      product.length
                        ? `${product.length}`
                        : "—"
                    }
                  />

                  <InfoCard
                    label="Width"
                    value={
                      product.width
                        ? `${product.width}`
                        : "—"
                    }
                  />

                  <InfoCard
                    label="Height"
                    value={
                      product.height
                        ? `${product.height}`
                        : "—"
                    }
                  />

                </div>
              </section>

              {/* ================================= */}
              {/* SETTINGS */}
              {/* ================================= */}

              <section>
                <SectionTitle>
                  Product Settings
                </SectionTitle>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                  <InfoCard
                    label="Featured"
                    value={
                      product.isFeatured
                        ? "Yes"
                        : "No"
                    }
                  />

                  <InfoCard
                    label="Returnable"
                    value={
                      product.returnable
                        ? "Yes"
                        : "No"
                    }
                  />

                  <InfoCard
                    label="COD"
                    value={
                      product.codAvailable
                        ? "Available"
                        : "Unavailable"
                    }
                  />

                  <InfoCard
                    label="Digital Product"
                    value={
                      product.isDigital
                        ? "Yes"
                        : "No"
                    }
                  />

                </div>
              </section>

              {/* ================================= */}
              {/* COMPLIANCE */}
              {/* ================================= */}

              <section>
                <SectionTitle>
                  Compliance
                </SectionTitle>

                <div className="grid gap-4 md:grid-cols-3">

                  <InfoCard
                    label="HSN Code"
                    value={
                      product.hsnCode ||
                      "—"
                    }
                  />

                  <InfoCard
                    label="GST Rate"
                    value={
                      product.gstRate !==
                      undefined
                        ? `${product.gstRate}%`
                        : "—"
                    }
                  />

                  <InfoCard
                    label="GST Included"
                    value={
                      product.gstIncluded
                        ? "Yes"
                        : "No"
                    }
                  />

                </div>
              </section>

            </div>
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            shrink-0
            justify-end
            border-t
            border-white/10
            px-6
            py-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-white/10
              px-5
              py-2.5
              text-sm
              font-medium
              text-gray-300
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   SMALL COMPONENTS
========================================= */

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-200">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: InfoItemProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-white/10
        bg-white/[0.02]
        p-4
      "
    >
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-200">
        {value}
      </p>
    </div>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-3 text-sm font-semibold text-white">
      {children}
    </h3>
  );
}

export default ProductViewModal;