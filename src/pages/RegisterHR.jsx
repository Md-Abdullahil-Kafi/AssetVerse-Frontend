// src/pages/RegisterHR.jsx (ফাইনাল)

import { useForm } from "react-hook-form";
import { useAuthActions } from "../hooks/useAuthActions";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterHR() {
  const { registerHR, loading, error, success } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let profileImageUrl = "https://i.pravatar.cc/300";
      let companyLogoUrl = "https://i.pravatar.cc/200";

      if (data.profileImage && data.profileImage[0]) {
        const formData = new FormData();
        formData.append("image", data.profileImage[0]);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );
        profileImageUrl = imgRes.data.data.url;
      }

      if (data.companyLogo && data.companyLogo[0]) {
        const formData = new FormData();
        formData.append("image", data.companyLogo[0]);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );
        companyLogoUrl = imgRes.data.data.url;
      }

      registerHR({
        name: data.name,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        companyName: data.companyName,
        profileImage: profileImageUrl,
        companyLogo: companyLogoUrl,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-3xl text-primary">Join as HR Manager</h2>
          {error && <div className="alert alert-error shadow-lg">{error}</div>}
          {success && <div className="alert alert-success shadow-lg">{success}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label"><span className="label-text">Full Name</span></label> <br />
              <input {...register("name", { required: "Name is required" })} type="text" className="input input-bordered w-full" />
              {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
            </div>

            <div className="form-control mt-4">
              <label className="label"><span className="label-text">Company Name</span></label> <br />
              <input {...register("companyName", { required: "Company name is required" })} type="text" className="input input-bordered w-full" />
              {errors.companyName && <p className="text-error text-sm">{errors.companyName.message}</p>}
            </div>

            <div className="form-control mt-4">
              <label className="label"><span className="label-text">Profile Picture (optional)</span></label> <br />
              <input {...register("profileImage")} type="file" accept="image/*" className="file-input file-input-bordered w-full" />
            </div>

            <div className="form-control mt-4">
              <label className="label"><span className="label-text">Company Logo (optional)</span></label> <br />
              <input {...register("companyLogo")} type="file" accept="image/*" className="file-input file-input-bordered w-full" />
            </div>

            <div className="form-control mt-4">
              <label className="label"><span className="label-text">Email</span></label> <br />
              <input {...register("email", { required: "Email is required" })} type="email" className="input input-bordered w-full" />
              {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
            </div>

            <div className="form-control mt-4">
              <label className="label"><span className="label-text">Password</span></label> <br />
              <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })} type="password" className="input input-bordered w-full" />
              {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
            </div>

            <div className="form-control mt-4">
              <label className="label"><span className="label-text">Date of Birth</span></label> <br />
              <input {...register("dateOfBirth", { required: "Date of birth is required" })} type="date" className="input input-bordered w-full" />
              {errors.dateOfBirth && <p className="text-error text-sm">{errors.dateOfBirth.message}</p>}
            </div>

            <div className="card-actions mt-6">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Registering..." : "Register as HR Manager"}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="link link-primary">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}