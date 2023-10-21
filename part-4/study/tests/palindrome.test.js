const palindrome = require('../utils/for_testing').palindrome

xtest('palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

xtest('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

xtest('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})
