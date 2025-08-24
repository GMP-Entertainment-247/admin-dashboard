import { FormikProvider, useFormik } from "formik";
import AuthLayout from "./AuthLayout";
import { verifyOTPSchema } from "../../utils/validationSchema";
import { TextField } from "../../components/Form/TextField";
import { startCountdown, formProps } from "../../utils/helpers";
import Button from "../../components/Form/shared/Button";
import { useSingleState } from "../../utils/hooks/useSingleState";
import { useEffect } from "react";
import clsx from "clsx";



export default function Verification() {
    const canResend = useSingleState(false);
    const timer = useSingleState("00:00")

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
            console.log(values)
        },
    });

    return (
        <AuthLayout
            title="Let’s verify it’s you"
            subText="Enter the 6-digit code we sent to your email to continue."
            authImage='/keyboard.png'
        >
            <FormikProvider value={form}>
                <form>
                    <TextField
                        label="Enter OTP"
                        placeholder="Enter code"
                        {...formProps("otp", form)}
                    />
                    <p className="text-xs text-center text-white">
                        <span
                            className={clsx(canResend.get && "text-[#E6C200] cursor-pointer font-bold")}
                            onClick={()=>triggerCountDown()}
                        >Resend code</span>
                        {" "} 
                        {
                            !canResend.get &&
                            <span>in <span className="text-[#E6C200] font-medium">{timer.get}</span></span>
                        }
                    </p>
                    <Button 
                        text="Continue"
                        // isLoading
                        extraClassName="mt-10"
                    />
                </form>
            </FormikProvider>
        </AuthLayout>
    );
}
