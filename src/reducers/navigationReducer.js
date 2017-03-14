import HomeScreen from '../components/HomeScreen'
import IntroScreen from '../components/IntroScreen'

import {NavigationExperimental} from 'react-native'
import {
  NAVIGATION_PUSH,
  NAVIGATION_POP,
  NAVIGATION_TAB
} from '../actions/actionTypes'

const {StateUtils} = NavigationExperimental;

const routes = {
  home: {
    key : 'home',
    title: 'RNNYT',
    component: HomeScreen,
    index: 0,
    routes: [
      {key: 'newsFeed'},
      {key: 'search'},
      {key: 'bookmark'}
    ]
  },

  intro: {
    key: 'intro',
    title: 'Welcome',
    component: IntroScreen
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
  }
  return state
}
