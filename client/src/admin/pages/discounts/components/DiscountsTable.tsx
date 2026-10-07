import { FiEdit2, FiPower, FiTrash2 } from "react-icons/fi";

import type { Discount } from "../../../../shared/types/discount";
import {
  getDiscountScopeLabel,
  getDiscountStatus,
  getDiscountValueLabel,
} from "../discountUtils";

interface DiscountsTableProps {
  discounts: Discount[];
  isLoading: boolean;
  onEdit: (discount: Discount) => void;
  onDelete: (discount: Discount) => void;
  onToggle: (discount: Discount) => void;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));

function DiscountsTable({ discounts, isLoading, onEdit, onDelete, onToggle }: DiscountsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60">
      <table className="w-full min-w-[920px]">
        <thead className="border-b border-white/10 bg-slate-800/40">
          <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
            <th className="px-5 py-4">Name</th>
            <th className="px-5 py-4">Type / Value</th>
            <th className="px-5 py-4">Scope</th>
            <th className="px-5 py-4">Start Date</th>
            <th className="px-5 py-4">End Date</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {isLoading ? (
            <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-400">Loading discounts...</td></tr>
          ) : discounts.length === 0 ? (
            <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-400">No discounts match these filters.</td></tr>
          ) : discounts.map((discount) => {
            const status = getDiscountStatus(discount);
            const badge = status === "Active" ? "bg-green-500/10 text-green-300"
              : status === "Scheduled" ? "bg-blue-500/10 text-blue-300"
                : status === "Expired" ? "bg-gray-500/10 text-gray-400"
                  : "bg-amber-500/10 text-amber-300";
            return (
              <tr key={discount._id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <p className="font-semibold text-white">{discount.name}</p>
                  {discount.description && <p className="mt-1 max-w-xs truncate text-xs text-gray-500">{discount.description}</p>}
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-white">{getDiscountValueLabel(discount)}</p>
                  <p className="mt-1 text-xs capitalize text-gray-500">{discount.discountType}</p>
                </td>
                <td className="px-5 py-4 text-sm text-gray-300">{getDiscountScopeLabel(discount)}</td>
                <td className="px-5 py-4 text-sm text-gray-400">{formatDate(discount.startDate)}</td>
                <td className="px-5 py-4 text-sm text-gray-400">{formatDate(discount.endDate)}</td>
                <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge}`}>{status}</span></td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button type="button" title="Edit discount" onClick={() => onEdit(discount)}
                      className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-blue-300"><FiEdit2 size={15} /></button>
                    <button type="button" title={discount.isActive ? "Deactivate discount" : "Activate discount"}
                      onClick={() => onToggle(discount)}
                      className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-emerald-300"><FiPower size={15} /></button>
                    <button type="button" title="Delete discount" onClick={() => onDelete(discount)}
                      className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-red-300"><FiTrash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DiscountsTable;
