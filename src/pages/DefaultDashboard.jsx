const DefaultDashboard = () => {
  return (
    <div className="lg:my-7 p-6 ">
      <h3 className="font-playfair text-center text-3xl xl:text-5xl font-semibold">
        {" "}
        Welcome to Your Dashboard{" "}
      </h3>

      <p className="text-center font-semibold text-gray-400 my-6 text-lg">
        Your dashboard is your command center, offering a seamless experience
        tailored just for you
      </p>
      <div className="w-full">
        <img
          className="lg:w-[50%] w-full mx-auto"
          src="https://i.ibb.co/L86sDQq/dasboard-banner.png"
          alt="dasboard-banner"
        />
      </div>
    </div>
  );
};

export default DefaultDashboard;
