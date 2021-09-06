export const getData = (url, setter) => {
  fetch(url)
    .then(response => response.json())
    .then(response => setter(response))
}
//mb this function should be in separate file
export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return response.json()
}