import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            // Calling init returns a promise
            window.gapi.client.init({
                clientId: '101642828581-ij9qj7liv604msqoonn7t3uaqpjpaqip.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // Assign the auth instance
                this.auth = window.gapi.auth2.getAuthInstance()
                // Immediately update the auth state inside of our redux store
                this.onAuthChange(this.auth.isSignedIn.get())
                // Wait for the authentication status to change
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null) {
            return <div>I don't know if we are signed in</div>
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" /> 
                    Sign In with Google
                </button>
            )
        }
    }

    render(){
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)