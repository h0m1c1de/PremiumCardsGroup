import { Provider } from 'react-redux'
import { Router } from 'common/router'
import { hot } from 'react-hot-loader'
import routes from './routes'
import { ApolloProvider } from '@apollo/react-hooks'
import { createApolloClient } from './init'

const apolloClient = createApolloClient()


function AppProvider({ store, history }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router history={history} routes={routes} />
      </ApolloProvider>
    </Provider>
  )
}

export default hot(module)(AppProvider)
