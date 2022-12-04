const makeSuccessResponse = (res, status, data) => {
    return res.status(status).json({
        code: status,
        message: data?.message ? data.message : 'Success',
        data: data?.data ? data.data : {},
    });
};


module.exports = {
    makeSuccessResponse,
}
