// import { XMarkIcon } from '@heroicons/react/24/outline';
// import React from 'react';

import CreatableSelect from 'react-select/creatable';
import useFetch from '../../../../utils/hooks/useFetch';
import { IPermissions } from '../../../../interface/settings.interface';


export default function PermissionSelectDropdown(
    { values, onChange }
    : 
    { 
        values?: {label:string, value:string}[] | null,
        onChange: (value: any) => void 
    }
) {
    const {data: allPermissions} = useFetch<IPermissions[]>("/admin/permissions")

    const customStyles = {
        control: (styles: any) => ({ 
            ...styles, 
            borderWidth: "0px",
            boxShadow: 'none',
            // padding: "5px 8px",
            backgroundColor: "#F5F5F5",
            minHeight: '50px',
            borderRadius: '10px',
            fontSize: '14px',
            textColor: "#999999",
        }),
        multiValue: (styles: any) => ({
            ...styles,
            backgroundColor: '#FFEDF7',
            border: '1px solid #FFC8E7',
            borderRadius: 9999,
            padding: '2px 6px',
            display: 'flex',
            alignItems: 'center',
        }),
        multiValueLabel: (styles: any) => ({
            ...styles,
            color: '#8C2A62',
            fontSize: '12px',
            padding: 0,
            marginRight: 6,
        }),
        multiValueRemove: (styles: any) => ({
            ...styles,
            color: '#8C2A62',
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'transparent',
                color: '#8C2A62'
            }
        }),
    };

    // const handleRemove = (val: {label:string, value:string}) => {
    //     const next = (selected ?? []).filter(s => s.value !== val.value);
    //     setSelected(next.length ? next : null);
    //     onChange(next.length ? next : null);
    // };

    return (
        <div className='mb-6 mt-1.5'>
            <CreatableSelect 
                isClearable 
                isMulti
                styles={customStyles}
                placeholder="Select permissions..."
                options={allPermissions?.map(item  => (
                    { value: item.id, label: item.name }
                ))} 
                onChange={(newValue) => {
                    onChange(newValue);
                }}
                onCreateOption={(inputValue) => {
                    const newOption = { value: inputValue.toLowerCase().replace(/\s+/g, '_'), label: inputValue };
                    const newValues = values ? [...values, newOption] : [newOption];
                    onChange(newValues);
                }}
            />
            {/* <div className='my-2 flex flex-wrap gap-2'>
                {
                    values && values.length > 0 && values.map((val) => (
                        <span 
                            key={val.value} 
                            className="inline-block bg-[#FFEDF7] border border-[#FFC8E7] text-[#8C2A62] text-xs px-2 py-1 rounded-full flex gap-2 w-fit items-center"
                        >
                            {val.label}
                            <XMarkIcon className='h-3.5 w-3.5 cursor-pointer' />
                        </span>
                    ))
                }
            </div> */}
        </div>
    )
}