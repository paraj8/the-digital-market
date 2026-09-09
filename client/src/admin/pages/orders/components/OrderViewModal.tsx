import {
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  Calendar,
  Tag,
  FileText,
} from "lucide-react";

import { useAdminOrder } from "../../../hooks/useAdminOrder";

interface OrderViewModalProps {
  isOpen: boolean;
  orderId: string | null;
  onClose: () => void;
}

function OrderViewModal({
  isOpen,
  orderId,
  onClose,
}: OrderViewModalProps) {
  const {
    order,
    loading,
    error,
  } = useAdminOrder(orderId);

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
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
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
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-xl font-semibold text-white">
              Order Details
            </h2>

            {order && (
              <p className="mt-1 text-xs text-gray-500">
                Order ID: {order._id}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
            "
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================
            CONTENT
        ===================================== */}

        <div className="flex-1 overflow-y-auto p-6">

          {/* LOADING */}

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-gray-400">
                Loading order details...
              </p>
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-red-400">
                  Failed to load order details.
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    mt-4
                    rounded-lg
                    border
                    border-white/10
                    px-4
                    py-2
                    text-sm
                    text-gray-300
                    hover:bg-white/5
                  "
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ORDER */}

          {!loading &&
            !error &&
            order && (
              <div className="space-y-6">

                {/* =====================================
                    ORDER META
                ===================================== */}

                <div
                  className="
                    grid
                    gap-4
                    md:grid-cols-4
                  "
                >
                  <div
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-900/60
                      p-4
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Calendar
                        size={16}
                        className="text-violet-400"
                      />

                      <span className="text-xs text-gray-500">
                        Ordered
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-200">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-900/60
                      p-4
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Package
                        size={16}
                        className="text-violet-400"
                      />

                      <span className="text-xs text-gray-500">
                        Order Status
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-medium capitalize text-gray-200">
                      {order.orderStatus}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-900/60
                      p-4
                    "
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard
                        size={16}
                        className="text-violet-400"
                      />

                      <span className="text-xs text-gray-500">
                        Payment
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-medium capitalize text-gray-200">
                      {order.paymentStatus}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-slate-900/60
                      p-4
                    "
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard
                        size={16}
                        className="text-violet-400"
                      />

                      <span className="text-xs text-gray-500">
                        Payment Method
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-200">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* =====================================
                    PRODUCTS
                ===================================== */}

                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <Package
                      size={18}
                      className="text-violet-400"
                    />

                    <h3 className="font-semibold text-white">
                      Products
                    </h3>
                  </div>

                  <div
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/10
                    "
                  >
                    {order.items.map(
                      (item, index) => (
                        <div
                          key={`${item.product}-${index}`}
                          className="
                            flex
                            gap-4
                            border-b
                            border-white/10
                            p-4
                            last:border-b-0
                          "
                        >
                          {/* IMAGE */}

                          <div
                            className="
                              h-20
                              w-20
                              shrink-0
                              overflow-hidden
                              rounded-lg
                              border
                              border-white/10
                              bg-slate-900
                            "
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                "
                              />
                            ) : (
                              <div
                                className="
                                  flex
                                  h-full
                                  w-full
                                  items-center
                                  justify-center
                                  text-xs
                                  text-gray-600
                                "
                              >
                                No Image
                              </div>
                            )}
                          </div>

                          {/* INFO */}

                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-gray-200">
                              {item.title}
                            </h4>

                            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
                              <span>
                                Price: ₹
                                {item.price.toLocaleString(
                                  "en-IN"
                                )}
                              </span>

                              <span>
                                Quantity:{" "}
                                {item.quantity}
                              </span>
                            </div>
                          </div>

                          {/* SUBTOTAL */}

                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              Subtotal
                            </p>

                            <p className="mt-1 font-semibold text-gray-200">
                              ₹
                              {item.subtotal.toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </section>

                {/* =====================================
                    CUSTOMER + SHIPPING
                ===================================== */}

                <div className="grid gap-6 lg:grid-cols-2">

                  {/* CUSTOMER */}

                  <section>
                    <div className="mb-3 flex items-center gap-2">
                      <User
                        size={18}
                        className="text-violet-400"
                      />

                      <h3 className="font-semibold text-white">
                        Customer
                      </h3>
                    </div>

                    <div
                      className="
                        rounded-xl
                        border
                        border-white/10
                        bg-slate-900/60
                        p-5
                      "
                    >
                      <p className="font-medium text-gray-200">
                        {order.user.fullName}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.user.email}
                      </p>
                    </div>
                  </section>

                  {/* SHIPPING */}

                  <section>
                    <div className="mb-3 flex items-center gap-2">
                      <MapPin
                        size={18}
                        className="text-violet-400"
                      />

                      <h3 className="font-semibold text-white">
                        Shipping Address
                      </h3>
                    </div>

                    <div
                      className="
                        rounded-xl
                        border
                        border-white/10
                        bg-slate-900/60
                        p-5
                        text-sm
                        leading-6
                        text-gray-400
                      "
                    >
                      <p className="font-medium text-gray-200">
                        {order.shippingAddress.fullName}
                      </p>

                      <p>
                        {order.shippingAddress.phone}
                      </p>

                      <p className="mt-2">
                        {order.shippingAddress.addressLine1}
                      </p>

                      {order.shippingAddress.addressLine2 && (
                        <p>
                          {order.shippingAddress.addressLine2}
                        </p>
                      )}

                      {order.shippingAddress.landmark && (
                        <p>
                          Landmark:{" "}
                          {order.shippingAddress.landmark}
                        </p>
                      )}

                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </p>

                      <p>
                        {order.shippingAddress.country} -{" "}
                        {order.shippingAddress.postalCode}
                      </p>

                      <p className="mt-2 capitalize text-gray-500">
                        {order.shippingAddress.addressType}
                      </p>
                    </div>
                  </section>
                </div>

                {/* =====================================
                    BOTTOM DETAILS
                ===================================== */}

                <div className="grid gap-6 lg:grid-cols-2">

                  {/* PAYMENT SUMMARY */}

                  <section>
                    <div className="mb-3 flex items-center gap-2">
                      <CreditCard
                        size={18}
                        className="text-violet-400"
                      />

                      <h3 className="font-semibold text-white">
                        Payment Summary
                      </h3>
                    </div>

                    <div
                      className="
                        rounded-xl
                        border
                        border-white/10
                        bg-slate-900/60
                        p-5
                      "
                    >
                      <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Subtotal
                          </span>

                          <span className="text-gray-300">
                            ₹
                            {order.subtotal.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Discount
                          </span>

                          <span className="text-green-400">
                            - ₹
                            {order.discount.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Shipping
                          </span>

                          <span className="text-gray-300">
                            ₹
                            {order.shippingCharge.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Tax
                          </span>

                          <span className="text-gray-300">
                            ₹
                            {order.tax.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>

                        <div className="border-t border-white/10 pt-3">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-300">
                              Total
                            </span>

                            <span className="text-lg font-bold text-white">
                              ₹
                              {order.totalAmount.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </section>

                  {/* COUPON / NOTES */}

                  <div className="space-y-6">

                    {/* COUPON */}

                    {order.coupon && (
                      <section>
                        <div className="mb-3 flex items-center gap-2">
                          <Tag
                            size={18}
                            className="text-violet-400"
                          />

                          <h3 className="font-semibold text-white">
                            Coupon
                          </h3>
                        </div>

                        <div
                          className="
                            rounded-xl
                            border
                            border-white/10
                            bg-slate-900/60
                            p-5
                          "
                        >
                          <p className="font-medium text-gray-200">
                            {order.coupon.code}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {order.coupon.discountType}:{" "}
                            {order.coupon.discountValue}
                          </p>
                        </div>
                      </section>
                    )}

                    {/* NOTES */}

                    {order.notes && (
                      <section>
                        <div className="mb-3 flex items-center gap-2">
                          <FileText
                            size={18}
                            className="text-violet-400"
                          />

                          <h3 className="font-semibold text-white">
                            Notes
                          </h3>
                        </div>

                        <div
                          className="
                            rounded-xl
                            border
                            border-white/10
                            bg-slate-900/60
                            p-5
                            text-sm
                            text-gray-400
                          "
                        >
                          {order.notes}
                        </div>
                      </section>
                    )}

                  </div>
                </div>

                {/* =====================================
                    UPDATED DATE
                ===================================== */}

                <div
                  className="
                    border-t
                    border-white/10
                    pt-4
                    text-xs
                    text-gray-600
                  "
                >
                  Last updated:{" "}
                  {new Date(
                    order.updatedAt
                  ).toLocaleString()}
                </div>

              </div>
            )}

        </div>
      </div>
    </div>
  );
}

export default OrderViewModal;