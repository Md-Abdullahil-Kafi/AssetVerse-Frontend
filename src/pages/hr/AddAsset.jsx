// src/pages/hr/AddAsset.jsx

import { useState } from "react";
import api from "../../lib/axios";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddAsset() {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "Returnable",
    productQuantity: 1,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      Swal.fire("Error!", "Please upload an image", "error");
      return;
    }

    setLoading(true);

    try {
      // ImgBB-এ upload
      const formDataImg = new FormData();
      formDataImg.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formDataImg
      );

      const imageUrl = imgRes.data.data.url;

      // backend-এ asset add
      await api.post("/assets", {
        productName: formData.productName,
        productImage: imageUrl,
        productType: formData.productType,
        productQuantity: Number(formData.productQuantity),
      });

      Swal.fire({
        title: "Success!",
        text: "Asset added successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form
      setFormData({
        productName: "",
        productType: "Returnable",
        productQuantity: 1,
      });
      setImageFile(null);
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Failed!",
        text: "Error adding asset. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Add New Asset
          </h1>
          <p className="text-xl opacity-80">
            Expand your company inventory
          </p>
        </div>

        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Product Name</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="input input-bordered input-primary w-full text-lg"
                    placeholder="e.g. MacBook Pro 16\"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Product Type</span>
                  </label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className="select select-bordered select-primary w-full text-lg"
                  >
                    <option>Returnable</option>
                    <option>Non-returnable</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Quantity</span>
                  </label>
                  <input
                    type="number"
                    name="productQuantity"
                    value={formData.productQuantity}
                    onChange={handleChange}
                    min="1"
                    className="input input-bordered input-primary w-full text-lg"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Product Image</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered file-input-primary w-full text-lg"
                    required
                  />
                  <p className="text-sm opacity-70 mt-2">
                    Image will be uploaded to ImgBB
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              {previewImage && (
                <div className="flex justify-center mt-8">
                  <div className="avatar">
                    <div className="w-80 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-4">
                      <img src={previewImage} alt="Preview" className="object-cover" />
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mt-10">
                <button
                  type="submit"
                  className="btn btn-primary btn-wide btn-lg hover:scale-105 transition-transform"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Adding Asset...
                    </>
                  ) : (
                    "Add Asset to Inventory"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}