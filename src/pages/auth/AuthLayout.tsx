
import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout ({children}: AuthLayoutProps) {
    return (
        <div className='bg-gradient-radial from-[#7A6700] to-[#4D340C] '>

            {children}
        </div>
    )
}