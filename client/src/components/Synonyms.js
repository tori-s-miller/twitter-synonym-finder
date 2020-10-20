import React from 'react'

export default class Synonyms extends React.Component {
    constructor(props) {
        super(props);
        this.chooseWord = this.chooseWord.bind(this);
    }

    chooseWord(e) {
        e.preventDefault();
        this.props.chooseWord();
      }
    
    componentDidMount() {
        console.log('SYNONYMS componentDidMount ran')
    }

    render() {
        return (
            <div>
                <button onClick={this.chooseWord}>Choose this word</button>
            </div>
        )
    }
}
