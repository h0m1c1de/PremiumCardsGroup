import { useMemo } from 'react'
import PropTypes from 'prop-types'

import styles from './BaseFieldLayout.scss'

BaseFieldLayout.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool,
  inputComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  prefix: PropTypes.node,
}

BaseFieldLayout.defaultProps = {
  label: undefined,
  required: false,
  prefix: undefined,
}

export default function BaseFieldLayout({
  label,
  prefix,
  required,
  inputComponent: InputComponent,
  meta,
  input,
  ...rest
}) {
  const error = useMemo(() => {
    if(meta.submitError && !meta.dirtySinceLastSubmit) {
      return meta.submitError
    }
    if(meta.error && meta.touched) {
      return meta.error
    }
  }, [meta.error, meta.touched, meta.dirtySinceLastSubmit, meta.submitError])

  return (
    <div className={styles.formGroup}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.asterisk}>*</span>}
        </label>
      )}
      <div className={styles.controlField}>
        <div className={`${styles.controlElement} ${error ? styles.inputError : ''}`}>
          {prefix && <div className={styles.prefix}>{prefix}</div>}
          <InputComponent
            required={required}
            {...rest}
            {...input}
          />
          {error && <div className={styles.error}>{error}</div> }
        </div>
      </div>
    </div>
  )
}
