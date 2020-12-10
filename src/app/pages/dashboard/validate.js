import { validateRequired, validateMax, validateMin, compose } from 'common/forms/validation'

export default compose(
  validateRequired(['quantity', 'value']),
  validateMin(['value'], 5),
  validateMax(['value'], 150),
)
