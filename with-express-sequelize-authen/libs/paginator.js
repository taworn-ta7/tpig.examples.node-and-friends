'use strict'

const get = (page, rowsPerPage, count) => {
    const offset = page * rowsPerPage
    const pageCount = Math.ceil(count / rowsPerPage)
    const pageSize = page < pageCount - 1
        ? rowsPerPage
        : (page >= pageCount ? 0 : count - offset)
    return {
        page,
        offset,
        rowsPerPage,
        count,
        pageIndex: page,
        pageCount,
        pageStart: offset,
        pageStop: offset + pageSize,
        pageSize
    }
}

module.exports = {
    get
}
