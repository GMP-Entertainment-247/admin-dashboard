import { FormikProvider, useFormik } from "formik";
import AuthLayout from "./AuthLayout";
import { forgotPasswordSchema } from "../../utils/validationSchema";
import { TextField } from "../../components/Form/TextField";
import { 
    // startCountdown, 
    formProps } from "../../utils/helpers";
import Button from "../../components/Form/shared/Button";
// import { useSingleState } from "../../utils/hooks/useSingleState";
// import { useEffect } from "react";
// import clsx from "clsx";
import useMutation from "../../utils/hooks/useMutation";
import { useNavigate } from "react-router-dom";



export default function ForgotPassword() {
    // const canResend = useSingleState(false);
    // const timer = useSingleState("00:00")
    const navigate = useNavigate();
    const sendEmail = useMutation("/admin-forgot-password", "post")

    // useEffect(()=>{
    //     triggerCountDown()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])

    // const triggerCountDown = () => {
    //     canResend.set(false)
    //     startCountdown(
    //         60,
    //         (time) => timer.set(time),
    //         () => canResend.set(true) 
    //     )
    // }

    const form = useFormik({
        initialValues: {
            email: "",
        },
        validateOnMount: true,
        validationSchema: forgotPasswordSchema,
        onSubmit: (values) => {
            console.log(values)
            sendEmail.mutate({
                ...values
            })
                .then(resp => {
                    if(resp?.status) navigate('/verify')
                })
        },
    });

    return (
        <AuthLayout
            title="Forgot password?"
            subText="Enter your email address and we'll send you a link to reset your password."
            authImage='/mic.png'
        >
            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit}>
                    <TextField
                        label="Email address"
                        placeholder="Email address"
                        type="email"
                        {...formProps("email", form)}
                    />
                    {/* <p className="text-xs text-center text-white">
                        <span
                            className={clsx(canResend.get && "text-[#E6C200] cursor-pointer font-bold")}
                            onClick={()=>triggerCountDown()}
                        >Resend code</span>
                        {" "} 
                        {
                            !canResend.get &&
                            <span>in <span className="text-[#E6C200] font-medium">{timer.get}</span></span>
                        }
                    </p> */}
                    <Button 
                        text="Continue"
                        type="submit"
                        isLoading={sendEmail.loading}
                        extraClassName="mt-10"
                    />
                </form>
            </FormikProvider>
        </AuthLayout>
    );
}
