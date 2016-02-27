export const discover = {
  initialRoute: true,

  title: '发现音乐',
  icon: 'radio-waves',
  component: require('../views/Discover').default
}

export const music = {
  title: '我的音乐',
  icon: 'music-note',
  component: require('../views/Music').default
}

export const friend = {
  title: '朋友',
  icon: 'person-stalker',
  component: require('../views/Friend').default
}

export const account = {
  title: '账号',
  icon: 'person',
  component: require('../views/Account').default
}
