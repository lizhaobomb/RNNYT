import HomeScreenContainer from '../containers/HomeScreenContainer'
import IntroScreen from '../components/IntroScreen'
import Onboarding from '../components/Onboarding'

import {NavigationExperimental} from 'react-native'
import {
  NAVIGATION_PUSH,
  NAVIGATION_POP,
  NAVIGATION_TAB,
  NAVIGATION_OPEN_MODAL,
  NAVIGATION_CLOSE_MODAL
} from '../actions/actionTypes'

const {StateUtils} = NavigationExperimental;

const routes = {
  home: {
    key : 'home',
    title: 'RNNYT',
    component: HomeScreenContainer,
    index: 0,
    routes: [
      {key: 'newsFeed', modal: undefined},
      {key: 'search'},
      {key: 'bookmarks'}
    ]
  },

  intro: {
    key: 'intro',
    title: 'Welcome',
    component: IntroScreen
  },

  onboarding: {
    key: 'onboarding',
    component: Onboarding
  }
}

const initialState = {
  index: 0,
  routes: [
    routes.intro
  ]
}

export default (state = initialState, action = {}) => {
  if (action.type === NAVIGATION_PUSH) {
    return StateUtils.push(state, routes[action.payload])
  } else if (action.type === NAVIGATION_POP) {
    return StateUtils.pop(state)
  } else if(action.type === NAVIGATION_TAB) {
    const homeState = StateUtils.get(state, 'home')
    const updateHomeState = StateUtils.jumpTo(homeState, action.payload)
    return StateUtils.replaceAt(state, 'home', updateHomeState)
  } else if(action.type === NAVIGATION_OPEN_MODAL) {
    const homeState = StateUtils.get(state, 'home')
    const openTabState = homeState.routes[homeState.index]
    const updateTabState = {...openTabState, modal: action.payload}
    const updateHomeState = StateUtils.replaceAt(homeState, openTabState.key, updateTabState)
    console.log(updateHomeState)
    return StateUtils.replaceAt(state, 'home', updateHomeState)
  } else if(action.type === NAVIGATION_CLOSE_MODAL) {
    const homeState = StateUtils.get(state, 'home')
    const openTabState = homeState.routes[homeState.index]
    const updateTabState = {...openTabState, modal: undefined}
    const updateHomeState = StateUtils.replaceAt(homeState, openTabState.key, updateTabState)
    return StateUtils.replaceAt(state, 'home', updateHomeState)
  }
  return state
}
