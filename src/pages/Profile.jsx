// src/pages/Profile.jsx (ফাইনাল – profileImage ঠিক দেখাবে)

import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import api from "../lib/axios";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Profile() {
  const { user } = useAuth();

  const [affiliations, setAffiliations] = useState([]);
  const [loadingAff, setLoadingAff] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("https://i.pravatar.cc/300"); // default

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      dateOfBirth: user?.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
    },
  });

  // user load হলে previewImage update করা
  useEffect(() => {
    if (user?.profileImage) {
      setPreviewImage(user.profileImage);
    }
  }, [user]);

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const { data } = await api.get("/user/affiliations");
        setAffiliations(data.affiliations || []);
      } catch (err) {
        console.error(err);
      }
      setLoadingAff(false);
    };
    fetchAffiliations();
  }, []);

  const onSubmit = async (data) => {
    try {
      let imageUrl = user.profileImage;

      if (data.profileImage && data.profileImage[0]) {
        const formData = new FormData();
        formData.append("image", data.profileImage[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );

        imageUrl = imgRes.data.data.url;
      }

      await api.put("/user/profile", {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        profileImage: imageUrl,
        profileCompleted: true,
      });

      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setPreviewImage(imageUrl);
      setIsEditing(false);
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: "Failed to update profile",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          {/* HR Company Header */}
          {user?.role === "hr" && (
            <div className="bg-gradient-to-r from-primary to-primary-focus p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-white ring-offset-2">
                    <img src={user.companyLogo || "https://i.ibb.co/NnGkQKTQ/3.png"} alt="Company Logo" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{user.companyName}</h3>
                  <p className="text-lg opacity-90">HR Manager</p>
                </div>
              </div>
            </div>
          )}

          <div className="card-body p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-center text-primary mb-12">
              My Profile
            </h1>

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
              <div className="avatar hover:scale-105 transition-transform duration-300">
                <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img
                    src={previewImage || "https://i.pravatar.cc/300"}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">
                  {user?.name || "Your Name"}
                </h2>
                <p className="text-xl opacity-80 mt-2">{user?.email || "your@email.com"}</p>
                <p className="text-lg mt-4">
                  Role:
                  <span className="badge badge-primary badge-lg ml-2">
                    {user?.role === "hr" ? "HR Manager" : "Employee"}
                  </span>
                </p>
              </div>
            </div>

            {/* Edit Mode */}
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Full Name
                      </span>
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className="input input-bordered input-primary w-full"
                    />
                    {errors.name && (
                      <p className="text-error text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Date of Birth
                      </span>
                    </label>
                    <input
                      {...register("dateOfBirth", {
                        required: "Date of birth is required",
                      })}
                      type="date"
                      className="input input-bordered input-primary w-full"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-error text-sm mt-1">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Profile Picture (optional)
                    </span>
                  </label>
                  <input
                    {...register("profileImage")}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-primary w-full"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-wide"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost btn-wide"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-base-200 p-6 rounded-xl">
                    <p className="text-sm opacity-70 mb-2">Full Name</p>
                    <p className="text-xl font-semibold">
                      {user?.name || "Not set"}
                    </p>
                  </div>
                  <div className="bg-base-200 p-6 rounded-xl">
                    <p className="text-sm opacity-70 mb-2">Date of Birth</p>
                    <p className="text-xl font-semibold">
                      {user?.dateOfBirth
                        ? new Date(user.dateOfBirth).toLocaleDateString()
                        : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary btn-wide hover:scale-105 transition-transform"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}

            {/* Company Affiliations – শুধু Employee-এ দেখাবে */}
            {user?.role !== "hr" && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-primary mb-8 text-center">
                  Company Affiliations
                </h3>
                {loadingAff ? (
                  <div className="text-center py-12">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                ) : affiliations.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-500 bg-base-200 py-8 px-12 rounded-xl">
                      No company affiliations yet
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {affiliations.map((aff, i) => (
                      <div
                        key={i}
                        className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="card-body items-center text-center">
                          <div className="avatar mb-4">
                            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={
                                  aff.companyLogo ||
                                  "https://i.ibb.co/NnGkQKTQ/3.png"
                                }
                                alt={aff.companyName}
                              />
                            </div>
                          </div>
                          <h4 className="card-title text-lg">
                            {aff.companyName}
                          </h4>
                          <p className="text-sm opacity-70">Employee</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}