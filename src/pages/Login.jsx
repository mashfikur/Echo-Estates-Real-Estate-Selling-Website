import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Echo Estates | Login</title>
      </Helmet>
      <div className="pt-20 mb-20 container mx-auto">
        <div className="">
          <div className=" flex p-4 md:p-16 items-center justify-between  flex-col lg:flex-row">
            <div className=" flex-1 text-center lg:text-left">
              <img
                className="w-[100%] md:w-[60%] mx-auto my-4 lg:w-full"
                src="https://i.ibb.co/PzFhKcS/login-banner.jpg"
                alt=""
              />
            </div>
            <div className=" flex-1 card  w-full shadow-lg border-2 border-main bg-base-100">
              <div className="text-center pt-6 ">
                <h1 className=" text-2xl md:text-5xl font-playfair font-bold">
                  Welcome Back!
                </h1>
                <p className="py-6">{"Let's"} continue your journey</p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body lg:px-40"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="email"
                    className="input input-bordered focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="password"
                    className="input input-bordered focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control  mt-6">
                  <button className="btn btn-wide mx-auto bg-main hover:bg-main shadow-lg border-none rounded-full text-white">
                    Login
                  </button>
                </div>
              </form>

              <div className="divider -mt-4 md:px-40 mb-4">OR</div>

              <div className="flex flex-col  mb-4 items-center justify-center ">
                <button className="btn shadow-lg border-none rounded-full btn-wide text-main font-semibold">
                  <FcGoogle className="text-xl"></FcGoogle> Sign In With Google
                </button>

                <p className="my-4 ">
                  New on this website ? Please{" "}
                  <Link to="/register" className=" font-semibold underline">
                    {" "}
                    Register{" "}
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
