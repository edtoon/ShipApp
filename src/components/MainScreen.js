/**
 * @flow
 */

import React from 'react'
import {
    Button, StyleSheet, Text, View
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class MainScreen extends React.Component {
  componentWillMount() {
    console.log('login btn', this.props.isLoggedIn)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoginStatusMessage />
        <AuthButton />
      </View>
    )
  }
}

const LoginStatusMessage = connect(
  state => ({
    isLoggedIn: state.AuthReducer.isLoggedIn,
  })
)(
  ({ isLoggedIn, dispatch }) => {
    if (!isLoggedIn) {
      return (
        <View>
          <Text>Please log in</Text>
        </View>
      )
    }

    return (
      <View>
        <Text style={styles.welcome}>
          {'You are "logged in" right now'}
        </Text>
        <Button
          onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Profile' }))}
          title="Profile"
        />
        <Button
          onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Capture' }))}
          title="Capture"
        />
      </View>
    )
  }
)

const AuthButton = connect(
  state => ({
    isLoggedIn: state.AuthReducer.isLoggedIn,
  }),
  dispatch => ({
    logout: () => dispatch({ type: 'Logout' }),
    login: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
  })
)(
  ({ logout, login, isLoggedIn }) => {
    console.log('login btn', isLoggedIn)

    return (
      <Button title={isLoggedIn ? 'Log Out' : 'Log In'}
        onPress={isLoggedIn ? logout : login}
      />
    )
  }
)

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.AuthReducer.isLoggedIn,
    }
}

export default connect(mapStateToProps)(MainScreen)
