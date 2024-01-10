function apiResponse(res, statusCode, data, error, pagiantion) {
    const response = {
        data: data || null,
        error: null,
        pagiantion: pagiantion || null,
        date:new Date
    }
    res.send(statusCode(200).json(response))
}
module.exports=apiResponse