import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  addCoupon,
  getCoupons,
  editCoupon,
  removeCoupon,
} from "../../api/admin";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const Coupon = () => {
  const [coupons, setCoupons] = useState<
    {
      _id: string;
      code: string;
      discount: string;
      validFrom: string;
      validTo: string;
      minCartValue: string;
    }[]
  >([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState(false);
  const [currentCouponId, setCurrentCouponId] = useState<string | null>(null);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    validFrom: "",
    validTo: "",
    minCartValue: "",
  });
  const [errors, setErrors] = useState({
    code: "",
    discount: "",
    validFrom: "",
    validTo: "",
    minCartValue: "",
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setNewCoupon({
      code: "",
      discount: "",
      validFrom: "",
      validTo: "",
      minCartValue: "",
    });
    setErrors({
      code: "",
      discount: "",
      validFrom: "",
      validTo: "",
      minCartValue: "",
    });
  };

  useEffect(() => {
    getCoupons().then((response) => setCoupons(response?.data));
    setState(false);
  }, [state]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value });
  };

  const validate = () => {
    const { code, discount, validFrom, validTo, minCartValue } = newCoupon;
    const newErrors = {
      code: code ? "" : "Coupon code is required",
      discount: discount ? "" : "Discount amount is required",
      validFrom: validFrom ? "" : "Valid from date is required",
      validTo: validTo ? "" : "Valid to date is required",
      minCartValue: minCartValue ? "" : "Minimum cart value is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const saveCoupon = async () => {
    if (!validate()) {
      return;
    }
    let response;
    if (isEditing && currentCouponId) {
      response = await editCoupon(currentCouponId, newCoupon);
    } else {
      response = await addCoupon(newCoupon);
    }
    if (response) {
      toast.success(response.data.message, { position: "top-center" });
      setState(true);
    }
    closeModal();
  };

  const editedCoupon = (coupon: any) => {
    setIsEditing(true);
    setCurrentCouponId(coupon._id);
    setNewCoupon({
      code: coupon.code,
      discount: coupon.discount,
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      minCartValue: coupon.minCartValue,
    });
    openModal();
  };

  const deleteCoupon = async (Id: string) => {
    const response = await removeCoupon(Id);
    if (response) {
      toast.success(response.data.message, { position: "top-center" });
      setState(true);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white min-h-screen">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Add Coupon
      </button>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-400">Coupon Code</th>
              <th className="py-2 px-4 border  border-gray-400">Discount</th>
              <th className="py-2 px-4 border  border-gray-400">Valid From</th>
              <th className="py-2 px-4 border  border-gray-400">Valid To</th>
              <th className="py-2 px-4 border  border-gray-400">
                Min Cart Value
              </th>
              <th className="py-2 px-4 border  border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="bg-gray-800 hover:bg-gray-700">
                <td className="border px-4 py-2">{coupon.code}</td>
                <td className="border px-4 py-2">{coupon.discount}</td>
                <td className="border px-4 py-2">{coupon.validFrom}</td>
                <td className="border px-4 py-2">{coupon.validTo}</td>
                <td className="border px-4 py-2">{coupon.minCartValue}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => editedCoupon(coupon)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCoupon(coupon._id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Coupon"
        className="bg-white p-4 rounded shadow-lg max-w-lg mx-auto my-8"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl mb-4">
          {isEditing ? "Edit Coupon" : "Add Coupon"}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Coupon Code</label>
            <input
              type="text"
              name="code"
              value={newCoupon.code}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Discount Amount</label>
            <input
              type="text"
              name="discount"
              value={newCoupon.discount}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
            />
            {errors.discount && (
              <p className="text-red-500 text-sm">{errors.discount}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Valid From</label>
            <input
              type="date"
              name="validFrom"
              value={newCoupon.validFrom}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
            />
            {errors.validFrom && (
              <p className="text-red-500 text-sm">{errors.validFrom}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Valid To</label>
            <input
              type="date"
              name="validTo"
              value={newCoupon.validTo}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
            />
            {errors.validTo && (
              <p className="text-red-500 text-sm">{errors.validTo}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Minimum Cart Amount
            </label>
            <input
              type="number"
              name="minCartValue"
              value={newCoupon.minCartValue}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
            />
            {errors.minCartValue && (
              <p className="text-red-500 text-sm">{errors.minCartValue}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveCoupon}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Update Coupon" : "Add Coupon"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Coupon;
