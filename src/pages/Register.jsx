import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="register-bg">
      <Helmet>
        <title>Echo Estates | Register</title>
      </Helmet>
      <div className="pt-20 pb-20 container mx-auto">
        <div className="">
          <div className=" flex p-4 md:p-16 items-center justify-between  flex-col lg:flex-row">
            <div className=" w-[50%]  card mx-auto  shadow-2xl bg-base-100">
              <div className="text-center pt-6 ">
                <h1 className=" text-2xl md:text-5xl font-playfair font-bold">
                  Register Now!
                </h1>
                <p className="py-6"> Unlock a new Journey , {"Let's"} Start </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="name"
                    className="input input-bordered focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    {...register("photo")}
                    type="text"
                    placeholder="photo URL"
                    className="input input-bordered focus:outline-none"
                    required
                  />
                </div>
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
                    Register
                  </button>
                </div>
              </form>

              <div className="divider -mt-4 md:px-40 mb-4">OR</div>

              <div className="flex flex-col  mb-4 items-center justify-center ">
                <button className="btn shadow-lg border-none rounded-full btn-wide text-main font-semibold">
                  <FcGoogle className="text-xl"></FcGoogle> Sign Up With Google
                </button>

                <p className="my-4 ">
                  Already have an account ? Please{" "}
                  <Link to="/login" className=" font-semibold underline">
                    {" "}
                    Login{" "}
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

export default Register;
