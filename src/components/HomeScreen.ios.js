import React, {Component, PropTypes} from 'react'
import {
  TabBarIOS,
  StatusBar
} from 'react-native'

import NewsFeedContainer from '../containers/NewsFeedContainer'
import SearchContainer from '../containers/SearchContainer'
import BookmarksContainer from '../containers/BookmarksContainer'
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

  render() {
    const {selectedTab, tab} = this.props
    return(
      <TabBarIOS
        barTintColor={globalStyles.BAR_COLOR}
        tintColor={globalStyles.LINK_COLOR}
        translucent={false}
        >
        <TabBarIOS.Item
          selected={selectedTab === 'newsFeed'}
          onPress = {() => tab('newsFeed')}
          badge={4}
          systemIcon={'featured'}
        >
        <NewsFeedContainer />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={selectedTab === 'search'}
          onPress={() => tab('search')}
          systemIcon={'search'}
        >
        <SearchContainer />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={selectedTab === 'bookmarks'}
          onPress = {() => tab('bookmarks')}
          systemIcon={'bookmarks'}
        >
          <BookmarksContainer />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

HomeScreen.propTypes = {
  selectedTab: PropTypes.string,
  tab: PropTypes.func.isRequired
}
