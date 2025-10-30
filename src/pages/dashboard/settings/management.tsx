import Button from "../../../components/shared/Button";
import Bin from "..//../../images/svg/bin.svg";

export default function SettingsManagement() {
  return (
    <>
      <div className=" mx-[28px]">
        <div className=" flex justify-end">
          <Button
            text=" + Add "
            extraClassName="w-[143px]  h-[51px] float-end bg-[#998100] "
          />
        </div>
        <div className=" flex justify-between items-center  h-8 mx-7 mt-5 mb-2">
          <p className="text-[16px] font-montserrat font-semibold ">
            Super Admin
          </p>
          <img src={Bin} alt="bin" className=" w-[32px] h-[32px]" />
        </div>

        <div className=" grid grid-cols-2 gap-4 mt-[20px] mx-[20px]">
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can create blog
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can create blog
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can view booking request
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can view booking request
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can reply assigned messages
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can reply assigned messages
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can approve/decline certain tasks
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can approve/decline certain tasks
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can view certain profiles
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can view certain profiles
          </label>
        </div>
        <div className=" flex justify-between items-center mt-[60px] mx-[28px]">
          <p className="text-[16px] font-montserrat font-semibold"> Admin Role1</p>
          <img src={Bin} alt="bin" className=" w-[32px] h-[32px]" />
        </div>

        <div className=" grid grid-cols-2 gap-4 mt-[20px] mx-[20px]">
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can create blog
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can create blog
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can view booking request
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can view booking request
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can reply assigned messages
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can reply assigned messages
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can approve/decline certain tasks
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can approve/decline certain tasks
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can view certain profiles
          </label>
          <label htmlFor="" className="flex gap-2">
            <input type="radio" />
            Can view certain profiles
          </label>
        </div>
      </div>
    </>
  );
}
