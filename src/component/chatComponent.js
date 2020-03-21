import React from 'react';
import io from 'socket.io-client'
import Axios from 'axios'
import { connect } from 'react-redux'
import { API_URL } from '../support/Backend_URL';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class ChatAdmin extends React.Component {
    state = {
        adminRespons: 'Welcome to this group chat!',
        messages: []
    }

    componentDidMount() {
        addResponseMessage(this.state.adminRespons);
        const socket = io(API_URL)
        socket.on('chat message', this.updateMessages);
        socket.on('user connected', this.updateUserCount);
        Axios.get(API_URL + '/chat/getMessages')
            .then((res) => {
                console.log(res.data)
                this.setState({ messages: res.data })
            })
    }

    updateMessages = (msgs) => {
        this.setState({ messages: msgs })
    }

    updateUserCount = (count) => {
        this.setState({ userCount: count })
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        Axios.post('http://localhost:2020/chat/sendMessages', {
            id: this.props.id,
            user: this.props.role,
            message: newMessage
        }).then((res) => {
            console.log(res.data)
        })
    }

    renderResponse = () => {
        const { messages } = this.state
        for (let i = 1; i <= messages.length; i++) {
            if (i === messages.length) {
                if (this.props.role === 'admin') {
                    if (messages[i - 1].user === 'user' || messages[i - 1].user === undefined ) {
                        addResponseMessage(messages[i - 1].message)
                    }
                } else {
                    if (messages[i - 1].user === 'admin') {
                        addResponseMessage(messages[i - 1].message)
                    }
                }
            }
        }
    }

    render() {
        return (
            <div>
                {this.renderResponse()}
                <Widget
                    title="Lead Project Messages Box"
                    subtitle="Consulting your order in here"
                    profileAvatar={this.props.role === 'admin' ? `https://api.adorable.io/avatars/285/${localStorage.getItem('chatUser')}.png` : require('../image/profil.png')}
                    handleNewUserMessage={this.handleNewUserMessage} />
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        id: state.user.id,
        username: state.user.username,
        role: state.user.role
    }
}
export default connect(mapStatetoProps)(ChatAdmin);