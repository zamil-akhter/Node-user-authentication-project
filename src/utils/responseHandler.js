const sendStatus = (res, message, data) => {
    let status = 200;
    return res.status(200).json({status,message, data})
}

const sendErrorStatus = (res, message) => {
    let status = 400;
    return res.status(400).json({status, message})
}
module.exports = {
    sendStatus,
    sendErrorStatus
};
