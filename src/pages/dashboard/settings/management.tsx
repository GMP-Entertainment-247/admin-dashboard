import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/shared/Button";
import Bin from "..//../../images/svg/bin.svg";
import { useSingleState } from "../../../utils/hooks/useSingleState";
import AddRoleModal from "./component/AddRoleModal";

export default function SettingsManagement() {
  const showModal = useSingleState(false)

  return (
    <>
      <div className="mx-6">
        <div className="flex justify-end">
          <Button
            text={
              <div>
                <PlusIcon className=" w-5 h-5 mr-1 inline-block " />
                <span className=" align-middle "> Add</span>
              </div>
            }
            extraClassName="!w-fit !bg-[#998100] !min-h-10 px-2.5 !rounded"
            onClick={() => showModal.set(true)}
          />
        </div>
        {
          [
            {
              name: "Super Admin",
              permissions: [
                "Can create blog",
                "Can view booking request",
                "Can reply assigned messages",
                "Can approve/decline certain tasks",
                "Can view certain profiles",
              ],
            },
            {
              name: "Super Admin",
              permissions: [
                "Can create blog",
                "Can view booking request",
                "Can reply assigned messages",
                "Can approve/decline certain tasks",
                "Can view certain profiles",
              ],
            },
          ].map((item, id) => (
            <div key={id}>
              <div className=" flex justify-between items-center  h-8 mt-10 mb-2">
                <p className="text-[16px] font-montserrat font-semibold ">
                  {item.name}
                </p>
                <img src={Bin} alt="bin" className="w-[32px] h-[32px]" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {item.permissions.map((permission, idx) => (
                  <label key={idx} className="flex gap-2 ml-1">
                    <input type="radio" className="accent-[#998100] scale-[1.5] cursor-pointer" />
                    {permission}
                  </label>
                ))}
              </div>
            </div>
          ))
        }
      </div>
      <AddRoleModal 
          show={showModal.get}
          closeModal={()=>showModal.set(false)}
      />
    </>
  );
}
