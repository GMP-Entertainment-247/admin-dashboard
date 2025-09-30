import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EventCalendar({
 topSlot,
}: {
 topSlot?: React.ReactNode;   
}) {
    return (
        <div className='event-calendar h-full relative'>
            {topSlot}
            <Calendar 
                value={new Date()} 
                nextLabel={<ChevronRightIcon className='w-5 !-mr-5' />}
                prevLabel={<ChevronLeftIcon className='w-5 ml-2.5' />}
            />
        </div>
    );
}