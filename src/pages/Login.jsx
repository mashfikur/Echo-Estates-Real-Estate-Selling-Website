import { Helmet } from "react-helmet-async";

const Login = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Echo Estates | Login</title>
      </Helmet>
      <div className="pt-20 container mx-auto">
        <div className="">
          <div className=" flex items-center justify-between  flex-col lg:flex-row">
            <div className=" flex-1 text-center lg:text-left">
              <img src="https://i.ibb.co/PzFhKcS/login-banner.jpg" alt="" />
            </div>
            <div className=" flex-1 card  w-full shadow-lg border-2 border-main bg-base-100">
              <div className="text-center pt-6 ">
                <h1 className="text-5xl font-playfair font-bold">
                  Welcome Back!
                </h1>
                <p className="py-6">{"Let's"} continue your journey</p>
              </div>
              <form className="card-body px-40">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
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
                    type="password"
                    placeholder="password"
                    className="input input-bordered focus:outline-none"
                    required
                  />
                </div>
                <div className="form-control px-20 mt-6">
                  <button className="btn bg-main hover:bg-main shadow-lg border-none rounded-full text-white">
                    Login
                  </button>
                </div>
              </form>

              <div className="divider -mt-4 px-40 mb-4">OR</div>

              <div className="flex  mb-4 items-center justify-center ">
                <button className="btn shadow-lg border-none rounded-full px-20 text-main font-semibold">
                  Sign In With Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
