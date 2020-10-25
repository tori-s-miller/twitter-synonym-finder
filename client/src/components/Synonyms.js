import React from 'react'

export default class Word extends React.Component {
    constructor(props) {
        super(props);
        this.findCurrentWord = this.findCurrentWord.bind(this);
        this.chooseWord = this.chooseWord.bind(this);
        this.state = {
          isLoaded: false,
          words: []
        }
    }

    findCurrentWord() {
        let oldTextArray = this.props.oldTextArray;
        let currentPosition = this.props.currentPosition;
        let currentWord = oldTextArray[currentPosition];
        console.log('Synonyms oldTextArray:', oldTextArray);
        console.log('Synonyms currentPosition:', currentPosition);
        console.log('Synonyms currentWord:', currentWord);
    }

    chooseWord(e) {
        e.preventDefault();
        this.props.chooseWord();
    }

    componentDidMount() {
        console.log('Synonyms componentDidMount ran')
        let oldTextArray = this.props.oldTextArray;
        let currentPosition = this.props.currentPosition;
        let currentWord = oldTextArray[currentPosition];
        const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
        const DATAMUSE_SEARCH_URL = CORS_URL + `https://api.datamuse.com/words?ml=${currentWord}`;
    
        fetch(DATAMUSE_SEARCH_URL)
          .then(res => res.json())
          .then(
            (result) => {
              console.log('Synonyms result from API:', result)
              this.setState({
                isLoaded: true,
                words: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              })
            }
          )
          {console.log('Synonyms this.state at end of ComponentDidMount:', this.state)}
      }

      /* REMOUNT A REACT COMONENT WHEN A PROP CHANGES */

    render() {
        {console.log('Synonyms this.props:', this.props)}
        {console.log('Synonyms this.state:', this.state)}
        return (
            <div>
                {this.findCurrentWord()}
                <p>Choose replacement to replace word.</p>
                <button onClick={this.chooseWord}>Choose this word</button>
                <button>Keep Original Word</button>
                <div className="synonyms-container">
                  <div className="nouns">
                    <h2>Nouns</h2>
                    {this.state.words.map((word, index) => (
                      <li key={index}>{this.state.word}</li>
                    ))}
                  </div>
                  <div className="verbs">
                    <h2>Verbs</h2>
                  </div>
                  <div className="adjectives">
                    <h2>Adjectives</h2>
                  </div>
                  <div className="adverbs">
                    <h2>Adverbs</h2>
                  </div>
                </div>
            </div>
        )
    }
}