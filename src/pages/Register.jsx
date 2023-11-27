import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const [showPass, setShowPass, setLoading] = useState(false);
  const { user, setUser, createUser, googleUserAuth } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    //creating user in firebase
    createUser(data.email, data.password)
      .then((result) => {
        toast.success("Created Account Successfully");
        // updating user info to firebase
        updateProfile(result.user, {
          displayName: data.name,
          photoURL: data.photo,
        })
          .then(() => {
            setUser({
              ...user,
              displayName: data.name,
              photoURL: data.photo,
              email: data?.email,
            });
            reset();

            // adding user into database
            const userInfo = {
              userName: data.name,
              email: data.email,
              userId: result.user.uid,
              role: "user",
            };

            axiosPublic.post("/api/v1/add-user", userInfo).then((res) => {
              if (res.data.insertedId) {
                navigate("/");
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };

  // google sign up
  const handleGoogleSignIn = () => {
    googleUserAuth()
      .then((result) => {
        toast.success("Logged in Successfully");

        // adding user info to database
        const userInfo = {
          userName: result.user.displayName,
          email: result.user.email,
          userId: result.user.uid,
          role: "user",
        };
        axiosPublic.post("/api/v1/add-user", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((err) => {
        toast.error(err.code);
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="register-bg">
      <Helmet>
        <title>Echo Estates | Register</title>
      </Helmet>
      <div className="pt-14 pb-20 container mx-auto">
        <div className="">
          <div className=" flex p-4 md:p-16 items-center justify-between  flex-col lg:flex-row">
            <div className=" w-full lg:w-[50%]  card mx-auto  shadow-2xl bg-base-100">
              <div className="text-center -mb-10 lg:-mb-10 pt-6 ">
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
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      minLength: 6,
                      pattern: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/,
                    })}
                    type={showPass ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered focus:outline-none"
                    required
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute cursor-pointer right-0 top-1/2 pr-4 "
                  >
                    {showPass ? (
                      <IoIosEyeOff className="text-lg"></IoIosEyeOff>
                    ) : (
                      <IoMdEye className="text-lg"></IoMdEye>
                    )}
                  </span>
                  {errors.password?.type === "minLength" && (
                    <span className="font-semibold text-red-600">
                      Your password must be more than 6 charectars*
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="font-semibold text-red-600">
                      Your password must contain a Capital letter and Special
                      Charectar*
                    </span>
                  )}
                </div>
                <div className="form-control  mt-6">
                  <button className="btn btn-wide mx-auto bg-main hover:bg-main shadow-lg border-none rounded-full text-white">
                    Register
                  </button>
                </div>
              </form>

              <div className="divider -mt-4 md:px-40 mb-4">OR</div>

              <div className="flex flex-col  mb-4 items-center justify-center ">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn shadow-lg border-none rounded-full btn-wide text-main font-semibold"
                >
                  <FcGoogle className="text-xl"></FcGoogle> Sign Up With Google
                </button>

                <p className="my-4 text-center ">
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
