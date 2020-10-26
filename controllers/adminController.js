exports.getAdminPage = (req,res) => {
    res.render('admin.ejs')
}
exports.saveUserData = (req,res) => {
    console.log(req.body);
}