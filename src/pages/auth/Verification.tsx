import { FormikProvider, useFormik } from "formik";
import AuthLayout from "./AuthLayout";
import { verifyOTPSchema } from "../../utils/validationSchema";
import { TextField } from "../../components/Form/TextField";
import { startCountdown, formProps } from "../../utils/helpers";
import Button from "../../components/Form/shared/Button";
import { useSingleState } from "../../utils/hooks/useSingleState";
import { useEffect } from "react";
import clsx from "clsx";
import useMutation from "../../utils/hooks/useMutation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import loader from "../../images/gif/white-loader.gif";

export default function Verification() {
    const canResend = useSingleState(false);
    const timer = useSingleState("00:00")
    const navigate = useNavigate();
    const verifyOTP = useMutation("/admin-verify-password-otp", "post"); 
    const resendOTP = useMutation("/admin-resend-password-otp", "post"); 
    const { authEmail } = useAuth();

    useEffect(()=>{
        triggerCountDown()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const triggerCountDown = () => {
        canResend.set(false)
        startCountdown(
            60,
            (time) => timer.set(time),
            () => canResend.set(true) 
        )
    }

    const form = useFormik({
        initialValues: {
            otp: "",
        },
        validateOnMount: true,
        validationSchema: verifyOTPSchema,
        onSubmit: (values) => {
            verifyOTP.mutate({
                otp: values.otp,
                email: authEmail
            })
                .then(resp => {
                    if(resp?.status) navigate('/reset-password')
                })
        },
    });

    const handleResend = () => {
        resendOTP.mutate({
            email: authEmail
        })
            .then(resp => {
                if(resp?.status) triggerCountDown()
            })
    }

    return (
        <AuthLayout
            title="Let’s verify it’s you"
            subText="Enter the 6-digit code we sent to your email to continue."
            authImage='/keyboard.png'
        >
            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit}>
                    <TextField
                        label="Enter OTP"
                        placeholder="Enter code"
                        {...formProps("otp", form)}
                    />
                    {
                        resendOTP.loading ?
                        <img src={loader} alt="loader" className="block mx-auto w-4" />
                        :
                        <p className="text-xs text-center text-white">
                            <span
                                className={clsx(canResend.get && "text-[#E6C200] cursor-pointer font-bold")}
                                onClick={()=>{
                                    if(timer.get==="00:00") handleResend()
                                }}
                            >Resend code</span>
                            {" "} 
                            {
                                !canResend.get &&
                                <span>in <span className="text-[#E6C200] font-medium">{timer.get}</span></span>
                            }
                        </p>
                    }
                    <Button 
                        text="Continue"
                        type="submit"
                        isLoading={verifyOTP.loading}
                        extraClassName="mt-10"
                    />
                </form>
            </FormikProvider>
        </AuthLayout>
    );
}
