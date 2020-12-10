function getValue(value) {
  let res = (value * 100).toString()
  while(res.length < 5) {
    res = '0' + res
  }
  return res
}

export {
  getValue,
}
