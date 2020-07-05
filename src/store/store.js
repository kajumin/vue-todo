import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 外部无法修改
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        state: {
          text: 'a'
        }
      }, 
      b: {
        state: {
          text: 'b'
        }
      }
    }
  })

  if (module.hot) {
    console.log('module hot')
    module.hot.accept([
        './state/state',
        './getters/getters',
        './mutations/mutations',
        './actions/actions'
      ], () => {
        const newState = require('./state/state').default
        const newGetters = require('./getters/getters').default
        const newMutations = require('./mutations/mutations').default
        const newActions = require('./actions/actions').default

        store.hotUpdate({
          state: newState,
          getters: newGetters,
          mutations: newMutations,
          actions: newActions
        })
      })
  }

  return store
}
