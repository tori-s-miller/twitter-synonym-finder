import React from 'react'

export default class NewTweet extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const newText = this.props.newTextArray.join(' ');
        console.log('newText:', newText)
        return (
            <div className="new-tweet-container">
                {console.log('NewTweet this.props:', this.props)}
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
                        <button className="tweet-button" type="submit">Tweet</button>
                        <button className="start-over-button" type="submit">Start Over</button>
                    </form>  
                </div>
            </div>
        )
    } 
}
