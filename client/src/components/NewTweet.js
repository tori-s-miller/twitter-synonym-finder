import React from 'react'

export default class NewTweet extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <form>
                    <input type="text"/>
                    <button>Submit Tweet</button>
                </form>
            </div>
        )
    } 
}
