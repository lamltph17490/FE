import React from 'react';

const Paginate = ({ currentPage, setCurrentPage, totalPosts, postPerPage }) => {
	const totalPages = Math.ceil(totalPosts / postPerPage);

	let pages = [];

	for (let p = 1; p <= totalPages; p++) {
		pages.push(p);
	}

	return (
		<nav aria-label="Page navigation example mx-auto">
			<ul className="pagination inline-flex items-center -space-x-px">
				<li className={`page-item ${currentPage === 1 && `disabled`}`}>
					<button className="page-link block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setCurrentPage(currentPage - 1)}>
						&laquo;
					</button>
				</li>
				{pages.map((page) => (
					<li
						key={page}
						className={`page-item ${page === currentPage && `active`}`}
						onClick={() => setCurrentPage(page)}
					>
						<button className="page-link px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</button>
					</li>
				))}
				<li className={`page-item ${currentPage === totalPages && `disabled`}`}>
					<button className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setCurrentPage(currentPage + 1)}>
						&raquo;
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Paginate;