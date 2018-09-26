window.onload = function () {
  // check login status
  const checkLoginStatus = function () {
    return axios({
      headers: {
        token: localStorage.token
      },
      url: '/api/v1/login_status'
    })
  }
  checkLoginStatus().then((res) => {
    if (res.data.user && res.data.user.role === 'admin') {
      document.querySelector('.operation').style.display = 'block'
      const buttonRemove = document.querySelector('.remove')
      const removePost = function () {
        return axios({
          method: 'delete',
          headers: {
            token: localStorage.token,
          },
          url: '/api/v1/post/' + window.postId
        })
      }
      buttonRemove.addEventListener('click', function () {
        removePost().then((res) => {
          console.log(res)
        })
      })
    }
  })
}