export default function ({ $axios, redirect }) {
  $axios.onError((error, name, endpoint) => {
    console.log(name)
    console.log(endpoint)
    const code = parseInt(error.response && error.response.status)
    if (code === 403) {
      return Promise.reject(error.response)
    }
  })
}
