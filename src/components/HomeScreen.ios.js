import React, {Component, PropTypes} from 'react'
import {
  TabBarIOS,
  StatusBar
} from 'react-native'

import NewsFeedContainer from '../containers/NewsFeedContainer'
import SearchContainer from '../containers/SearchContainer'
import BookmarksContainer from '../containers/BookmarksContainer'
import * as globalStyles from '../styles/global'

import Icon from 'react-native-vector-icons/EvilIcons'
import Profile from './Profile'

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
        <Icon.TabBarItemIOS
          selected={selectedTab === 'newsFeed'}
          onPress = {() => tab('newsFeed')}
          iconName={'star'}
          title={'News'}
        >
          <NewsFeedContainer />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={selectedTab === 'search'}
          onPress={() => tab('search')}
          iconName={'search'}
          title={'Search'}
        >
          <SearchContainer />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={selectedTab === 'bookmarks'}
          onPress = {() => tab('bookmarks')}
          iconName={'paperclip'}
          title={'Bookmarks'}
        >
          <BookmarksContainer />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={selectedTab === 'profile'}
          onPress = {() => tab('profile')}
          iconName={'user'}
          title={'Profile'}
        >
          <Profile />
        </Icon.TabBarItemIOS>

      </TabBarIOS>
    )
  }
}

HomeScreen.propTypes = {
  selectedTab: PropTypes.string,
  tab: PropTypes.func.isRequired
}
