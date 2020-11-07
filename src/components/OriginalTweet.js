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