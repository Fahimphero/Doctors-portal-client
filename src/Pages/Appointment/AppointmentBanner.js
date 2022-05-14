import React, { useState } from 'react';
import Chair from '../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const AppointmentBanner = ({ date, setDate }) => {

    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img className="max-w-sm rounded-lg shadow-2xl" src={Chair} alt="Dentist Chair" />
                <div>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}

                    />

                </div>
            </div>

        </div>
    );
};

export default AppointmentBanner;