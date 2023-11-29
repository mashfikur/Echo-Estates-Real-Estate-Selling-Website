import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PropertyCard from "../components/Dashboard/Agent/PropertyCard";
import { Container } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import SortButton from "../components/Home/SortButton";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [input, setInput] = useState("");
  const searchRef = useRef();
  const [sort, setSort] = useState("");
  console.log(sort);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["all-properties", input, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/v1/user/verified-properties?search=${input}&sort=${sort}`
      );
      return res.data;
    },
  });

  const handleSearch = () => {
    const value = searchRef.current.value;
    setInput(value);
  };

  return (
    <div className="min-h-screen mt-28">
      <div>
        <div>
          <h3 className="text-center font-playfair text-4xl lg:text-6xl">
            All Properties
          </h3>
        </div>
        <p className="text-center p-4 lg:p-0 font-semibold capitalize lg:my-4 text-gray-400">
          welcome to a seamless home-buying experience , Browse from our
          collection for your Dream Property{""}
        </p>
        {/* search bar  */}
        <div className="relative">
          <div className="flex justify-center items-center">
            <input
              onChange={handleSearch}
              ref={searchRef}
              type="text"
              placeholder="Search title..."
              className="input input-bordered focus:outline-main  rounded-full block md:w-[40%] lg:w-[20%]"
            />
            <div className="-ml-10">
              <IoIosSearch className="text-2xl"></IoIosSearch>
            </div>
          </div>
          <div className=" flex justify-center my-4 -mb-8  xl:absolute right-1/2  xl:right-8 xl:-top-4">
            <SortButton sort={sort} setSort={setSort}></SortButton>
          </div>
        </div>
      </div>

      <div className="my-12">
        {isPending ? (
          <div className="mt-32 flex items-center justify-center ">
            <ThreeCircles
              height="100"
              width="100"
              color="#A9BEDA"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        ) : (
          <Container maxWidth="xl">
            {data.length ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
                {data &&
                  data.map((item) => (
                    <PropertyCard key={item._id} info={item}></PropertyCard>
                  ))}
              </div>
            ) : (
              <div>
                <h3 className="text-center font-semibold my-32 text-4xl text-gray-400">
                  No Property Available
                </h3>
              </div>
            )}
          </Container>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
