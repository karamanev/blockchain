module.exports = {
    isCreated: (req, res) => {
        Users.find(user => user == User.user)
        if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/users/login')
    }
  },}