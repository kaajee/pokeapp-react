import React from 'react';

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
    return (
        <div>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${gotoPrevPage ? "" : "disabled"}`}>
                        <button className="page-link" tabIndex="-1" onClick={gotoPrevPage}>Previous</button>
                    </li>
                    <li className={`page-item ${gotoNextPage ? "" : "disabled"}`}>
                        <button className="page-link" onClick={gotoNextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
