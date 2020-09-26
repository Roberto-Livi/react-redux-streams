import React from 'react'

class GoogleAuth extends React.Component {

    state = { isSignedIn: null }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            // Calling init returns a promise
            window.gapi.client.init({
                clientId: '101642828581-ij9qj7liv604msqoonn7t3uaqpjpaqip.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = () => {
        this.setState({ isSignedin: this.auth.isSignedIn.get() })
    }

    onSignIn = () => {
        this.auth.signIn()
    }

    onSignOut = () => {
        this.auth.signOut()
    }

    renderAuthButton(){
        if (this.state.isSignedIn === null) {
            return <div>I don't know if we are signed in</div>
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
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

export default GoogleAuth