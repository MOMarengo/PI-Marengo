import style from "./Pagination.module.css"

const Pagination = ({ currentPage, totalPages, prevPage, nextPage }) => {
  return (
    <div className={style.pagination}>
      {currentPage > 1 && (
        <button className= {style.button} onClick={prevPage}>
          &#8249;
        </button>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages   && (
        <button onClick={nextPage}>
          &#8250;
        </button>
      )}
    </div>
  );
};

export default Pagination;