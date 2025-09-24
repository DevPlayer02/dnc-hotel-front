"use client";

import CalendarField from "@/components/Form/CalendarField";
import TextField from "@/components/Form/TextField";
import { Hotel } from "@/types/Hotel";
import { ChangeEvent, useState } from "react";

type HotelBookingFormProps = {
  hotel: Hotel;
};

const HotelBookingForm = ({ hotel }: HotelBookingFormProps) => {
  const today = new Date().toISOString().substring(0, 10);
  const [checkinDate, setCheckinDate] = useState<string | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<string | null>(null);

  return (
    <form action="" className="flex w-full flex-col mt-2">
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
          className="w-full m-5"
          min={today}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCheckinDate(e.target.value);
          }}
        />
        <CalendarField
          id="checkOut"
          name="checkOut"
          label="check-out date"
          className="w-full m-5"
          min={checkinDate ?? today}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCheckoutDate(e.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default HotelBookingForm;
