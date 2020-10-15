import React, { useState } from 'react';

export default class OriginalTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            textArray: []
        }

        this.handleText = this.handleText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit ran')
        this.setState({textArray: this.state.text.split(' ')})
    }


    // handleText(e) {
    //     this.setState({
    //         text: e.target.value
    //     })
    // }

    handleText(e) {
        this.props.onTextChange(e.target.value);     
    }

    render() {
        const text = this.props.text;
        {console.log('OriginalTweet this.props:', this.props)}
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    value={text}
                    onChange={this.handleText}
                    />
                    <button type="submit">Submit</button>
                </form>      
            </div>
        )
    }
}