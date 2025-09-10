
import { ReactNode } from 'react';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout ({children}: DashboardLayoutProps) {
    return (
        <div className='bg-[#F1F1F1] min-h-[100vh]'>
            {children}
        </div>
    )
}