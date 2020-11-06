import React from 'react';

{/* <label className={value === currentValue ? 'label active' : 'label'}>
      <input
      name={name}
      value={value}
      type="radio"
      onChange={onChange}
      hidden
      />{value}
  </label> */}

class ListItem extends React.Component {
  render() {
    const { name, value, clickedWord, onChange, handleInputClick } = this.props;
    // console.log('ListItem currentValue', currentValue)
    // console.log('ListItem value', value)
    return (
      <div >
        <label onClick={handleInputClick} className={value === clickedWord ? 'label active' : 'label'}>{value}
          <input
          type="radio"
          value={value}
          hidden
          />
        </label>
      </div>
    );
  }
}
  
export default class Synonyms extends React.Component {
    constructor(props) {
        super(props);
        this.findCurrentWord = this.findCurrentWord.bind(this);
        this.chooseWord = this.chooseWord.bind(this);
        this.setNouns = this.setNouns.bind(this);
        this.setVerbs = this.setVerbs.bind(this);
        this.setAdjectives = this.setAdjectives.bind(this);
        this.setAdverbs = this.setAdverbs.bind(this);
        this.state = {
          isLoaded: false,
          words: [],
          clickedWord: ''
        }
    }

    findCurrentWord() {
        let oldTextArray = this.props.oldTextArray;
        let currentPosition = this.props.currentPosition;
        let currentWord = oldTextArray[currentPosition];
    }

    chooseWord(e) {
        // e.preventDefault();
        this.props.chooseWord();
    }

    setNouns() {
      this.props.setNouns();
    }

    setVerbs() {
      this.props.setVerbs();
    }

    setAdjectives() {
      this.props.setAdjectives();
    }

    setAdverbs() {
      this.props.setAdverbs();
    }

    componentDidMount() {
        let oldTextArray = this.props.oldTextArray;
        let currentPosition = this.props.currentPosition;
        let currentWord = oldTextArray[currentPosition];
        const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
        const DATAMUSE_SEARCH_URL = CORS_URL + `https://api.datamuse.com/words?ml=${currentWord}`;
    
        fetch(DATAMUSE_SEARCH_URL)
          .then(res => res.json())
          .then(
            (result) => {
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

      handleChange = (e) => {
        this.setState({ value: e.target.value });
      };

      /* REMOUNT A REACT COMONENT WHEN A PROP CHANGES */

    render() {
      const { value } = this.state;
        return (
            <div className="synonyms-container">
                {this.findCurrentWord()}
                {this.props.oldTextArray.length > 0 && this.props.clickedWord === null && <p>What word should replace <span className="strong-word">{this.props.oldTextArray[this.props.currentPosition]}</span>?</p>}
                {this.props.oldTextArray.length > 0 && this.props.clickedWord !== null && <p>Choose <span className="strong-word">{this.props.clickedWord}</span> to replace <span className="strong-word">{this.props.oldTextArray[this.props.currentPosition]}</span>.</p>}
                <div className="button-container">
                  {console.log('Synonyms this.props:', this.props)}
                {/* className={value === clickedWord ? 'label active' : 'label'} */}
                  <button className={this.props.oldTextArray.length === 0 || this.props.clickedWord === null || this.props.oldTextArray.length === this.props.currentPosition ? "choose-word-button button-inactive" : "choose-word-button"} onClick={this.chooseWord}>Choose this word</button>
                  <button className="keep-original-button">Keep Original Word</button>
                </div>
                <div className="synonyms-sub-container">
                  <div className="nouns synonym-container">
                    <h2 onClick={this.setNouns}>NOUNS</h2>
                    <ul>
                      {this.props.currentWordType === 'nouns' && this.state.words.map((word, index) => (
                        word.tags !== undefined && word.tags.includes('n') && (
                          <div key={index} className="container">
                            <ListItem onChange={this.handleChange} value={word.word} clickedWord={this.props.clickedWord} currentValue={word.word} handleInputClick={this.props.handleInputClick} {...word} />
                          </div>
                          )
                        )
                      )}
                    </ul>
                  </div>
                  <div className="verbs synonym-container">
                    <h2 onClick={this.setVerbs}>VERBS</h2>
                    <ul>
                      {this.props.currentWordType === 'verbs' && this.state.words.map((word, index) => (
                        word.tags !== undefined && word.tags.includes('v') && (
                          <div key={index} className="container">
                            <ListItem onChange={this.handleChange} value={word.word} clickedWord={this.props.clickedWord} currentValue={word.word} handleInputClick={this.props.handleInputClick} {...word} />
                          </div>
                          )
                        )
                      )}
                    </ul>
                  </div>
                  <div className="adjectives synonym-container">
                    <h2 onClick={this.setAdjectives}>ADJECTIVES</h2>
                    <ul>
                    {this.props.currentWordType === 'adjectives' && this.state.words.map((word, index) => (
                      word.tags !== undefined && word.tags.includes('adj') && (
                        <div key={index} className="container">
                          <ListItem onChange={this.handleChange} value={word.word} clickedWord={this.props.clickedWord} currentValue={word.word} handleInputClick={this.props.handleInputClick} {...word} />
                        </div>
                        )
                      )
                    )}
                    </ul>
                  </div>
                  <div className="adverbs synonym-container">
                    <h2 onClick={this.setAdverbs}>ADVERBS</h2>
                    {this.props.currentWordType === 'adverbs' && this.state.words.map((word, index) => (
                      word.tags !== undefined && word.tags.includes('adv') && (
                        <div key={index} className="container">
                            <ListItem onChange={this.handleChange} value={word.word} clickedWord={this.props.clickedWord} currentValue={word.word} handleInputClick={this.props.handleInputClick} {...word} />
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>
            </div>
        )
    }
}