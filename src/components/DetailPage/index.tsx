import { ReactNode } from "react";
import Link from "../Link";
import CustomImage from "../CustomImage";

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
  additionalLink?: string;
  additionalLinkText?: string;
  children: ReactNode;
  image?: ImageProps;
  title: string;
  asideContainer: AsideContainerProps;
  className?: string; 
};

const DetailPage = ({
  previousPage = "/",
  additionalLink,
  additionalLinkText,
  children,
  image,
  title,
  asideContainer,
  className,
}: DetailPageProps) => {
  return (
    <div className={`flex flex-col w-full px-10 sm:px-20 md:px-32 lg:px-56 xl:px-72 ${className || ''}`}>
      <section className="flex justify-between pt-20 pb-4">
        <Link href={previousPage}> Back </Link>
        {additionalLink && additionalLinkText && (
        <Link href={additionalLink}> {additionalLinkText} </Link>
        )}
      </section>
      {image && (
        <section className="relative w-full h-80 mt-2"> 
          <CustomImage
            src={image.src}
            uploadsPath="hotel"
            alt={image.alt}
            className="object-cover rounded-3xl  w-full h-full"
          />
        </section>
      )}
       <section className="flex flex-col mt-10 sm:flex-row pb-20"> 
        <article className="w-full flex flex-col">
          <h1 className="font-bold text-4xl mb-6 text-center"> {title}</h1>
          {children}
        </article>
        <article className="w-full h-auto shadow-lg rounded-xl ml-0 p-8 flex flex-col justify-start self-start sm:ml-10">
          <span className="flex justify-center text-2xl font-bold">
            {asideContainer.title}
          </span>
          <div className="mt-0">{asideContainer.children}</div>
        </article>
      </section>
    </div>
  );
};

export default DetailPage;
