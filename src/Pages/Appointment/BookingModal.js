import React from 'react';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const BookingModal = ({ date, treatment, setTreatment }) => {
    const { _id, name, slots } = treatment;
    const [user, loading, error] = useAuthState(auth);

    const formattedDate= format(date,'PP');

    const handleBooking = (event) => {
        event.preventDefault();
        const slot = event.target.slot.value;
        console.log(_id, name, slot)

        const booking={
            treatmentId:_id,
            treatment:name,
            date:formattedDate,
            slot,
            patient:user.email,
            patientName:user.displayName,
            phone:event.target.phone.value
        }


        fetch('http://localhost:5000/booking',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(booking),
        })

        .then(res=>res.json())
        .then(data=>{
            console.log('Success',data);
            // to close the modal
        setTreatment(null)
        })

        
    }


    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary">Booking For: {name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center'>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={format(date, 'PP')} disabled />

                        <select name='slot' className="select select-bordered w-full max-w-xs">

                            {
                                treatment.slots.map((slot, index) => <option key={index}>{slot}</option>)
                            }
                        </select>

                        <input type="text" name='name' placeholder="Your Name" className="input input-bordered w-full max-w-xs" defaultValue={user?.displayName} readOnly disabled />
                        <input type="email" name='email' placeholder="Email Address" className="input input-bordered w-full max-w-xs"
                            defaultValue={user?.email} readOnly disabled />
                        <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />

                        <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>

                </div>
            </div>
        </div >
    );
};

export default BookingModal;