const sendStatus = (res, statusCode, message) => {
    return res.status(statusCode).json({statusCode,message})
}
module.exports = sendStatus;
