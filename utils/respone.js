const success = (res, data = null, msg = 'Seccess', status = 200) => {
    return res.status(status).json({
        result: true,
        message: msg,
        data
    });
}

const error = (res, msg = 'Fail', detail = "fail", status = 500,) => {
    return res.status(status).json({
        result: false,
        msg,
        detail: detail
    });
}

module.exports = { success, error }