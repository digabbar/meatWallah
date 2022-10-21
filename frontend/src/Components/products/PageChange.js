import React from "react";
import Pagination from "react-js-pagination";

const PageChange = (props) => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Pagination
        activePage={props.currentPage}
        itemsCountPerPage={props.resPerPage}
        totalItemsCount={props.count}
        onChange={props.onCurrentPage}
        nextPageText={">"}
        prevPageText={"<"}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default PageChange;
