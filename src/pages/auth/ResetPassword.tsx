import { FormikProvider, useFormik } from "formik";
import AuthLayout from "./AuthLayout";
import { resetPasswordSchema } from "../../utils/validationSchema";
import { TextField } from "../../components/Form/TextField";
import { formProps } from "../../utils/helpers";
import Button from "../../components/Form/shared/Button";
import useMutation from "../../utils/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { authEmail } = useAuth();
  const resetPassword = useMutation("/admin-change-password", "post");

  const form = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validateOnMount: true,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      resetPassword
        .mutate({
          email: authEmail,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        })
        .then((resp) => {
          if (resp?.status) {
            navigate("/login");
          }
        });
    },
  });

  return (
    <AuthLayout
      title="Set a new password"
      subText="Create a strong password to secure your account. Make sure it’s something you’ll remember."
      authImage="/unsplash.png"
    >
      <FormikProvider value={form}>
        <form onSubmit={form.handleSubmit}>
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
            isLoading={resetPassword.loading}
            extraClassName="mt-10"
          />
        </form>
      </FormikProvider>
    </AuthLayout>
  );
}
