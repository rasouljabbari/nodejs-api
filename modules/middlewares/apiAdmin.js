module.exports = (req, res, next) => {
    console.log(req?.user)
    if (req?.user?.type === 'admin') {
        next()
        return;
    }

    return res.status(403).json({
        message: 'شما به این بخش دسترسی ندارید',
        success: false
    })
}