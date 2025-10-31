import Link from "@/components/Link";
import { getPaginationRange } from "./helper";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  destination: string;
};

const pagesStyles =
  "mx-1 flex items-center justify-center w-12 h-12 bg-white text-xl font-bold text-light-grey-800 border border-light-grey-300 rounded-lg hover:bg-snow-white";
const arrowsStyles =
  "flex items-center justify-center w-12 h-12 bg-light-grey-400 text-xl font-bold text-light-grey-800 rounded-lg hover:bg-light-grey-500";
const activePageStyles =
  "mx-1 flex items-center justify-center w-12 h-12 bg-white text-xl font-bold text-main-brand-blue-300 border border-main-brand-blue-300 rounded-lg hover:bg-snow-white";
const disabledStyles =
  "pointer-events-none aria-disabled:bg-slate-100 aria-disabled:text-slate-400 aria-disabled:cursor-not-allowed";

const Pagination = ({
  currentPage,
  totalPages,
  destination,
}: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="flex">
          <li>
            <Link
              href={{ pathname: destination, query: { page: 1 } }}
              className={`${arrowsStyles} ${isFirstPage ? disabledStyles : ""}`}
              aria-disabled={isFirstPage}
            >{`<`}</Link>
          </li>
          {getPaginationRange(currentPage, totalPages).map((page) => {
            const isCurrent = currentPage === page;
            const styles = isCurrent ? activePageStyles : pagesStyles;

            return (
              <li key={page}>
                <Link
                  href={{ pathname: destination, query: { page: String(page) } }}
                  className={styles}
                >
                  {page as number}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={{ pathname: destination, query: { page: totalPages } }}
              className={`${arrowsStyles} ${isLastPage ? disabledStyles : ""}`}
            >{`>`}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;