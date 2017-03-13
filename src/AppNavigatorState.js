/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import { AppNavigator } from './Router'

class AppNavigatorState extends React.Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.NavReducer,
    }
}

export default connect(mapStateToProps)(AppNavigatorState)
