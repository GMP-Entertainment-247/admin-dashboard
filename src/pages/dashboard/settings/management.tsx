import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/shared/Button";
import Bin from "..//../../images/svg/bin.svg";
import { useSingleState } from "../../../utils/hooks/useSingleState";
import AddRoleModal from "./component/AddRoleModal";
import useFetch from "../../../utils/hooks/useFetch";
// import useMutation from "../../../utils/hooks/useMutation";
import { IPermissions, IRole } from "../../../interface/settings.interface";

export default function SettingsManagement() {
  const showModal = useSingleState(false)
  const {data: allRoles} = useFetch<IRole[]>("/admin/roles")
  // const createRole = useMutation("/admin/roles/create", "post")
  // const updateRole = useMutation("/admin/roles/update", "post")
  const {data: allPermissions} = useFetch<IPermissions[]>("/admin/permissions")

  console.log("All roles", allRoles);
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
          allRoles?.map((item, id) => (
            <div key={id}>
              <div className=" flex justify-between items-center  h-8 mt-10 mb-5">
                <div>
                  <p className="text-[16px] font-montserrat font-semibold ">
                    {item.name}
                  </p>
                  <p className="text-sm">Has the ability to reply incoming chats</p>
                </div>
                <img src={Bin} alt="bin" className="w-[32px] h-[32px]" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {allPermissions?.map((permission, idx) => (
                  <label key={idx} className="flex gap-2 ml-1 capitalize">
                    <input 
                      type="radio" 
                      className="accent-[#998100] scale-[1.5] cursor-pointer" 
                      defaultChecked={item.permissions.some(perm => perm.id === permission.id)}
                    />
                    {permission.name}
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
