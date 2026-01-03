import clsx from "clsx";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface IBreadCrumb {
    title: string;
    links?: { label: string; path?: string }[]
    backNavigation?: string; //link to navigate to
}
export default function BreadCrumbs ({
    title,
    links,
    backNavigation,
}: IBreadCrumb) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between">
            <div 
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => backNavigation ? navigate(backNavigation) : navigate(-1)}
            >
                <ChevronLeftIcon />
                <p className="text-[20px] font-semibold">{title}</p>
            </div>
            {
                links && (
                    <div className="flex items-center">
                        {links.map((link, idx) => (
                            <div 
                                key={idx}
                                className={clsx(
                                    "flex items-center gap-2 text-base",
                                    !!link.path && "cursor-pointer text-[#D6B500] hover:underline"
                                )}
                            >
                                <p>{link.label}{idx===links.length-1 ? "":"/ "}</p>  
                            </div>
                        ))}
                    </div>
                ) 
            }
        </div>
    )
}