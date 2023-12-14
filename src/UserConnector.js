import Cookies from 'js-cookie';

export const Token = Cookies.get('LAB-TOKEN')

const currentUser = async () => {
  let user = null

  if (Token) {
    await fetch("http://localhost:8000/api/info", {
      method: "GET",
      headers: {
        'LAB-TOKEN': Token
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          return null
        }
      })
      .then(data => { user = data })
  }
  return user
}

export const CurrentUser = await currentUser()
