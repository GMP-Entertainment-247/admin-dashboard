import React from "react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Bell, Search } from "lucide-react";
import avater from "../../../src/images/avatar.png";


const Navbar = () => {
  const [query, setQuery] = useState("");
  console.log(query)

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    300
  );

  return (
    <div className="">
      <div className="flex items-center justify-between h-[80px] px-5 bg-[#FFFFFF] rounded-[8px] border shadow-md">
        <div className="flex items-center gap-2.5 px-2.5 rounded-[8px] bg-[#F5F5F5] h-[46px] w-[360px]">
          <Search className="w-6 h-6" />
          <input
            onChange={handleChange}
            placeholder="Search anything"
            className="w-full bg-transparent outline-none placeholder:text-[#4D4D4D]"
          />
        </div>
        {/*right side*/}
        <div className="flex justify-between items-center gap-5">
          <Bell className="w-[24px] h-[24px]" />
          <div className="flex items-center gap-[20px]">
            <p className="test-sm">
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
    </div>
  );
};

export default Navbar;
