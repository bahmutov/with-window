setTimeout(() => {
  console.log(
    'changing window location from %s to acme.com',
    location.hostname,
  )
  location.href = 'https://acme.com'
}, 1000)
