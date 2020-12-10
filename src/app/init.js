import 'polyfills' // should be first
import '../styles/index.scss'
import { createStore, applyMiddleware, combineReducers, compose as reduxCompose } from 'redux'
import { reducer as form } from 'redux-form'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { createBrowserHistory } from 'history'
import omit from 'lodash/omit'
import { middleware as cacheMiddleware, state as initialState } from './cache'
import { reducers, epics } from 'store'
import { reducer as resource, epic as resourceEpic } from 'common/utils/resource'
import API, { configure as configureAPI } from 'api'
import * as Sentry from '@sentry/browser'
import createSentryMiddleware from 'redux-sentry-middleware'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'


// support for redux dev tools
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose

const store = createStore(
  combineReducers({
    form,
    resource,
    ...reducers,
  }),
  initialState,
  compose(
    applyMiddleware(...[
      createEpicMiddleware(combineEpics(...epics, resourceEpic), { dependencies: { API } }),
      cacheMiddleware,
      process.env.SENTRY_DSN && createSentryMiddleware(Sentry, {
        stateTransformer: (state) => { return omit(state, 'session') },
      }),
    ].filter(Boolean))
  )
)

// FIXME API should not need store
configureAPI(store)
const history = createBrowserHistory()

function createApolloClient() {
  const authLink = setContext(function(_, { headers }) {
    return {
      headers: {
        ...headers,
        'x-store': '7',
      },
    }
  })

  const apolloClient = new ApolloClient({
    link: authLink
      .concat(ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if(graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Locations: ${locations}, Path: ${path}`, locations))
          }
          if(networkError) {
            console.error(`[Network error]: ${networkError}`)
          }
        }),
        createUploadLink({
          uri: process.env.GRAPHQL_URL,
          fetch,
          credentials: 'include',
        }),
      ])),
    cache: new InMemoryCache(),
  })

  return apolloClient
}

export {
  store,
  history,
  createApolloClient,
}
