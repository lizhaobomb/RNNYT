import React, {Component, PropTypes} from 'react'
import {NavigationExperimental, StyleSheet} from 'react-native'

const {Header, CardStack} = NavigationExperimental

export default class Nav extends Component {

  constructor(props, context) {
    super(props, context)
    this.renderScene = this.renderScene.bind(this)
  }

  renderScene(sceneProps) {
    const route = sceneProps.scene.route
    return (
      <route.component
        {...route.props}
        push={this.props.push}
        pop={this.props.pop}
      />
    )
  }

  render() {
    return (
      <CardStack
        onNavigateBack={this.props.pop}
        navigationState={this.props.navigation}
        renderScene={this.renderScene}
        style={styles.cardStack}
      />
    )
  }
}

Nav.propTypes = {
  push:PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any)
}

const styles = StyleSheet.create({
  cardStack: {
    flex: 1
  }
})
