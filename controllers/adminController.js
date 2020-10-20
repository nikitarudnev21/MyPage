exports.getAdminPage = (req,res) => {
    res.render('admin.ejs')
}
exports.saveUserDatqa = (req,res) => {
    console.log(req.body);
}