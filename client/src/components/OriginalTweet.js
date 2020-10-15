import React from 'react';

export default class OriginalTweet extends React.Component {
    constructor(props) {
        super(props);
        this.handleOldText = this.handleOldText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit();
    }

    handleOldText(e) {
        this.props.onTextChange(e.target.value);     
    }

    render() {
        const oldText = this.props.oldText;
        {console.log('OriginalTweet this.props:', this.props)}
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    value={oldText}
                    onChange={this.handleOldText}
                    />
                    <button type="submit">Submit</button>
                </form>      
            </div>
        )
    }
}