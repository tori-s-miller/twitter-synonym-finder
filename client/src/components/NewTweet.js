import React from 'react'

export default class NewTweet extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
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
                        />
                        <button className="tweet-button" type="submit">Tweet</button>
                        <button className="start-over-button" type="submit">Start Over</button>
                    </form>  
                </div>
            </div>
        )
    } 
}
