import Pagination from "./Pagination";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../shared/Button";

interface ITable<TRow> {
    tableTitle: string;
    searchPlaceHolder?: string;
    slot?: React.ReactNode;
    isLoading?: boolean;
    data: TRow[];
    rows: {
        header: string;
        view: (item: TRow, index: number) => React.ReactNode;
    }[];
    totalPages?: number;
    isPreview?: boolean;
    seeMoreLink?: string;
}

export default function Table <TRow extends {}> ({
    tableTitle,
    searchPlaceHolder="Search",
    slot,
    isLoading=false,
    data,
    rows,
    totalPages=1,
    isPreview=false,
    seeMoreLink="",
}: ITable<TRow>) {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") ?? ""

    const debounced = useDebouncedCallback((e) => {
        searchParams.set("search", e.target.value);
        setSearchParams(searchParams);
    }, 1000);

    return(
        <div className="bg-white rounded-xl">
            <div className="flex items-center px-5 py-4 max-[769px]:px-2.5 max-[769px]:flex-col max-[769px]:items-start">
                <h4 className="text-[22px] font-semibold mr-10">{tableTitle}</h4>
                <div className="flex gap-4 items-center justify-between w-full max-[769px]:flex-col max-[769px]:items-start">
                    <div className="rounded flex w-[230px] max-[769px]:w-full h-9 items-center px-[6px] py-[2px] border border-solid border-[#BABABA] border-box">
                        <MagnifyingGlassIcon className="w-4" />
                        <input 
                            placeholder={searchPlaceHolder} 
                            onChange={debounced} 
                            defaultValue={search}
                            className="flex-1 bg-transparent outline-none border-0 pl-1 font-normal text-xs text-black placeholder:text-[#BFBFBF]"
                        />
                    </div>
                    <div>{slot}</div>
                </div>
            </div>
            <div className="border-box pb-[15px] relative rounded-b-lg capitalize">
                {
                    isLoading &&
                    <div className=" h-1 bg-white absolute w-full overflow-hidden">
                        <div className="h-1 bg-primary loader-loop"></div>
                    </div>
                }
                {
                    data?.length!>0 ?
                    <div>
                        <div className="overflow-x-auto">
                            <table className="w-[100%]">
                                <thead className="bg-[#F9F6E6]">
                                    <tr>
                                        {
                                            rows.map((item, idx)=>(
                                                <th 
                                                    className="py-[12px] px-[10px] text-[#212121] font-medium text-left text-base capitalize whitespace-nowrap max-[769px]:text-xs"
                                                    key={idx}
                                                >
                                                    {item.header}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (isPreview ? data.slice(0, 5) : data).map((item, itemIndex) =>(
                                            <tr 
                                                key={itemIndex} 
                                                className="border-b border-b-solid border-[#E9E9E9] text-[#212121] text-sm"
                                            >
                                                {
                                                    rows.map((row)=>{
                                                        const view = row.view(item, itemIndex);
                                                        return <td className="py-[12px] px-[10px] max-[769px]:whitespace-nowrap">{view}</td>
                                                    })
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="pt-5 px-5">
                            {
                                isPreview ? 
                                <div className="flex items-center justify-center">
                                    <Button 
                                        text="See More"
                                        extraClassName="rounded-[8px] !font-bold w-[100px] min-h-10"
                                        onClick={()=>navigate(seeMoreLink)}
                                    />
                                </div>
                                :
                                <Pagination
                                    // setDisplayData={(items: any)=>setDisplayData(items)}
                                    // data={data}
                                    // backendPaginated={true}
                                    totalPages={totalPages}
                                /> 
                            }
                        </div>
                    </div>
                    :
                    <div className="py-[120px] mx-[20px] text-center">
                        <h1 className="text-xl font-bold">Empty</h1>
                        <p>No data available</p>
                    </div>
                }
            </div>
        </div>
    )
}