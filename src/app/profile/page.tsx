import DetailPage from "@/components/DetailPage";
import { getProfile } from "../api/users/actions";
import CustomImage from "@/components/CustomImage";
import { User } from "@/types/User";
import DetailRow from "@/components/DetailListItem/DetailRow";
import Link from "@/components/Link";
import { Reservation } from "@/types/Reservation";
import DetailListItem from "@/components/DetailListItem";

type RecentReservationProps = {
  reservation?: Reservation;
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

const ProfilePage = async () => {
  const user = (await getProfile()) as User;
  console.log({ user });
  return (
    <DetailPage
      title="My profile"
      previousPage="/"
      asideContainer={{
        title: "Most recent reservation",
        children: <RecentReservation reservation={user.lastReservation} />,
      }}
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
