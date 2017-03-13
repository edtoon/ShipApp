/**
 * @flow
 */

import React from 'react'
import {
    Text
} from 'react-native'

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  }

  render() {
    return (
      <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        This is the profile screen
      </Text>
    )
  }
}
