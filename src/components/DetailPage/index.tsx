import { ReactNode } from "react";
import Link from "../Link";
import Image from "next/image";

type ImageProps = {
  src: string | null;
  alt: string;
};

type AsideContainerProps = {
  title: string | ReactNode;
  children: ReactNode;
};

type DetailPageProps = {
  previousPage?: string;
  children: ReactNode;
  image?: ImageProps;
  title: string;
  asideContainer: AsideContainerProps;
};

const DetailPage = ({
  previousPage = "/",
  children,
  image,
  title,
  asideContainer,
}: DetailPageProps) => {
  return (
    <div className="flex flex-col w-full px-10 py-20 sm:px-20 md:px-32 lg:px-56 xl:px-72">
      <section>
        <Link href={previousPage}> Back </Link>
      </section>
      {image && (
        <section className="relative w-full h-80 mt-2">
          <Image
            src={image.src ?? "/no-hotel.jpg"}
            alt={image.alt}
            fill
            className="object-cover rounded-3xl"
          />
        </section>
      )}
      <section className="flex flex-col mt-2 sm:flex-row">
        <article className="w-full">
          <h1 className="font-bold text-4xl"> {title}</h1>
          {children}
        </article>
        <article className="w-full h-auto shadow-lg rounded-xl ml-0 p-8 flex flex-col justify-start self-start sm:ml-10">
          <span className="flex text-2xl font-bold">
            {asideContainer.title}
          </span>
          <div className="mt-0">{asideContainer.children}</div>
        </article>
      </section>
    </div>
  );
};

export default DetailPage;
