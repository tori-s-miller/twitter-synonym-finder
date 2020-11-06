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

    componentDidMount() {
        // console.log('ORIGINALTWEET componentDidMount ran')
    }

    render() {
        // {console.log('OT this.props:', this.props)}
        const oldText = this.props.oldText;
        const oldTextArray = this.props.oldTextArray;
        const counter = this.props.counter;
        const currentWord = oldTextArray[counter];
        console.log('OriginalTweet currentWord:', currentWord)
        console.log('Original Tweet oldText:', oldText)
        return (
            <div className="original-tweet-container">
                <div className="form-container">
                <form className="tweet-form" onSubmit={this.handleSubmit}>
                <label>ORIGINAL TWEET</label>
                <textarea
                    size="280"
                    maxLength="280"
                    rows="6"
                    type="text"
                    value={oldText}
                    onChange={this.handleOldText}
                    />
                    <button type="submit" className="original-tweet-submit">Search For Synonyms</button>
                </form>  
                </div>

            </div>
        )
    }
}