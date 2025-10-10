import avater from "../../../../src/images/avatar.png";
import Button from "../../../components/shared/Button";

const profile = () => {
  return (
    <div className="bg-[#FFFFFF]">
      <div>
        <div className="flex bg-[#FFFFFF] align-middle items-center justify-between">
          <div className=" px-[20px] ">
            <div className="flex gap-[20px] " id="">
              <div className="grid">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
              </div>
              <div className="grid">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
               
                  className="w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
              </div>
            </div>
            <div className="flex gap-[20px] mt-[20px] " id="">
              <div className="grid">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Input your Email"
                
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
              </div>
              <div className="grid">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Input your location "
                  
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
              </div>
            </div>
            <div className="flex gap-[20px] mt-[20px]  " id="">
              <div className="grid">
                <label htmlFor="firstName">Contact</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="input phone number"
                 
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
              </div>
              <div className="grid">
                <label htmlFor="roles">Roles</label>
                <input
                  type="text"
                  name="roles"
                  placeholder="Input your role"
            
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
              </div>
            </div>
          </div>

            <div className="mr-[124px] flex flex-col justify-center items-center">
                <img
                src={avater}
                alt="profileAvatar"
                className="w-[120px] h-[120px] rounded-[50%]"
                />
                <p className=" mt-[22px] text-[16px] text-lg line-clamp-2">
                John Doe
                </p>
                <p className="mt-[8px]text-sm line-clamp-2">Admin</p>
            </div>
            </div>
        </div>
        <div className="mt-[50px] ml-[16px] ">
            <p className="border-b ">Password</p>

            <div className="flex gap-[20px] mt-[34px]  " id="">
            <div className="grid">
                <label>Current Password</label>
                <input
                type="password"
                name="currentPassword"
                placeholder="Input current password"
                className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
            </div>
            <div className="grid">
                <label>New Password</label>
                <input
                type="password"
                name="newPassword"
                placeholder="Input new password"
                className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
            </div>
            </div>

            <div className="flex gap-[20px] ">
            <div className=" mt-[20px] grid">
                <label className="">Confirm Password</label>
                <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter new password"
                className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                />
            </div>
            <div>
                <Button
                text="Update Password"
                type="submit"
                extraClassName="w-[169px] mt-14 "
                />
            </div>
        </div>
    </div>
</div>
);
};

export default profile;
