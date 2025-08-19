import { ReactNode } from "react";

type AuthLayoutProps = {
    title: string;
    subText: string;
    authImage?: string;
    children: ReactNode;
};

export default function AuthLayout({ title, subText, authImage, children }: AuthLayoutProps) {
    return (
        <div className="bg-gradient-to-r from-[#14000F] via-[#4D340C]  to-[#7A6700] h-[100vh] flex items-center justify-center w-full">
            <div className="flex rounded-[40px] overflow-hidden w-[1000px] min-h-[560px]">
                <div className="bg-white/10">
                    <div className="w-full p-[60px]">
                        <h2 className="text-[#FEFEFE] font-league_spartan text-[32px] leading-[28px] font-semibold mb-2.5">
                            {title}
                        </h2>
                        <p className="font-[400] leading-[20px] text-[16px] text-[#FFFFFF] ">
                            {subText}
                        </p>
                        <div className="mt-10">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="w-[440px] rounded-r-[40px] overflow-hidden">
                    <img
                        src={authImage}
                        alt="mic"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
