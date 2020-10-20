import React from 'react'
import { connect } from 'react-redux'
import { createStream } from '../../actions/index'
import StreamForm from './StreamForm'

class StreamCreate extends React.Component {

    onSubmit = formValues => {
        this.props.createStream(formValues)
    }

    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
    
}

const validate = (formValues) => {
    const errors = {}
    if(!formValues.title) {
        // only ran if the user did not enter a title
        errors.title = "You must enter a title"
    }

    if(!formValues.description) {
        errors.description = "You must enter a description"
    }

    return errors
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate)

export default connect(null, { createStream })(formWrapped)