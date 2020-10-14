import React from 'react'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderAdmin(stream){
        if(stream.userId === this.props.currentUserId) {
            return <div>EDIT/DELETE</div>
        }
    }

    render() {
        console.log(this.props.streams)
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // Object.values takes an object as an argument. All the different
    // values from the object will be pulled out and turned into an array
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)