// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import AuthLayout from "./AuthLayout";
import { loginSchema } from "../../utils/validationSchema";
import { TextField } from "../../components/Form/TextField";
import { formProps } from "../../utils/helpers";
import Button from "../../components/Form/shared/Button";



export default function Login() {
  // const { login } = useAuth();
  // const navigate = useNavigate();

  // const handleLogin = () => {
  //   login();
  //   navigate('/dashboard');
  // };
  
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validateOnMount: true,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  });

  return (
    <AuthLayout
      title="Login your account"
      subText="Access your dashboard and continue where you left off."
      authImage='/unsplash.png'
    >
      <FormikProvider value={form}>
        <form>
          <TextField
            label="Email address"
            placeholder="Email address"
            type="email"
            {...formProps("email", form)}
          />
          <TextField
            label="Password"
            placeholder="Password"
            type="password"
            {...formProps("password", form)}
          />
          <div className="flex justify-between items-center text-xs text-white">
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 border border-[#F4F4F44D] rounded-full flex justify-center items-center cursor-pointer"
                onClick={()=>{
                  form.setFieldValue("rememberMe", !form.values.rememberMe)
                }}
              >
                {
                  form.values.rememberMe &&
                  <div className="bg-[#F4F4F4] rounded-full w-3 h-3" />
                }
              </div>
              <span className="bg-[#F4F4F4] font-medium "> Remember me </span>
            </div>
            <p className="font-medium cursor-pointer">Forgot Password</p>
          </div>
          <Button 
            text="Login"
            // isLoading
            extraClassName="mt-10"
          />
        </form>
      </FormikProvider>
    </AuthLayout>
  );
}
