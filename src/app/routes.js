import AppLayout from 'layouts/AppLayout'

import { routes as dashboard } from 'pages/dashboard'


const appRoutes = [
  {
    path: '/',
    layout: AppLayout,
    routes: dashboard,
    name: 'dashboard',
  },
]

export default appRoutes
