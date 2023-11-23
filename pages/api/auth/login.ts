import Cookies from 'cookies'

export default async function handler(req, res) {
  if (req.method == "POST"){
    const username = req.body['username']
    const password = req.body['password']
    const users = [{Username: "test", Password: "test"}]
    const user = users[0]
    if (password == user.Password){
        const cookies = new Cookies(req, res)
        cookies.set('username', username)
        res.redirect("/")
    } else {
        res.redirect("/login?msg=Incorrect username or password")
    }
  } else {
    res.redirect("/")
  }
}