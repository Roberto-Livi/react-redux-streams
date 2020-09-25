import React from 'react'

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '101642828581-ij9qj7liv604msqoonn7t3uaqpjpaqip.apps.googleusercontent.com',
                scope: 'email'
            })
        })
    }

    render(){
        return (
            <div>Google Auth</div>
        )
    }
}

export default GoogleAuth