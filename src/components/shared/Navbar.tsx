import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { Bell, Search } from "lucide-react";
import avater from "../../../src/images/avatar.png";

const Navbar = () => {
  const [query, setQuery] = useState("");

  const fetchResults = async (query: string) => {
    const { data } = await axios.get(`/search?query=${query}`);
    return data;
  };
  const { data } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchResults(query),
    enabled: !!query,
  });
  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    300
  );

  return (
    <div className="w-[1144px] ml-[276px] ">
      <div className=" flex justify-between gap-[200px] align-middle  h-[80px] my-[20px] mr-[20px] bg-[#FFFFFF] rounded-[8px] border  shadow-md">
        <div
          id="search"
          className=" flex justify-around   rounded-[8px] opacity-1 "
        >
          <Search className="relative top-[30px] left-[30px] " />
          <input
            type="search"
            onChange={handleChange}
            name=""
            id=""
            placeholder="Search anything  |"
            className="w-[376px] h-[46px] my-[17px]  pl-[48px] rounded-[8px] bg-[#F5F5F5] opacity-1 border outline-none"
          />
        </div>
        {/*right side*/}
        <div className=" flex justify-between align-middle content-center gap-[2px] mt-[24px] mr-[20px] ">
          <Bell className="mt-2 w-[24px] h-[24px]  " />
          <div className="flex gap-[20px] ">
            <p className="h-[46px] ">
              {" "}
              Hi 🖐 <br />
              John Doe{" "}
            </p>

            <img
              src={avater}
              alt="profileAvatar"
              className="w-[40px] h-[40px] rounded-[50%]  "
            />
          </div>
        </div>
      </div>

      {data && query && (
        <div className="absolute mt-2 bg-white border rounded-lg shadow-md w-[367px]">
          {data.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {data.map((item: string, index: number) => (
                <li
                  key={index}
                  className="p-2 hover:bg-purple-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-2 text-sm text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
