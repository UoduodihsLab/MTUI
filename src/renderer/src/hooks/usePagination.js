import { useState } from 'react'

export default function usePagination() {
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [count, setCount] = useState(0)

    function handleChange(newPage, newSize) {
        setPage(newPage)
        setSize(newSize)
    }

    function update(newPage, newSize, newCount) {
        setPage(newPage)
        setSize(newSize)
        setCount(newCount)
    }

    const pgProps = {
        current: page,
        pageSize: size,
        total: count
    }

    return {
        page,
        size,
        count,
        handleChange,
        update,
        pgProps
    }
}
