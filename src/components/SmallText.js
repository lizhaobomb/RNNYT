import React, {PropTypes, Component} from 'react'
import {
  StyleSheet,
  Text,
  InteractionManager
} from 'react-native'
import AppText from './AppText'
import * as globalStyles from '../styles/global'

class SmallText extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      doExpensiveRender: false
    }
  }

  render() {
    const {children, useFallColors, style, ...rest} = this.props
    let childrenFormatted = children
    if (useFallColors && this.state.doExpensiveRender) {
      childrenFormatted = fallColors(children)
    }
    return (
      <AppText style={[styles.small, style]} {...rest}>
        {childrenFormatted}
      </AppText>
      )
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        doExpensiveRender: true
      })
    })
  }
}

SmallText.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node
}

const styles = StyleSheet.create({
  small: {
    fontSize: 11
  }
})

export default SmallText
