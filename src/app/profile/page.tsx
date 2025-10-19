import DetailPage from "@/components/DetailPage";
import { getProfile } from "../api/users/actions";
import CustomImage from "@/components/CustomImage";
import { User } from "@/types/User";
import DetailRow from "@/components/DetailListItem/DetailRow";
import Link from "@/components/Link";
import { Reservation } from "@/types/Reservation";
import DetailListItem from "@/components/DetailListItem";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Hotel } from "@/types/Hotel";
import HotelListItem from "@/components/HotelListItem";

type RecentReservationProps = {
  reservation?: Reservation;
};

type MyHotelsProps = {
  hotels?: Hotel[];
};

const RecentReservation = ({ reservation }: RecentReservationProps) => {
  if (!reservation) {
    return (
      <div className="mt-10 w-full text-center">
        There are no reservations yet
      </div>
    );
  }

  return (
    <>
      <div className="my-10">
        <DetailListItem reservation={reservation} />
      </div>
      <Link href="/reservations" className="block text-center w-full">
        View all reservations
      </Link>
    </>
  );
};

const MyHotels = ({ hotels }: MyHotelsProps) => {
  if (!hotels) {
    return <div className="mt-10 w-full text-center">No properties</div>;
  }

  return (
    <>
      <div className="my-10">
        {hotels.splice(0, 2).map((hotel) => (
          <div className="mt-6" key={hotel.id}>
            <HotelListItem hotel={hotel} />
          </div>
        ))}
      </div>
      <Link href="/my-properties" className="block text-center w-full">
        View all properties
      </Link>
    </>
  );
};

const ProfilePage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const user = (await getProfile()) as User;

  const asideContainer =
    user.role === "USER"
      ? {
          title: "Most recent reservation",
          children: <RecentReservation reservation={user.lastReservation} />,
        }
      : {
          title: "My properties",
          children: <MyHotels hotels={user.hotels} />,
        };

  return (
    <DetailPage
      title="My profile"
      backButton="/"
      asideContainer={asideContainer}
    >
      <div className="mt-4 flex flex-col justify-center items-center">
        <CustomImage
          src={user.avatar ?? "default-profile.jpg"}
          alt={`Photo of ${user.name}`}
          width={300}
          height={300}
          className="rounded-full w-36 h-36 object-cover"
        />
        <div className="flex flex-col my-6 justify-center">
          <span>
            At DNC Hotel since {new Date(user.createdAt).getFullYear()}
          </span>
        </div>
      </div>
      <DetailRow title="Name" description={user.name} className="mt-2" />
      <DetailRow title="Email" description={user.email} className="mt-2" />
      <div className="w-full mt-10">
        <Link href="/profile/edit" className="block text-center">
          Edit profile
        </Link>
      </div>
    </DetailPage>
  );
};

export default ProfilePage;
