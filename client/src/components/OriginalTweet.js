import React from 'react';

export default class OriginalTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }

        this.handleText = this.handleText.bind(this);
    }


    handleText(e) {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        {console.log('this.state:', this.state)}
        return (
            <div>
                <input 
                    type="text"
                    value={this.state.text}
                    onChange={this.handleText}
                    />
            </div>
        )
    }
}