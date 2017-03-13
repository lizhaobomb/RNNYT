import React, {Component} from 'react'
import {
  TabBarIOS,
  Text,
  Vibration,
  Alert,
  StatusBar
} from 'react-native'

import NewsFeedContainer from '../containers/NewsFeedContainer'
import SearchContainer from '../containers/SearchContainer'
import * as globalStyles from '../styles/global'

//set the status bar for ios to light
StatusBar.setBarStyle('light-content')

export default class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tab: 'newsFeed'
    }
  }

  showBookmarkAlert() {
    Vibration.vibrate()
    Alert.alert(
      'Coming Soon',
      'We are hard at work on this feature, check back in the near future.',
      [
        {text: 'OK', onPress: ()=> console.log('User pressed OK')}
      ]
    )
  }

  render() {
    return(
      <TabBarIOS
        barTintColor={globalStyles.BAR_COLOR}
        tintColor={globalStyles.LINK_COLOR}
        translucent={false}
        >
        <TabBarIOS.Item
        selected={this.state.tab === 'newsFeed'}
        onPress = {() => this.setState({tab: 'newsFeed'})}
        badge={4}
        systemIcon={'featured'}
        >
        <NewsFeedContainer />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        selected={this.state.tab === 'search'}
        onPress = {() => this.setState({tab: 'search'})}
        systemIcon={'search'}
        >
        <SearchContainer />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        selected={this.state.tab === 'bookmarks'}
        onPress = {() => this.setState({tab: 'bookmarks'})}
        systemIcon={'bookmarks'}
        >
        <Text>Bookmarks</Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}
