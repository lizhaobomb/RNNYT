import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  View,
  LayoutAnimation
} from 'react-native'

import OnboardingButtons from './OnboardingButtons'
import OnboardingPanel from './OnboardingPanel'
import onboardingContent from '../config/onboarding'

import AppText from './AppText'
import CollapsibleView from './CollapsibleView'
import { ACCENT_COLORS } from '../styles/global'

export default class Onboarding extends Component {

  constructor(props) {
    super(props)
    this.moveNext = this.moveNext.bind(this)
    this.movePrevious = this.movePrevious.bind(this)
    this.transitionToNextPanel = this.transitionToNextPanel.bind(this)
    this.moveFinal = this.moveFinal.bind(this)
    this.state = {
      currentIndex: 0,
      isDone: false
    }
  }

  movePrevious() {
    this.transitionToNextPanel(this.state.currentIndex - 1)
  }

  moveNext() {
    this.transitionToNextPanel(this.state.currentIndex + 1)
  }

  moveFinal() {
    LayoutAnimation.configureNext({
      duration: 1250,
      update: {
        springDamping: 0.4,
        type: LayoutAnimation.Types.spring
      }
    })
    this.setState({
      isDone: true
    })
    setTimeout(() => {
      this.props.push('home')
    }, 2000)
  }

  transitionToNextPanel(nextIndex) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      currentIndex: nextIndex
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <CollapsibleView
          style={[styles.container]}
          hide={this.state.isDone}
        >
          <View style={styles.panelContainer}>
            {onboardingContent.map((panel, i) => (
              <OnboardingPanel
                key={i}
                {...panel}
                style={i !== this.state.currentIndex ? styles.hidden : undefined}
               />
            ))}
          </View>
          <OnboardingButtons
            totalItems={onboardingContent.length}
            currentIndex={this.state.currentIndex}
            movePrevious={this.movePrevious}
            moveNext={this.moveNext}
            moveFinal={this.moveFinal}
          />
        </CollapsibleView>
        <CollapsibleView
          hide={!this.state.isDone}
          style={styles.doneContainer}>
          <AppText style={styles.doneText}>Let us read the news! </AppText>
        </CollapsibleView>
      </View>
    )
  }
}

Onboarding.PropTypes = {
  push: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  panelContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  hidden: {
    width: 0,
    flex:0
  },
  doneContainer: {
    overflow: 'hidden',
    backgroundColor: ACCENT_COLORS[0],
    justifyContent: 'center',
    alignItems: 'center'
  },
  doneText: {
    fontSize: 20
  }
})
