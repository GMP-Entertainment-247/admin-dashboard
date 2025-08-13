import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useState } from "react";
// import unsplash from '../../../public/unsplash.png'; // Adjust the path as necessary

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = () => {
    if (!email) {setError('input a proper email format')}
  else if (!regex.test(email)) {setError('input a valid email')}
else {
  setError('');
  alert("Login successful!")

  login(); 
  navigate("/dashboard")
};
  };
  const [rememberMe, setRememberMe] = useState(false);
  const [ email, setEmail] = useState('')
  const [ error, setError] = useState('')

  const handleSelect = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <AuthLayout>
      <div className="bg-gradient-to-r from-[#14000F] via-[#4D340C]  to-[#7A6700] h-[1024px] flex items-center justify-center w-full">
        <div className="flex  rounded-[40px] w-[1000px] h-[560px]  ">
          <div className=" w-[560px] bg-gradient from-[#f6f6f6] to-[#7A6700]  border  border-white/10  bg-white/10  rounded-l-[40px]">
            <div className="my-[67px] w-[402px] h-[426px] mx-[80px]  ">
              <h2 className="text-[#FEFEFE] font-league-spartan text-[32px] leading-[28px] font-[600] mb-[7px]">
                Login your account
              </h2>
              <p className=" font-[400] w-[400px] leading-[20px] text-[16px] mt-[7px] text-[#FFFFFF] ">
                Access your dashboard and continue where you <br /> left off.
              </p>

              <form action="" className="my-[40px]">
                <div className="mb-[20px]">
                  <label
                    htmlFor="Email"
                    id="Email"
                    className="font-500 text-[16px] leading-100% font-montserrat block mb-[12px] text-white"
                  >
                    {" "}
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-[400px] h-[52px] pl-[16px] rounded-[12px] border "
                  />
                </div>

                <div className="relative mb-[20px]">
                  <label
                    htmlFor="Email"
                    id="password"
                    className="font-500 text-[16px] leading-100% font-montserrat block mb-[12px] text-white"
                  >
                    {" "}
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-[400px] h-[52px] pl-[16px] rounded-[12px] border "
                  />
                </div>

                <div className="flex justify-between text-sm items-center">
                  <label className="flex items-center  text-white gap-[5px] cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={handleSelect}
                      checked={rememberMe}
                      className="accent-black  "
                    />
                    Remember me
                  </label>

                  <a href="/" className="text-white hover:underline">
                    Forgot password?
                  </a>
                </div>
              </form>
              {error && <div className="text-red-600 text-sm mt-2 text-center">{error}</div>}
              {/* <button onClick={handleLogin} className="bg-yellow-500 text-black w-full py-2 rounded mt-4 hover:bg-yellow-600 transition">
                Login
              </button> */}
              <button
                onClick={handleLogin}
                className=" w-[402px] h-[47px] bg-[#BFA100] rounded-[16px] items-center"
              >
                Log in
              </button>
            </div>
          </div>

          <div className="w-[440px]  rounded-r-[40px]">
            <img src="/unsplash.png" alt="mic" className="  rounded-r-[40px]" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
