import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * URL-driven pagination: updates `page` while preserving other query params.
 * Use under any route (e.g. all-trades, news).
 */
const PaginationBar = ({ numPages = 0, currentPage = 1 }) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", String(pageNumber));
    navigate(`${pathname}?${searchParams.toString()}`, { replace: true });
  };

  if (numPages <= 1) return null;

  const pages = Array.from({ length: numPages }, (_, index) => index + 1);

  return (
    <Wrapper aria-label="Pagination">
      <button
        type="button"
        className="page-nav-btn"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <HiChevronDoubleLeft aria-hidden />
        Prev
      </button>
      <div className="page-btn-group">
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`page-nav-btn page-num-btn${pageNumber === currentPage ? " active" : ""}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="page-nav-btn"
        disabled={currentPage >= numPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
        <HiChevronDoubleRight aria-hidden />
      </button>
    </Wrapper>
  );
};

export default PaginationBar;
