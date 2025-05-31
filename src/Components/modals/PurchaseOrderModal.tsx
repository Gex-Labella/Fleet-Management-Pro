import React, { useState } from "react";
import { X, Plus, Trash2, CalendarIcon } from "lucide-react";

interface PurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  suppliers: string[];
  parts: any[]; // You would use your Part type here
}

interface OrderItem {
  partId: string;
  partName: string;
  quantity: number;
  unitPrice: number;
}

const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({
  isOpen,
  onClose,
  suppliers,
  parts,
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderDate, setOrderDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [expectedDelivery, setExpectedDelivery] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      { partId: "", partName: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateOrderItem = (index: number, field: string, value: any) => {
    const newItems = [...orderItems];

    // If selecting a part, update the part name and price too
    if (field === "partId") {
      const selectedPart = parts.find((p) => p.id === value);
      if (selectedPart) {
        newItems[index] = {
          ...newItems[index],
          partId: value,
          partName: selectedPart.name,
          unitPrice: selectedPart.unitPrice,
        };
        setOrderItems(newItems);
        return;
      }
    }

    // Otherwise just update the field
    newItems[index] = { ...newItems[index], [field]: value };
    setOrderItems(newItems);
  };

  const calculateTotal = () => {
    return orderItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your submit logic here

    // Example: Create purchase order object
    const purchaseOrder = {
      supplier: selectedSupplier,
      orderDate,
      expectedDelivery,
      items: orderItems,
      total: calculateTotal(),
      notes,
      status: "pending",
    };

    console.log("Creating purchase order:", purchaseOrder);

    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Create Purchase Order
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Supplier
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                required
              >
                <option value="">Select a supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Order Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  required
                />
                <CalendarIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expected Delivery
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={expectedDelivery}
                  onChange={(e) => setExpectedDelivery(e.target.value)}
                  required
                />
                <CalendarIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Order Items
              </h3>
              <button
                type="button"
                onClick={addOrderItem}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              {orderItems.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No items added yet. Click "Add Item" to add parts to this
                  order.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="col-span-5">Part</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Unit Price</div>
                    <div className="col-span-2">Total</div>
                    <div className="col-span-1"></div>
                  </div>

                  {orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-2 mb-3 items-center"
                    >
                      <div className="col-span-5">
                        <select
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                          value={item.partId}
                          onChange={(e) =>
                            updateOrderItem(index, "partId", e.target.value)
                          }
                          required
                        >
                          <option value="">Select a part</option>
                          {parts.map((part) => (
                            <option key={part.id} value={part.id}>
                              {part.name} ({part.partNumber})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                          value={item.quantity}
                          onChange={(e) =>
                            updateOrderItem(
                              index,
                              "quantity",
                              parseInt(e.target.value) || 0
                            )
                          }
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateOrderItem(
                              index,
                              "unitPrice",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          required
                        />
                      </div>

                      <div className="col-span-2 text-gray-800 dark:text-gray-200 text-sm font-medium">
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </div>

                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => removeOrderItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                    <div className="text-right">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total:
                      </span>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">
                        ${calculateTotal().toFixed(2)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Purchase Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseOrderModal;
