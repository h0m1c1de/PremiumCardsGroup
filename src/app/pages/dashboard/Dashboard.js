import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import { NumberField } from 'common/forms'
import validate from './validate'
import styles from './styles.scss'

Dashboard.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  handleSetCurrent: PropTypes.func.isRequired,
}

Dashboard.defaultProps = {
  initialValues: {},
  items: [],
}

export default function Dashboard({ onSubmit, items, handleSetCurrent, initialValues, handleRemove }) {
  const f = (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, values, form }) => (
        <form onSubmit={(values) => handleSubmit(values, form)} className={styles.form}>
          {!initialValues.id && <h2>Package {items.length + 1}</h2>}
          <NumberField name="quantity" label="Quantity" />
          {!initialValues.id && <NumberField name="value" label="Value" />}
          {initialValues.id && <button type="button" onClick={handleSetCurrent(null)}>Cancel</button>}
          {initialValues.id && <button type="button" onClick={handleRemove(form)}>Remove</button>}
          <button type="submit" disabled={submitting}>{initialValues.id ? 'Save' : 'Add package'}</button>
        </form>
      )}
    />
  )
  return (
    <div className={styles.wrap}>
      {items.map((item, index) => {
        return (
          <div key={item.id} className={styles.item}>
            <h3>Package {index + 1}</h3>
            <div>Price: {item.price * item.quantity}</div>
            {initialValues.id === item.id ? f : (<button type="button" onClick={handleSetCurrent(item)}>Modify</button>)}
          </div>
        )
      })}
      {!initialValues.id && f}
    </div>
  )
}
