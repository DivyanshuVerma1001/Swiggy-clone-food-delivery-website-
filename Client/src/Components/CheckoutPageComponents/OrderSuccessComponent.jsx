import { CheckCircle } from "lucide-react";

export default function SuccessComponent({ order, onClose }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <CheckCircle className="text-green-600 w-12 h-12" />
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        Order Placed Successfully 🎉
      </h2>

      {/* Address */}
      <div className="mb-4 text-left">
        <p className="font-semibold text-gray-800">Delivery Address:</p>
        <p className="text-gray-600">{order.address.details}</p>
      </div>

      {/* Items */}
      <div className="mb-4 text-left">
        <p className="font-semibold text-gray-800 mb-2">Items:</p>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between bg-gray-50 p-2 rounded-xl shadow-sm"
            >
              <span className="text-gray-700">
                {item.name} × {item.quantity}
              </span>
              <span className="font-medium">
                ₹{(item.price / 100) * item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="border-t pt-3 text-left">
        <p className="flex justify-between text-gray-700">
          <span>Payment Method:</span>
          <span className="font-medium">{order.paymentMethod.toUpperCase()}</span>
        </p>
        <p className="flex justify-between font-bold text-lg text-gray-800">
          <span>Total Paid:</span>
          <span>₹{order.total}</span>
        </p>
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Close
      </button>
    </div>
  );
}
