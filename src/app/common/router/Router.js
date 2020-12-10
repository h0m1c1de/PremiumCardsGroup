import { Router } from 'react-router'
import RouteRecursive from './RouteRecursive'
import RouterConfig from './RouterConfig'

export default function AppRouter({ routes, history }) {
  return (
    <Router history={history} basename="PremiumCardsGroup">
      <RouterConfig routes={routes}>
        <RouteRecursive routes={routes} />
      </RouterConfig>
    </Router>
  )
}
