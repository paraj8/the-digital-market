import {
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

interface PaymentStatusIconProps {
  status:
    | "pending"
    | "paid"
    | "failed"
    | "cancelled"
    | "expired"
    | null;
}

function PaymentStatusIcon({
  status,
}: PaymentStatusIconProps) {
  /*
  ====================================
  PAID
  ====================================
  */

  if (status === "paid") {
    return (
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-green-500/10
          text-green-400
        "
      >
        <FiCheckCircle size={42} />
      </div>
    );
  }

  /*
  ====================================
  FAILED
  ====================================
  */

  if (status === "failed") {
    return (
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-red-500/10
          text-red-400
        "
      >
        <FiXCircle size={42} />
      </div>
    );
  }

  /*
  ====================================
  CANCELLED
  ====================================
  */

  if (status === "cancelled") {
    return (
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-orange-500/10
          text-orange-400
        "
      >
        <FiXCircle size={42} />
      </div>
    );
  }

  /*
  ====================================
  EXPIRED
  ====================================
  */

  if (status === "expired") {
    return (
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-yellow-500/10
          text-yellow-400
        "
      >
        <FiAlertCircle size={42} />
      </div>
    );
  }

  /*
  ====================================
  PENDING
  ====================================
  */

  return (
    <div
      className="
        flex
        h-20
        w-20
        items-center
        justify-center
        rounded-full
        bg-violet-500/10
        text-violet-400
      "
    >
      <FiLoader
        size={42}
        className="animate-spin"
      />
    </div>
  );
}

export default PaymentStatusIcon;