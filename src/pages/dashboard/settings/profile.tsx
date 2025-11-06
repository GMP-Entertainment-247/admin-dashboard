import avatar from "../../../images/svg/avatar.svg";
import { TextField } from "../../../components/Form/TextField";
import Button from "../../../components/shared/Button";
import { FormikProvider , useFormik } from "formik";
import { formProps } from "../../../utils/helpers";
import { changePasswordSchema } from "../../../utils/validationSchema";
import useFetch from "../../../utils/hooks/useFetch";
import clsx from "clsx";
import useMutation from "../../../utils/hooks/useMutation";
import { PencilLine } from "lucide-react";
import { IProfile } from "../../../interface/settings.interface";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef } from "react";
import { useProfile } from "../../../context/ProfileContext";

const Profile = () => {
  const {data, refetch: refetchProfile} = useFetch<IProfile>("/admin/info")
  const updateProfile = useMutation("/admin/update-info", "post")
  const updatePassword = useMutation("/admin/change-password", "post")
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setProfile } = useProfile();

  useEffect(() => {
    setProfile(data ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      form.setFieldValue("profile_picture_url", file);
      console.log("Selected file:", imageUrl, file, new URL(imageUrl));
      
    }
  };
  
  const form = useFormik({
    initialValues: {
      firstName: data?.first_name ?? "",
      lastName: data?.last_name ?? "",
      email: data?.email ?? "",
      contact: data?.phone ?? "",
      roles: "Admin",
      location: data?.location ??"",
      profile_picture_url: data?.profile_picture_url ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => { 
      const payload = new FormData();
      payload.append("first_name", values.firstName);
      payload.append("last_name", values.lastName);
      payload.append("email", values.email);
      payload.append("phone", values.contact);
      payload.append("location", values.location);
      if (!!values.profile_picture_url) {
        payload.append("image", values.profile_picture_url);
      }
      updateProfile.mutate(payload)
      .then(res => {
          queryClient.invalidateQueries({queryKey: [
              "/admin/info"
          ]})
          refetchProfile()
        }
      )
    }
  });

  const passwordForm = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      password_confirmation: "",
    },
    validateOnMount: true,
    validationSchema: changePasswordSchema,
    onSubmit: (values) => { 
      updatePassword.mutate(values)
      passwordForm.resetForm()
    }
  });

  return (
    <div className="bg-[#FFFFFF] px-6 relative">
      <FormikProvider value= {form} >
        <form onSubmit={form.handleSubmit}>
          <div className="flex gap-10">
            <div className="w-[740px] grid grid-cols-2 gap-[20px]">
              <TextField
                label="First Name"
                labelColor="text-black"
                type="text"          
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "firstName", form)} 
              />
              <TextField
                label="Last Name"
                labelColor="text-black"
                type="text"          
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "lastName", form)} 
              />
              <TextField
                label="Email Address"
                labelColor="text-black"
                type="email"         
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "email", form)} 
                readOnly
              />
              <TextField
                label="Location"
                labelColor="text-black"
                type="text"            
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "location", form)} 
              />
              <TextField
                label="Contact"
                labelColor="text-black"
                type="text"         
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "contact", form)} 
              />
              <TextField
                label="Roles"
                labelColor="text-black"
                type="text"         
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "roles", form)} 
                readOnly
              />
            </div>
            <div className="flex flex-col justify-center items-center w-[calc(100%-740px)]">
              <div className="relative">
                <div 
                  className={clsx(
                    "w-[120px] h-[120px] rounded-[50%] overflow-hidden",
                    !!form.values.profile_picture_url && "border border-[#999999]"
                  )}
                >
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <img
                    src={
                      !!form.values.profile_picture_url ?
                      (
                        (form.values.profile_picture_url as any)  instanceof File ?
                        URL.createObjectURL(form.values.profile_picture_url as any)
                        : form.values.profile_picture_url
                      )
                      : avatar
                    }
                    alt="profileAvatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div onClick={()=>fileInputRef.current?.click()} className="absolute right-0 bottom-0 w-10 h-10 bg-[#BFA100] text-white text-center py-1 flex items-center justify-center rounded-full cursor-pointer">
                  <PencilLine />
                </div>
              </div>
              <p className="mt-[22px] text-[16px] text-lg line-clamp-2">
                {data?.first_name} {data?.last_name}
              </p>
              <p className="mt-[8px] text-sm line-clamp-2">{form.values.roles}</p>
            </div>
          </div>

          {
            JSON.stringify(form.values) !== JSON.stringify(form.initialValues) &&
            <div className="w-full absolute -left-0 -bottom-[130px]">
                <div className="flex justify-end gap-3 bg-white p-5 rounded-lg mt-5">
                    <Button 
                        text="Discard Changes"
                        extraClassName="rounded-[8px] !font-bold !w-fit px-5 !min-h-10 !text-[#EB2904] !bg-[#FFE5E5]"
                        onClick={()=> form.resetForm() }
                    />
                    <Button 
                        text="Save Changes"
                        extraClassName="rounded-[8px] !font-bold !w-fit px-5 !min-h-10"
                        type="submit"
                        isLoading={updateProfile.loading}
                    />
                </div>
            </div>
          }
        </form> 
      </FormikProvider>
      <FormikProvider value={passwordForm} >
        <form onSubmit={passwordForm.handleSubmit}>
          <div className="mt-[50px]">
            <p className="border-b">Password</p>
            <div className="grid grid-cols-2 gap-[20px] mt-[20px] w-[740px]">
              <TextField
                label="Current Password"
                labelColor="text-black"
                type="password"          
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "current_password", passwordForm)} 
                passwordIconClassName="!text-[#999999]"
              />
              <TextField
                label="New Password"
                labelColor="text-black"
                type="password"          
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "new_password", passwordForm)} 
                passwordIconClassName="!text-[#999999]"
              />
              <TextField
                label="Confirm Password"
                labelColor="text-black"
                type="password"
                extraClassName="w-full border !border-[#999999] !text-[#999999]"
                {...formProps( "password_confirmation", passwordForm)} 
                passwordIconClassName="!text-[#999999]"
              />
              <div>
                <Button
                  text="Update Password"
                  type="submit"
                  extraClassName="!w-fit px-6 !rounded-[12px] mt-8"
                  isLoading={updatePassword.loading}
                />
              </div>
            </div>
          </div>
        </form> 
      </FormikProvider>
    </div>
  )
};

export default Profile;

