import Dropdown from "../../../../components/shared/Dropdown";
import Table from "../../../../components/Table";
import { imageProp } from "../../../../utils/helpers";
import edit from "../../../../images/svg/edit.svg";
import { useNavigate } from "react-router-dom";
import useFetch from '../../../../utils/hooks/useFetch';
import { IFan } from "../../../../interface/fans.interface";
import BreadCrumbs from "../../../../components/shared/Breadcrumbs";
import Button from "../../../../components/shared/Button";
import clsx from "clsx";


export default function InvestmentDetail () {
    const navigate = useNavigate()
    const {data, loading} = useFetch<{data: IFan[]}>("/admin/list-fans")

    return (
        <div>
            <div className="my-2.5">
                <div className="mb-5">
                    <BreadCrumbs 
                        title="Investment Details"
                        links={[
                            {label: "Home", path: "/investors"}, 
                            {label: "Investment Details"}
                        ]}
                    />
                </div>
                <div className="mt-6 bg-white rounded-lg p-5 flex gap-6">
                    <div className="">
                        <p className="text-2xl font-semibold">Payday - Vowel</p>
                        <hr className="my-5"/>
                        <p className="text-lg font-medium mb-3">About this single</p>
                        <p className="font-sm">
                            Lorem ipsum dolor sit amet consectetur. Facilisi nisl tortor mattis nisl ipsum aliquam vestibulum a ut. Neque non nec morbi aliquam vel eu lorem tellus. Fames sit cras egestas ipsum. Eleifend duis suspendisse ultrices est lorem id duis. Morbi sollicitudin bibendum libero vel. Vitae lacus orci tincidunt posuere interdum id. Sed sed eget integer at. Mollis nec vitae purus nulla aliquet. Ipsum arcu magna commodo et. Et viverra laoreet ut tempor urna. Nulla id ipsum leo rhoncus iaculis natoque. Hendrerit id amet bibendum nunc auctor. Id et porta adipiscing et at tellus in viverra.
                            <br/>
                            Pellentesque viverra arcu tempor egestas nisi feugiat malesuada. Cursus amet tincidunt viverra gravida posuere cursus. Rhoncus in mattis porttitor egestas ligula id nulla lorem ac. Orci adipiscing amet vel dignissim mattis quis. Dolor tempus faucibus pellentesque amet risus ullamcorper ullamcorper. Vitae mi auctor amet id. Velit integer ut cras vel nunc et integer porttitor orci. Massa velit morbi dolor etiam accumsan elementum varius feugiat. Orci euismod tincidunt mi lobortis ultrices ante diam pretium quam.
                        </p>
                        <div>
                            {
                                [
                                    {
                                        title: "Project Details",
                                        list: [
                                            { name: "Artist Name", value: "Vowel"},
                                            { name: "Track Title", value: "Payday"},
                                            { name: "Genre", value: "Rap"},
                                            { name: "Music Release Type", value: "Single"},
                                            { name: "Date Added", value: "20 Sep 2025"},
                                        ]
                                    },
                                    {
                                        title: "Investment Details",
                                        list: [
                                            { name: "Investor Offer", value: "$5,000"},
                                            { name: "Revenue Share", value: "25%"},
                                            { name: "Platform Fee", value: "15%"},
                                            { name: "Contract Span", value: "1 year"},
                                        ]
                                    },
                                ].map((item, idx)=>(
                                    <div key={idx} className="mt-10">
                                        <p className="text-lg font-medium text-[#1A1A1A]">{item.title}</p>
                                        {
                                            item.list.map((listItem, i)=>(
                                                <div key={i}>
                                                    <div className="flex justify-between text-base my-5">
                                                        <p className="text-[#484848]">{listItem.name}</p>
                                                        <p className="text-[#1A1A1A] font-medium">{listItem.value}</p>
                                                    </div>
                                                    <hr/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-[350px] h-[350px] shrink-0 bg-red-300 m-10" />
                </div>
                <div className="flex justify-end gap-3 bg-white p-5 rounded-lg mt-6">
                    <Button 
                        text="Back to dashboard"
                        extraClassName={clsx(
                            "rounded-[8px] !font-bold !w-[170px] !min-h-10"
                        )}
                        onClick={()=>navigate('/investors')}
                    />
                </div>
            </div>
        </div>
    );
}
