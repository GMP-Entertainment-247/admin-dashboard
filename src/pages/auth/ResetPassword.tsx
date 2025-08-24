import { FormikProvider, useFormik } from "formik";
import AuthLayout from "./AuthLayout";
import { resetPasswordSchema } from "../../utils/validationSchema";
import { TextField } from "../../components/Form/TextField";
import { formProps } from "../../utils/helpers";
import Button from "../../components/Form/shared/Button";



export default function ResetPassword() {
  const form = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validateOnMount: true,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  });

  return (
    <AuthLayout
      title="Set a new password"
      subText="Create a strong password to secure your account. Make sure it’s something you’ll remember."
      authImage='/unsplash.png'
    >
      <FormikProvider value={form}>
        <form>
          <TextField
            label="New password"
            placeholder="New password"
            type="password"
            {...formProps("newPassword", form)}
          />
          <div className="max-[560px]:mt-2.5">
            <TextField
                label="Confirm password"
                placeholder="Confirm password"
                type="password"
                {...formProps("confirmPassword", form)}
            />
          </div>
          <Button 
            text="Continue"
            type="submit"
            // isLoading
            extraClassName="mt-10"
          />
        </form>
      </FormikProvider>
    </AuthLayout>
  );
}
