"use client";

import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import Button from "../Button";
import MaskField from "../Form/MaskField";
import { createHotel, updateHotel } from "@/app/api/hotels/action";
import { useActionState } from "react";
import Alert from "../Alert";
import { Hotel } from "@/types/Hotel";

export type State = { message: string; error: boolean };
const initialState: State = { message: "", error: false };

type HotelFormProps = {
  hotel?: Hotel;
};

const HotelForm = ({ hotel }: HotelFormProps) => {
  const action = hotel ? updateHotel : createHotel
  const [state, formAction] = useActionState<State, FormData>(action, initialState);

  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = hotel?.image;
  const srcUrl = filename
    ? `${base}/uploads-hotel/${encodeURIComponent(filename)}`
    : "/no-hotel.jpg";

  return (
    <>
      <form action={formAction} className="w-full">
        {state.error && <Alert type="danger">{state.message}</Alert>}
        {hotel?.id && (
          <TextField
            label="Id"
            type="text"
            name="id"
            defaultValue={`${hotel?.id}`}
            id="id"
            className="sr-only"
          />
        )}
        <ImageField
          name="image"
          label="Select the hotel photo"
          id="image"
          defaultValue={srcUrl}
        />
        <TextField
          label="Hotel name"
          type="text"
          name="name"
          id="name"
          className="mt-3"
          defaultValue={hotel?.name}
          required
        />
        <TextField
          label="Property description"
          type="text"
          name="description"
          id="description"
          className="mt-3"
          defaultValue={hotel?.description}
          required
        />
        <TextField
          label="Address"
          type="text"
          name="address"
          id="address"
          className="mt-3"
          defaultValue={hotel?.address}
          required
        />
        <MaskField
          label="Daily rate"
          name="price"
          id="price"
          className="mt-3"
          defaultValue={hotel?.price}
          required
        />
        <Button type="submit" appearance="primary" className="mt-5">
          {hotel ? "Edit" : "Register"}
        </Button>
      </form>
    </>
  );
};

export default HotelForm;
