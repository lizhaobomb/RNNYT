import React, {Component} from 'react'
import {Navigator,TouchableOpacity, StyleSheet} from 'react-native'

import HomeScreen from './HomeScreen'
import IntroScreen from './IntroScreen'

import Title from './Title'
import SmallText from './SmallText'

import * as globalStyles from '../styles/global'

const HOME_ROUTE = {
  title: 'RNNYT',
  component: HomeScreen
}
const INTRO_ROUTE = {
  title: 'Welcome',
  component: IntroScreen,
  props: {
    nextScene: HOME_ROUTE
  }
}

export default class Nav extends Component {

  render() {
    return (
      <Navigator
        initialRoute={INTRO_ROUTE}
        renderScene={this.renderScene}
      />
    )
  }

  renderNavigationBar() {
    return (
      <Navigator.NavigationBar
        routeMapper={{
          LeftButton: this.renderLeftButton,
          RightButton: () => null,
          Title: this.renderTitle
        }}
        style={styles.navBar}
      />
    )
  }

  renderLeftButton(route, navigator, index) {
    if (inde === 0) {
      return null
    }
    return (
      <TouchableOpacity
        style={styles.leftButton}></TouchableOpacity>
    )
  }

  renderScene(route, navigator) {
    return(
      <route.component
        {...route.props}
        navigator={navigator}
      />
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: globalStyles.MUTED_COLOR
  }
})
