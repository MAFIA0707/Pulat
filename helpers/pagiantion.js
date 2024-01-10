module.exports = class Pagination {
    constructor(totalItems, page, limit) {
        this.page = page || 1
        this.limit = limit || 16
        this.totalPage = Math.ceil(totalItems/this.limit)
        this.offset = (this.page - 1) * this.limit
    }
}


