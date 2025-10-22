import { ChevronDownIcon } from "@heroicons/react/24/outline";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export default function Dropdown ({
    triggerComponent,
    triggerText,
    paramKey,
    options,
}: {
    triggerComponent?: ReactNode,
    triggerText?: string,
    paramKey?: string,
    options: {
        label: string, 
        value: string | number,
        action?: () => void,
    }[]
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    // const paramVal = searchParams.get(paramKey??"")

    const handleParamUpdate = (value: string) => {
        searchParams.set(paramKey??"", value);
        setSearchParams(searchParams);
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                {
                    triggerComponent ? triggerComponent :
                    <div 
                        className="bg-[#F5F5F5] cursor-pointer text-sm px-3 py-2 max-[769px]:px-2 max-[769px]:py-1.5 rounded flex items-center gap-1.5 max-[769px]:text-xs"
                    >
                        <span>{triggerText}</span>
                        <ChevronDownIcon className="w-5 text-[#212121] max-[769px]:w-4" />
                    </div>
                }
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content 
                    side="bottom" 
                    align="end" 
                    sideOffset={5}
                    className="bg-white rounded shadow-lg p-2 min-w-[150px] z-50"
                >
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={clsx(
                                "px-3 py-2 hover:bg-[#F9F6E6] rounded text-sm max-[769px]:text-xs cursor-pointer font-montserrat",
                                // paramVal===opt.value && "bg-[#F9F6E6]",
                            )}
                            onClick={() => {
                                if (paramKey) {
                                    handleParamUpdate(opt.value.toString())
                                } else if (opt.action) {
                                    opt.action();
                                }
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}