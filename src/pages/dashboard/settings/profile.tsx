// import avater from "../../../images/svg/avater.svg";
// import { TextField } from "../../../components/Form/TextField";
// import Button from "../../../components/shared/Button";
// import { FormikProvider , useFormik } from "formik";
// import { formProps } from "../../../utils/helpers";
// import { resetPasswordSchema } from "../../../utils/validationSchema";

// const Profile = () => {
//       const form = useFormik({
//       initialValues: {
//       email: "",
//       firstName: "",
//       lastName: "",
//       contact: "",
//       roles: "",
//       location: "",
//       password: "",
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//        className :" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "

//     },
//         validateOnMount: true,
//          validationSchema: resetPasswordSchema,
//           onSubmit: (values) => { 
//             // handleSubmit.mutate({
//             //   email: values.email, 
//             //   password: values.password, 
//             // })
       
//         }
//   });


//   return (
//     <div className="bg-[#FFFFFF]">
//       <FormikProvider value= {form} >
//               <form onSubmit={form.handleSubmit}>
//                 <TextField
//                   label="Email address"
//                   placeholder="Email address"
//                   type="email"
//                   {...formProps("email", form)}
//                 />
//                   <TextField
//                   label="First Name"
//                   type="text"
                 
//                   placeholder="First Name"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "firstName", form)} 
//                   />
//                   <TextField
//                   label="Contacts"
//                   type="text"
//                   placeholder="Contacts"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "contacts", form)} 
//                   />
//                   <TextField
//                   label="Roles"
//                   type="text"
                 
//                   placeholder="Roles"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "roles", form)} 
//                   />
//                   <TextField
//                   label="Last Name"
//                   type="text"
                 
//                   placeholder="Input Last Name"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "lastName", form)} 
//                   />
                
//                   <TextField
//                   label="Location"
//                   type="text"
                 
//                   placeholder="Input location"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "location", form)} 
//                   />
//                   <TextField
//                   label="Password"
//                   type="password"
                  
//                   placeholder="Input Password"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "password", form)} 
//                   />
                
//               </form>
  
//       <div>
//         <div className="flex bg-[#FFFFFF] align-middle items-center justify-between">
//           <div className=" px-[20px] ">
//             <div className="flex gap-[20px] " id="">
             
//                 <TextField
//                   label="First Name"
//                   type="text"
                 
//                   placeholder="First Name"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "firstName", form)} 
//                   />
              
             
//                <TextField
//                   label="Last Name"
//                   type="text"
                  
//                   placeholder="Input Last Name"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "lastName", form)} 
//                   />
             
//             </div>
//             <div className="flex gap-[20px] mt-[20px] " id="">
//                 <TextField 
//                   label="Email address"
//                   placeholder="Email address"
//                   type="email"
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps("email", form)}
//                 />

//                  <TextField
//                   label="Location"
//                   type="text"
                 
//                   placeholder="Input location"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "location", form)} 
//                   />
//             </div>

//             <div className="flex gap-[20px] mt-[20px]  " id="">
//               <div className="grid">
//                 <label htmlFor="firstName">Contact</label>
//                   <TextField
//                   label="Contacts"
//                   type="tel"
//                   placeholder="input phone number"               
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "Contacts", form)} 
//                   />
                
//               </div>
//               <div className="grid">
                
//                  <TextField
//                   label="Roles"
//                   type="text"
//                   placeholder="Input your role"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "Roles", form)} 
//                   />
                
             
//               </div>
//             </div>
//           </div>

//             <div className="mr-[124px] flex flex-col justify-center items-center">
//                 <img
//                 src={avater}
//                 alt="profileAvatar"
//                 className="w-[120px] h-[120px] rounded-[50%]"
//                 />
//                 <p className=" mt-[22px] text-[16px] text-lg line-clamp-2">
//                 John Doe
//                 </p>
//                 <p className="mt-[8px]text-sm line-clamp-2">Admin</p>
//             </div>
//             </div>
//         </div>
//         <div className="mt-[50px] ml-[16px] ">
//             <p className="border-b ">Password</p>

//             <div className="flex gap-[20px] mt-[34px]  " id="">
//             <div className="grid">
                
//                   <TextField
//                   label="Current Password"
//                   type="password"
                 
//                   placeholder="Input Current Password"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "Password", form)} 
//                   />
               
//             </div>
//             <div className="grid">
                
//                   <TextField
//                   label="New Password"
//                   type="password"
                  
//                   placeholder="Input new Password"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "Password", form)} 
//                   />
               
//             </div>
//             </div>

//             <div className="flex gap-[20px] ">
//             <div className=" mt-[20px] grid">
                
//                   <TextField
//                   label="Confirm Password"
//                   type="password"
                 
//                   placeholder="Re-enter new password"             
//                   className=" w-[360px] h-[50px] border border-[#999999] rounded-[8px] mt-[12px] pl-[8px] "
//                   {...formProps( "Password", form)} 
//                   />
               
//             </div>
//             <div>
//                 <Button
//                 text="Update Password"
//                 type="submit"
//                 extraClassName="w-[169px] mt-14 px-5 rounded-2 bg-[#998100] "
//                 />
//             </div>
//         </div>
//     </div>
//         </FormikProvider>
// </div>
// )
// };

// export default Profile;


import avater from "../../../images/svg/avater.svg";
import { TextField } from "../../../components/Form/TextField";
import Button from "../../../components/shared/Button";
import { FormikProvider, useFormik } from "formik";
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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validateOnMount: true,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // handleSubmit.mutate(values)
    },
  });

  return (
    <div className="bg-white">
      <FormikProvider value={form}>
        <form onSubmit={form.handleSubmit}>
          <div className="flex items-center justify-between bg-white">
            <div className="px-5">
              <div className="flex gap-5">
                <TextField
                  label="First Name"
                  placeholder="First Name"
                  {...formProps("firstName", form)}
                />
                <TextField
                  label="Last Name"
                  placeholder="Last Name"
                  {...formProps("lastName", form)}
                />
              </div>

              <div className="flex gap-5 mt-5">
                <TextField
                  label="Email"
                  type="email"
                  placeholder="Email address"
                  {...formProps("email", form)}
                />
                <TextField
                  label="Location"
                  placeholder="Location"
                  {...formProps("location", form)}
                />
              </div>

              <div className="flex gap-5 mt-5">
                <TextField
                  label="Contact"
                  type="tel"
                  placeholder="Phone number"
                  {...formProps("contact", form)}
                />
                <TextField
                  label="Role"
                  placeholder="Your role"
                  {...formProps("roles", form)}
                />
              </div>
            </div>

            <div className="mr-[124px] flex flex-col items-center">
              <img
                src={avater}
                alt="Profile Avatar"
                className="w-[120px] h-[120px] rounded-full"
              />
              <p className="mt-5 text-lg">John Doe</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>

          <div className="mt-12 px-5">
            <p className="border-b pb-2 font-semibold">Password</p>

            <div className="flex gap-5 mt-5">
              <TextField
                label="Current Password"
                type="password"
                placeholder="Current password"
                {...formProps("currentPassword", form)}
              />
              <TextField
                label="New Password"
                type="password"
                placeholder="New password"
                {...formProps("newPassword", form)}
              />
            </div>

            <div className="flex gap-5 mt-5">
              <TextField
                label="Confirm Password"
                type="password"
                placeholder="Re-enter new password"
                {...formProps("confirmPassword", form)}
              />
              <Button
                text="Update Password"
                type="submit"
                extraClassName="w-[169px] mt-14 px-5 rounded-2 bg-[#998100]"
              />
            </div>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default Profile;
