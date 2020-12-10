import { useMutation } from '@apollo/react-hooks'
import { useCallback, useState } from 'react'
import Dashboard from './Dashboard'

import { ADD, UPDATE, REMOVE } from './dashboard.gql'

function DashboardContainer(props) {
  const [current, setCurrent] = useState(null)
  const [items, setItems] = useState([])
  const [add] = useMutation(ADD)
  const [update] = useMutation(UPDATE)
  const [remove] = useMutation(REMOVE)

  const onSubmit = useCallback(({ quantity, value }, form) => {
    if(current && current.id) {
      return update({ variables: { personalMessage: false, quantity: +quantity, cartItemId: current.id } }).then(({ data }) => {
        setItems(data.updatePackageInCart.items)
        setCurrent(null)
      })
    }
    return add({ variables: { personalMessage: false, quantity: +quantity, sku: 'LECA' + getValue(value) } }).then(({ data }) => {
      setItems(data.addPackageToCart.items)
      setCurrent(null)
      setTimeout(() => {
        form.reset()
      }, 0)
    })
  }, [add, update, setItems, setCurrent, current])

  const handleSetCurrent = useCallback((item) => { return () => setCurrent(item) }, [setCurrent])

  const handleRemove = useCallback((form) => {
    return () => {
      remove({ variables: { cartItemId: current.id } }).then(({ data }) => {
        setItems(data.removeItemFromCart.items)
        setCurrent(null)
      })
    }
  }, [remove, current, items, setItems, setCurrent])

  return (
    <Dashboard
      onSubmit={onSubmit}
      items={items}
      handleSetCurrent={handleSetCurrent}
      handleRemove={handleRemove}
      initialValues={current ? { ...current, value: +current.price } : {}}
    />
  )
}

export default DashboardContainer

function getValue(value) {
  let res = (value * 100).toString()
  while(res.length < 5) {
    res = '0' + res
  }
  return res
}
