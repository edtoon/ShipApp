/**
 * @flow
 */

import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import AppNavigatorState from './AppNavigatorState'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigatorState />
            </Provider>
        )
    }
}
