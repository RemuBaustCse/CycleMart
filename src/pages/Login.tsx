
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useEffect } from "react";


const Login = () => {

  useEffect(() => {
		document.title = "Login | Bi-Cycle Store";
	}, []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit,setValue } = useForm({});
  const [login, { isLoading }] = useLoginMutation();

  const testCredentialSet = ()=>{
    setValue('password','1111');
    setValue('email','user1@gmail.com');
  }
  const testCredentialSet2 = ()=>{
    setValue('password','1111');
    setValue('email','user2@gmail.com');
  }
  const testCredentialSetAdmin = ()=>{
    setValue('password','1111');
    setValue('email','admin@gmail.com');
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      const user = verifyToken(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));

      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });

      navigate("/");
    } catch (err) {
      let errorMessage = "Something went wrong!";
      if ((err as { data?: { message?: string } }).data?.message) {
        errorMessage = (err as { data: { message: string } }).data.message;
      }
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 p-6 md:p-12 border-2 border-yellow-400 rounded-lg shadow-xl">
        
        {/* Image Section */}
        <div className="hidden md:block">
          <img
            src="https://cdn.mondraker.com/storage/cache/images/815/1744103767-2560_67f4e9570435e173807893-banner-web-hermanos-marquez-bikes-3800x1740.jpg"
            alt="Login illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
          <div className="text-center md:mx-auto">
            {/* <Logo /> */}
            <h2 className="mt-4 text-3xl font-bold text-yellow-400">Sign in to your account</h2>
            <button  onClick={testCredentialSet} className="bg-red-500 btn text-white">User1 Credential</button>
            <button  onClick={testCredentialSet2} className="bg-red-500 btn text-white">User2 Credential</button>
            <button  onClick={testCredentialSetAdmin} className="bg-red-500 btn text-white">Admin Credential</button>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">Email address</label>
              <input
                type="email"
                {...register("email")}
                required
                id="email"
                autoComplete="email"
                className="mt-2 w-full rounded-md border-2 border-yellow-400 bg-white px-3 py-2 text-black focus:outline-yellow-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
              <input
                {...register("password")}
                id="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-2 w-full rounded-md border-2 border-yellow-400 bg-white px-3 py-2 text-black focus:outline-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-yellow-400 px-3 py-2 text-sm font-semibold text-black shadow-md hover:bg-yellow-500 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full border-2 border-t-transparent border-black h-5 w-5 mr-2"></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-black">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-yellow-500 hover:text-yellow-600">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
