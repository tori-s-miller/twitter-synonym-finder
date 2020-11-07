import React from 'react';

export default class NewTweet extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const newText = this.props.newTextArray.join(' ');
        return (
            <div className="new-tweet-container">
                <div className="form-container">
                    <form className="tweet-form">
                    <label>NEW TWEET</label>
                    <textarea
                        size="280"
                        maxlength="280"
                        rows="7"
                        type="text"
                        value={newText}
                        />
                        <div className="new-tweet-buttons-container">
                        <a className="tweet-button"
                            href={`https://twitter.com/intent/tweet?text=${newText}`}
                            data-size="large"
                            target="_blank">
                            Tweet It</a>
                            <button className="start-over-button" type="submit">Start Over</button>
                        </div>
                    </form>  
                </div>
            </div>
        )
    } 
}
