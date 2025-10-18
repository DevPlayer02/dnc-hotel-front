"use client";

import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import Button from "../Button";
import MaskField from "../Form/MaskField";
import { createHotel } from "@/app/api/hotels/action";
import { useActionState } from "react";
import Alert from "../Alert";

const initialState = { message: "", error: false };

const HotelForm = () => {
  const [state, formAction] = useActionState(createHotel, initialState);

  return (
    <>
      <form action={formAction} className="w-full">
        {state.error && <Alert type="danger">{state.message}</Alert>}
        <ImageField
          name="image"
          label="Select the hotel photo"
          id="image"
          defaultValue={"/no-hotel.jpg"}
        />
        <TextField
          label="Hotel name"
          type="text"
          name="name"
          id="name"
          className="mt-3"
          required
        />
        <TextField
          label="Property description"
          type="text"
          name="description"
          id="description"
          className="mt-3"
          required
        />
        <TextField
          label="Address"
          type="text"
          name="address"
          id="address"
          className="mt-3"
          required
        />
        <MaskField
          label="Daily rate"
          name="price"
          id="price"
          className="mt-3"
          required
        />
        <Button type="submit" appearance="primary" className="mt-5">
          Register
        </Button>
      </form>
    </>
  );
};

export default HotelForm;
