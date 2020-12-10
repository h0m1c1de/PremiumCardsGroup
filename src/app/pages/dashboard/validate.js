import { validateRequired, validateMax, validateMin, compose } from 'common/forms/validation'

export default compose(
  validateRequired(['quantity', 'value']),
  validateMin(['value'], 5),
  validateMin(['quantity'], 1),
  validateMax(['value'], 150),
)
