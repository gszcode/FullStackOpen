const unknownEndpoint = (req, res) => {
  return res.status(400).send({ error: 'Unknown enpoint' })
}

module.exports = unknownEndpoint
