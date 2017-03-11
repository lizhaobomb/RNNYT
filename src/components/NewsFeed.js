import React, {PropTypes, Component} from 'react'
import {
  ListView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  WebView
} from 'react-native'
import * as globalStyles from '../styles/global'
import SmallText from './SmallText'
import NewsItem from './NewsItem'
export default class NewsFeed extends Component {

  constructor(props){
    super(props)
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.title !== row2.title
    })

    this.state = {
      dataSource: this.ds.cloneWithRows(props.news),
      modalVisible: false,
      modalUrl: ''
    }
    this.onModalOpen = this.onModalOpen.bind(this)
    this.onModalClose = this.onModalClose.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentWillMount() {
    this.refresh()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.news)
    })
  }

  refresh() {
    if (this.props.loadNews) {
      this.props.loadNews()
    }
  }

  render(){
    return (
      <View style={globalStyles.COMMON_STYLES.pageContainer}>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={this.props.listStyles}
        />
        {this.renderModal()}
      </View>
    )
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.modalVisible}
        onRequestClose={this.onModalClose}
        animationType='slide'
        style = {{color:'red'}}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={this.onModalClose}
            style={styles.closeButton}>
            <SmallText>Close</SmallText>
          </TouchableOpacity>
          <WebView
            scalesPageToFit
            source={{uri:this.state.modalUrl}}
          />
        </View>
      </Modal>
    )
  }

  renderRow(rowData, ...rest) {
    const index = parseInt(rest[1], 10)
    return (
      <NewsItem
        onPress={() => this.onModalOpen(rowData.url)}
        style={styles.newsItem}
        index={index}
        {...rowData}
      />
    )
  }

  onModalOpen(url) {
    console.log(url)
    this.setState({
      modalVisible: true,
      modalUrl: url
    })
  }

  onModalClose() {
    this.setState({
      modalVisible: false
    })
  }
}

NewsFeed.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  listStyles: View.propTypes.style,
  refresh: PropTypes.func
}

// NewsFeed.defaultProps = {
//   news:[
//     {
//       title: 'React Native',
//       imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
//       description: 'Build Native Mobile Apps using JavaScript and React',
//       author: 'Facebook',
//       location: 'Menlo Park, California',
//       url: 'https://facebook.github.io/react-native'
//     },
//     {
//       title: 'Packt Publishing',
//       imageUrl: 'https://www.packtpub.com/sites/default/files/packt_logo.png',
//       description: 'Stay Relevant',
//       date: new Date(),
//       author: 'Packt Publishing',
//       location: 'Birmingham, UK',
//       url: 'https://www.packtpub.com/'
//     },
//   ]
// }

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: globalStyles.BG_COLOR
  },
  closeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row'
  }
})
