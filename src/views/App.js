import React, {
  View,
  StyleSheet,
  Navigator,
  NavigatorIOS,
  TabBarIOS,
  DrawerLayoutAndroid,
  Platform
} from 'react-native'

import autobind from 'autobind-decorator'
import Icon from 'react-native-vector-icons/Ionicons'

import Toolbar from '../components/Toolbar'
import Navigate from '../util/Navigate'
import { discover, music, friend, account } from '../route'
import { connect } from '../util'

@autobind
@connect
class App extends React.Component {
  static childContextTypes = {
    drawer: React.PropTypes.object,
    navigator: React.PropTypes.object
  };

  constructor (props) {
    super(props)

    this.state = {
      drawer: null,
      navigator: null,
      selectedTab: 'discover'
    }
  }

  getChildContext () {
    return {
      drawer: this.state.drawer,
      navigator: this.state.navigator
    }
  }

  setDrawer (drawer) {
    this.setState({drawer})
  }

  setNavigator (navigator) {
    this.setState({navigator: new Navigate(navigator)})
  }

  _renderTabBarItem (title, icon, name, view) {
    return (
      <Icon.TabBarItem
        title={title}
        iconName={icon}
        selectedIconName={icon}
        selected={this.state.selectedTab === name}
        onPress={() => {
          this.setState({
            selectedTab: name
          })
        }}>
        <NavigatorIOS style={styles.wrapper}
          initialRoute={{
            component: view,
            title: title
          }}
          tintColor='#ea4c89'
        />
      </Icon.TabBarItem>
    )
  }

  render () {
    const { drawer } = this.state

    if (Platform.OS === 'android') {
      return (
          <DrawerLayoutAndroid
            ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}>
            {drawer &&
              <Navigator
                ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
                initialRoute={Navigate.getInitialRoute()}
                navigationBar={<Toolbar onIconPress={drawer.openDrawer} />}
                configureScene={() => {
                  return Navigator.SceneConfigs.FadeAndroid
                }}
                renderScene={(route) => {
                  if (this.state.navigator && route.component) {
                    return (
                      <View
                        style={styles.scene}
                        showsVerticalScrollIndicator={false}>
                        <route.component title={route.title} path={route.path} {...route.props} />
                      </View>
                    )
                  }
                }}
              />
            }
          </DrawerLayoutAndroid>
      )
    } else {
      return (
        <TabBarIOS tintColor={'#ea4c89'}>
          {this._renderTabBarItem(discover.title, discover.icon, 'discover', discover.component)}
          {this._renderTabBarItem(music.title, music.icon, 'music', music.component)}
          {this._renderTabBarItem(friend.title, friend.icon, 'friend', friend.component)}
          {this._renderTabBarItem(account.title, account.icon, 'account', account.component)}
        </TabBarIOS>
      )
    }
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: 'white',
    margin: 50
  },
  wrapper: {
    flex: 1
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56
  }
})

export default App
