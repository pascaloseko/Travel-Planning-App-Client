import Cookies from 'cookies'

export default async function handler(req, res) {
  if (req.method == "POST"){
    const username = req.body['username']
    const password = req.body['password']
    const passwordagain = req.body['passwordagain']
    if (password != passwordagain){
        res.redirect("/signup?msg=The two passwords don't match");
        return;
    }
    
    const currentDate = new Date().toUTCString();
    const bodyObject = {
        Username: username,
        Password: password,
        Created: currentDate
    }
    console.log(bodyObject)
    const cookies = new Cookies(req, res)
    cookies.set('username', username)
    res.redirect("/")
  } else {
    res.redirect("/")
  }
}