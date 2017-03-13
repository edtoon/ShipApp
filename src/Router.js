/**
 * @flow
 */

import { StackNavigator } from 'react-navigation'

import LoginScreen from './components/LoginScreen'
import MainScreen from './components/MainScreen'
import ProfileScreen from './components/ProfileScreen'
import CaptureScreen from './components/CaptureScreen'

export const AppNavigator = StackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
    Capture: { screen: CaptureScreen },
})
