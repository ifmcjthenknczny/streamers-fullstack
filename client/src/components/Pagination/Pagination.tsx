import React from 'react'
import styles from './Pagination.module.scss'
import classNames from 'classnames'

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange
}: Props) => {
    const handlePageChange = (page: number) => {
        onPageChange(page)
    }

    return (
        <ul className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page}>
                    <button
                        className={classNames(styles.page, page === currentPage && styles.active)}
                        key={page}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Pagination
