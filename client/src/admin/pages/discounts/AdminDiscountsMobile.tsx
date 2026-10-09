import { FiEdit2, FiPower, FiTrash2 } from "react-icons/fi";

import type { Discount } from "../../../shared/types/discount";
import { getDiscountScopeLabel, getDiscountStatus, getDiscountValueLabel } from "./discountUtils";
import DiscountFilters, { type DiscountStatusFilter } from "./components/DiscountFilters";

interface AdminDiscountsMobileProps {
  discounts: Discount[];
  isLoading: boolean;
  search: string;
  status: DiscountStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: DiscountStatusFilter) => void;
  onEdit: (discount: Discount) => void;
  onDelete: (discount: Discount) => void;
  onToggle: (discount: Discount) => void;
}

function AdminDiscountsMobile({
  discounts,
  isLoading,
  search,
  status,
  onSearchChange,
  onStatusChange,
  onEdit,
  onDelete,
  onToggle,
}: AdminDiscountsMobileProps) {
  return (
    <div className="space-y-4">
      <DiscountFilters search={search} status={status} onSearchChange={onSearchChange} onStatusChange={onStatusChange} />
      {isLoading ? <p className="py-8 text-center text-sm text-gray-400">Loading discounts...</p> : discounts.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">No discounts match these filters.</p>
      ) : discounts.map((discount) => {
        const state = getDiscountStatus(discount);
        return (
          <article key={discount._id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-white">{discount.name}</h3>
                <p className="mt-1 text-sm text-violet-300">{getDiscountValueLabel(discount)} {discount.discountType === "percentage" ? "OFF" : "OFF"}</p>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-gray-300">{state}</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div><dt className="text-gray-500">Scope</dt><dd className="mt-1 text-gray-200">{getDiscountScopeLabel(discount)}</dd></div>
              <div><dt className="text-gray-500">Minimum</dt><dd className="mt-1 text-gray-200">₹{discount.minimumOrderAmount.toLocaleString("en-IN")}</dd></div>
              <div><dt className="text-gray-500">Starts</dt><dd className="mt-1 text-gray-200">{new Date(discount.startDate).toLocaleDateString("en-IN")}</dd></div>
              <div><dt className="text-gray-500">Ends</dt><dd className="mt-1 text-gray-200">{new Date(discount.endDate).toLocaleDateString("en-IN")}</dd></div>
            </dl>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => onEdit(discount)} className="flex-1 rounded-lg border border-white/10 py-2 text-xs text-gray-200"><FiEdit2 className="mr-1 inline" />Edit</button>
              <button type="button" onClick={() => onToggle(discount)} className="flex-1 rounded-lg border border-white/10 py-2 text-xs text-gray-200"><FiPower className="mr-1 inline" />{discount.isActive ? "Deactivate" : "Activate"}</button>
              <button type="button" onClick={() => onDelete(discount)} className="flex-1 rounded-lg border border-red-500/20 py-2 text-xs text-red-300"><FiTrash2 className="mr-1 inline" />Delete</button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default AdminDiscountsMobile;
