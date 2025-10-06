"use client";
import { User } from "@/types/User";
import CustomImage from "../CustomImage";
import { normalizeImageSrc } from "@/helpers/format/image";

type UserDetailProps = {
  user: User;
};

const UserDetail = ({ user }: UserDetailProps) => {
  const rawAvatarSrc = user.avatar ?? "/default-avatar.png";
  const normalizedSrc = normalizeImageSrc(rawAvatarSrc);
  
  return (
    <div className="mt-4 flex">
      <CustomImage
        src={normalizedSrc}
        alt={`Host's photo ${user.name}`}
        width={56}
        height={56}
        className="rounded-full w-14 h-14 object-cover"
      />
      <div className="flex flex-col ml-2 justify-center">
        <b>Host: {user.name}</b>
        <span className="font-medium">
          Since {new Date(user.createdAt).getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default UserDetail;