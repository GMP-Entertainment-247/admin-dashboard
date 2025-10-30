import avatar from "../../../images/svg/avatar.svg";
import { TextField } from "../../../components/Form/TextField";
import Button from "../../../components/shared/Button";
import { FormikProvider , useFormik } from "formik";
import { formProps } from "../../../utils/helpers";
import { resetPasswordSchema } from "../../../utils/validationSchema";

const Profile = () => {
      const form = useFormik({
      initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      contact: "",
      roles: "",
      location: "",
      password: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
       className :" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "

    },
        validateOnMount: true,
         validationSchema: resetPasswordSchema,
          onSubmit: (values) => { 
            // handleSubmit.mutate({
            //   email: values.email, 
            //   password: values.password, 
            // })
       
        }
  });


  return (
    <div className="bg-[#FFFFFF]">
      <FormikProvider value= {form} >
              {/* <form onSubmit={form.handleSubmit}>
                <TextField
                  label="Email address"
                  placeholder="Email address"
                  type="email"
                  {...formProps("email", form)}
                />
                  <TextField
                  label="First Name"
                  type="text"
                 
                  placeholder="First Name"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "firstName", form)} 
                  />
                  <TextField
                  label="Contacts"
                  type="text"
                  placeholder="Contacts"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "contacts", form)} 
                  />
                  <TextField
                  label="Roles"
                  type="text"
                 
                  placeholder="Roles"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "roles", form)} 
                  />
                  <TextField
                  label="Last Name"
                  type="text"
                 
                  placeholder="Input Last Name"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "lastName", form)} 
                  />
                
                  <TextField
                  label="Location"
                  type="text"
                 
                  placeholder="Input location"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "location", form)} 
                  />
                  <TextField
                  label="Password"
                  type="password"
                  
                  placeholder="Input Password"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "password", form)} 
                  />
                
              </form> */}
  
      <div>
        <div className="flex bg-[#FFFFFF] align-middle items-center justify-between">
          <div className=" px-[20px] ">
            <div className="flex gap-[20px] " id="">
             
                <TextField
                  label="First Name"
                  type="text"
                 labelColor="text-black"
                  placeholder="First Name"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "firstName", form)} 
                  />
              
             
               <TextField
                  label="Last Name"
                  type="text"
                  labelColor="text-black"
                  placeholder="Input Last Name"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "lastName", form)} 
                  />
             
            </div>
            <div className="flex gap-[20px] mt-[20px] " id="">
                <TextField 
                  label="Email address"
                  placeholder="Email address"
                  type="email"
                  labelColor="text-black"
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps("email", form)}
                />

                 <TextField
                  label="Location"
                  type="text"
                 labelColor="text-black"
                  placeholder="Input location"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "location", form)} 
                  />
            </div>

            <div className="flex gap-[20px] mt-[20px]  " id="">
              <div className="grid">
                {/* <label htmlFor="firstName">Contact</label> */}
                  <TextField
                  label="Contacts"
                  type="tel"
                  labelColor="text-black"
                  placeholder="input phone number"               
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "Contacts", form)} 
                  />
                
              </div>
              <div className="grid">
                
                 <TextField
                  label="Roles"
                  type="text"
                  labelColor="text-black"
                  placeholder="Input your role"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "Roles", form)} 
                  />
                
             
              </div>
            </div>
          </div>

            <div className="mr-[124px] flex flex-col justify-center items-center">
                <img
                src={avatar}
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
                
                  <TextField
                  label="Current Password"
                  type="password"
                 labelColor="text-black"
                  placeholder="Input Current Password"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "Password", form)} 
                  />
               
            </div>
            <div className="grid">
                
                  <TextField
                  label="New Password"
                  type="password"
                  labelColor="text-black"
                  placeholder="Input new Password"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "Password", form)} 
                  />
               
            </div>
            </div>

            <div className="flex gap-[20px] ">
            <div className=" mt-[20px] grid">
                
                  <TextField
                  label="Confirm Password"
                  labelColor="text-black"
                  type="password"
                  placeholder="Re-enter new password"             
                  className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
                  {...formProps( "Password", form)} 
                  />
               
            </div>
            <div>
                <Button
                text="Update Password"
                type="submit"
                extraClassName="w-[169px] mt-14 px-5 rounded-2 bg-[#998100] "
                />
            </div>
        </div>
    </div>
        </FormikProvider>
</div>
)
};

export default Profile;

