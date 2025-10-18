"use client";

import { reserveHotelById } from "@/app/api/reservations/actions";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import CalendarField from "@/components/Form/CalendarField";
import TextField from "@/components/Form/TextField";
import { getFormattedPrice } from "@/helpers/format/money";
import { Hotel } from "@/types/Hotel";
import { ChangeEvent, useState } from "react";
import { useActionState } from "react"; 

type HotelBookingFormProps = {
  hotel: Hotel;
};

const getNightsInHotel = (checkin: string | null, checkout: string | null) => {
  if (!checkin || !checkout) return 1;

  const start = new Date(checkin).getTime();
  const end = new Date(checkout).getTime();

  const millinsecondsDiff = end - start;

  const nights = millinsecondsDiff / (1000 * 60 * 60 * 24);

  return nights;
};

const initialState = {message: '', error: false}

const HotelBookingForm = ({ hotel }: HotelBookingFormProps) => {
  const [state, formAction, isPending] = useActionState(reserveHotelById, initialState)
  const today = new Date().toISOString().substring(0, 10);
  const [checkinDate, setCheckinDate] = useState<string | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<string | null>(null);
  const estimatedPrice = getNightsInHotel(checkinDate, checkoutDate) * hotel.price;

  return (
    <form action={formAction} className="flex w-full flex-col mt-2">
      <TextField
        id="hotelId"
        name="hotelId"
        defaultValue={hotel.id}
        label="Hotel ID"
        readOnly
        hidden
      />
      <div className="w-full flex">
        <CalendarField
          id="checkIn"
          name="checkIn"
          label="Check-in date"
          required
          className="w-full m-5 cursor-pointer"
          min={today}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCheckinDate(e.target.value);
          }}
        />
        <CalendarField
          id="checkOut"
          name="checkOut"
          label="Check-out date"
          className="w-full m-5 cursor-pointer"
          required
          min={checkinDate ?? today}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCheckoutDate(e.target.value);
          }}
        />
      </div>
      <div className="flex w-full justify-around font-bold mt-10 mb-6">
        <span>Total</span>
        <span>U$ {getFormattedPrice(estimatedPrice)}&nbsp;</span>
      </div>
      {state.error && (
        <Alert type="danger">{ state.message }</Alert> 
      )}
      <Button appearance="primary" type="submit" disabled={false} className="mt-2 block">Book now</Button>
    </form>
  );
};

export default HotelBookingForm;
