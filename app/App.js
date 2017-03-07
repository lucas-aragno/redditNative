import React, { Component } from 'react'
import Router from 'react-native-simple-router'

import MainScene from './scenes/MainScene'

const defaultRoute = {
  name: 'Main',
  component: MainScene
}

export default class App extends Component {
  render () {
    return (
      <Router
        firstRoute={defaultRoute}
      />
    )
  }
}
