import type { ShippingAddress } from "../../../features/orders/types/order";

interface OrderShippingAddressProps {
  address: ShippingAddress;
}

function OrderShippingAddress({
  address,
}: OrderShippingAddressProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">
          Shipping Address
        </h2>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs capitalize text-slate-300">
          {address.addressType}
        </span>
      </div>

      <div className="mt-5">
        <p className="font-medium text-white">
          {address.fullName}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          {address.phone}
        </p>

        <div className="mt-4 space-y-1 text-sm leading-6 text-slate-300">
          <p>{address.addressLine1}</p>

          {address.addressLine2 && (
            <p>{address.addressLine2}</p>
          )}

          {address.landmark && (
            <p>
              Landmark: {address.landmark}
            </p>
          )}

          <p>
            {address.city}, {address.state}
          </p>

          <p>
            {address.country} -{" "}
            {address.postalCode}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderShippingAddress;