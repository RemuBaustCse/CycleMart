/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValues, useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Loader from "../components/Loader";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/login");
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Failed to register. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center content-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white px-4">
      <div className="w-11/12 flex p-8 border-2 border-yellow-400 rounded-lg shadow-lg">
        <div className=" justify-center">
          <img
            src="https://www.rei.com/dam/larracas_062822_0072_web_med.jpeg"
            alt="Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full p-4">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-yellow-400">
            Create an account
          </h2>
        </div>
          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              {...register("name")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Phone
            </label>
            <input
              type="text"
              {...register("phone")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Gender
            </label>
            <select
              {...register("gender")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Other">Other</option>
              <option value="Prefer Not to Say">Prefer Not to Say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              required
              className="block w-full rounded-md bg-white px-3 py-2 text-black border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-black shadow-md hover:bg-yellow-500"
          >
            Register
          </button>
        <p className="mt-6 text-center text-sm text-black">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-yellow-500 hover:text-yellow-600"
          >
            Sign in
          </a>
        </p>
        </form>

      </div>
    </div>
  );
};

export default Register;
