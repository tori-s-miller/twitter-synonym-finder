import React from 'react';
import arrow from '../img/arrow.svg';

function ListItem(props) {
  const { value, clickedWord, handleInputClick } = props;
  
  return (
      <label onClick={handleInputClick} className={value === clickedWord ? 'label active' : 'label'}>{value}
        <input
        type="radio"
        value={value}
        hidden
        />
      </label>
  );
}

  
export default class Synonyms extends React.Component {
    constructor(props) {
        super(props);
        this.chooseWord = this.chooseWord.bind(this);
        this.keepOriginalWord = this.keepOriginalWord.bind(this);
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

    chooseWord() {
        this.props.chooseWord();
    }

    keepOriginalWord() {
      this.props.keepOriginalWord();
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
      }

      handleChange = (e) => {
        this.setState({ value: e.target.value });
      };


    render() {

        return (
            <div className="synonyms-container">
                {this.props.oldTextArray.length === 0 && <p>Synonym choices will appear here.</p>}
                {this.props.currentPosition === this.props.oldTextArray.length && <p>You've reached the end of your Tweet.</p>}
                {this.props.currentPosition !== this.props.oldTextArray.length && this.props.oldTextArray.length > 0 && this.props.clickedWord === null && <p>What word should replace <span className="strong-word">{this.props.oldTextArray[this.props.currentPosition]}</span>?</p>}
                {this.props.oldTextArray.length > 0 && this.props.clickedWord !== null && <p>Choose <span className="strong-word">{this.props.clickedWord}</span> to replace <span className="strong-word">{this.props.oldTextArray[this.props.currentPosition]}</span>.</p>}
                <div className="button-container">
                  <button className={this.props.oldTextArray.length === 0 || this.props.clickedWord === null || this.props.oldTextArray.length === this.props.currentPosition ? "choose-word-button button-inactive" : "choose-word-button"} onClick={this.chooseWord}>Choose this word</button>
                  <button className={this.props.oldTextArray.length === 0 || this.props.oldTextArray.length === this.props.currentPosition ? "keep-original-button button-inactive" : "keep-original-button"} onClick={this.keepOriginalWord}>Keep Original Word</button>
                </div>
                <div className="synonyms-sub-container">
                  <div className="nouns synonym-container">
                    <img src={arrow} alt="arrow" className={this.props.currentWordType === 'nouns' ? 'arrow-active' : 'arrow'} />
                    <h2 onClick={this.setNouns} className={this.props.currentWordType === 'nouns' ? 'synonym-active' : 'synonym-inactive'}>NOUNS</h2>
                    <ul>
                      <div className="list-item-container">
                      {this.props.currentWordType === 'nouns' && this.state.words.map((word, index) => (
                        word.tags !== undefined && word.tags.includes('n') && (
                          <div key={index} className="container">
                            <ListItem onChange={this.handleChange} value={word.word} clickedWord={this.props.clickedWord} currentValue={word.word} handleInputClick={this.props.handleInputClick} {...word} />
                          </div>
                          )
                        )
                      )}
                      </div>
                    </ul>
                  </div>
                  <div className="verbs synonym-container">
                    <img src={arrow} alt="arrow" className={this.props.currentWordType === 'verbs' ? 'arrow-active' : 'arrow'} />
                    <h2 onClick={this.setVerbs} className={this.props.currentWordType === 'verbs' ? 'synonym-active' : 'synonym-inactive'}>VERBS</h2>
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
                    <img src={arrow} alt="arrow" className={this.props.currentWordType === 'adjectives' ? 'arrow-active' : 'arrow'} />
                    <h2 onClick={this.setAdjectives} className={this.props.currentWordType === 'adjectives' ? 'synonym-active' : 'synonym-inactive'}>ADJECTIVES</h2>
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
                    <img src={arrow} alt="arrow" className={this.props.currentWordType === 'adverbs' ? 'arrow-active' : 'arrow'} />
                    <h2 onClick={this.setAdverbs} className={this.props.currentWordType === 'adverbs' ? 'synonym-active' : 'synonym-inactive'}>ADVERBS</h2>
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