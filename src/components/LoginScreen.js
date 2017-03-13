/**
 * @flow
 */

import React from 'react'
import {
    Button, View
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

const LoginButton = connect(
  state => ({
    isLoggedIn: state.AuthReducer.isLoggedIn,
  })
)(
  ({ login, dispatch }) => {
    return (
      <Button title='Shipping Login' onPress={() => dispatch({ type: 'Login' })} />
    )
  }
)

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoginButton />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.AuthReducer.isLoggedIn,
    }
}

export default connect(mapStateToProps)(LoginScreen)
