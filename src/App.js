import React from 'react';
import OriginalTweet from './components/OriginalTweet';
import NewTweet from './components/NewTweet';
import Synonyms from './components/Synonyms';
import './App.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleOldText = this.handleOldText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findCurrentWord = this.findCurrentWord.bind(this);
    // this.getDataFromApi = this.getDataFromApi.bind(this);
    this.chooseWord = this.chooseWord.bind(this);
    this.keepOriginalWord = this.keepOriginalWord.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.setNouns = this.setNouns.bind(this);
    this.setVerbs = this.setVerbs.bind(this);
    this.setAdjectives = this.setAdjectives.bind(this);
    this.setAdverbs = this.setAdverbs.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      counter: -1,
      currentWord: '',
      items: [],
      oldText: '',
      oldTextArray: [],
      newTextArray: [],
      currentWord: '',
      synonyms: {
        nouns: [],
        verbs: [],
        adjectives: [],
        adverbs: []
      },
      currentWordType: null,
      clickedWord: null
    }

    

  }

  handleOldText(oldText) {
        this.setState({
          oldText
        })
    }
  
  handleSubmit() {
    this.setState({oldTextArray: this.state.oldText.split(' ')});
    if(this.state.counter === -1) {
      this.setState({
        counter: this.state.counter + 1,
        currentWordType: 'nouns'
      })
    }
  }

  chooseWord() {
    console.log('chooseWord ran in App')
    const noWords = this.state.oldTextArray.length === 0;
    const nothingClicked = this.state.clickedWord === null;
    const endOfArray = this.state.oldTextArray.length === this.state.counter +1;
    console.log('this.state.oldTextArray.length:', this.state.oldTextArray.length)
    console.log('this.state.counter:', this.state.counter)
    console.log('endOfArray:', endOfArray)
    if(noWords || nothingClicked) {
      console.log('noWords || nothingClicked ran')
      console.log('this.state.oldTextArray.length', this.state.oldTextArray.length, 'this.state.counter', this.state.counter)
    } else if(endOfArray) {
      console.log('its the end of array')
      const newArrayItem = this.state.newTextArray.push(this.state.clickedWord)
      this.setState({
        currentWordType: null,
        counter: this.state.counter + 1,
        clickedWord: null,
        newTextArray: this.state.newTextArray
      })
    } else {
      console.log('else ran')
      const newArrayItem = this.state.newTextArray.push(this.state.clickedWord)
      this.setState({
        counter: this.state.counter + 1,
        clickedWord: null,
        newTextArray: this.state.newTextArray
      })
    }
  }

  keepOriginalWord() {
    console.log('keepOriginalWord this.state:', this.state)
    console.log('original word:', this.state.oldTextArray[this.state.counter])
    const newArrayItem = this.state.newTextArray.push(this.state.oldTextArray[this.state.counter])
    this.setState({
      counter: this.state.counter + 1,
      newTextArray: this.state.newTextArray
    })
  }

  findCurrentWord() {
    let oldTextArray = this.state.oldTextArray;
    let currentPosition = this.state.counter;
    let currentWord = oldTextArray[currentPosition];
    console.log('findCurrentWord() currentWord:', currentWord);
    // this.getDataFromApi();

    /* start at position zero */
    /* need a "go to next word" button to increment counter */
  }

  handleInputClick(e) {
    // e.preventDefault();
    const event = e.target.value;
    console.log('handleInputClick e.target:', e.target)
    console.log('handleInputClick event:', event);
    if(event !== undefined) {
      console.log('event !== undefined:', event !== undefined)
      this.setState({
        clickedWord: event
      })
    }
    console.log('handleInputClick this.state:', this.state)
  }

  setNouns() {
    this.setState({
      currentWordType: 'nouns'
    })
  }

  setVerbs() {
    this.setState({
      currentWordType: 'verbs'
    })
  }

  setAdjectives() {
    this.setState({
      currentWordType: 'adjectives'
    })
  }

  setAdverbs() {
    this.setState({
      currentWordType: 'adverbs'
    })
  }

  render() {
    const oldText = this.state.oldText;
    const counter = this.state.counter;
    return (
      <div className="App">
        <div className="intro-container">
          <h1>Twitter Synonym Finder</h1>
          <p>Add your Tweet to the Original Tweet box and choose "Search for Synonyms." 
            Select a new synonym, choose "Next", and send your new Tweet to 
            the world when you're done!</p>
        </div>
      {/* {this.findCurrentWord()} */}
      <OriginalTweet oldText={oldText} onTextChange={this.handleOldText} onFormSubmit={this.handleSubmit} counter={counter} oldTextArray={this.state.oldTextArray} />
      <NewTweet newTextArray={this.state.newTextArray} />
      <Synonyms
        key={counter}
        findCurrentWord={this.findCurrentWord} 
        oldTextArray={this.state.oldTextArray}
        currentPosition={this.state.counter}
        chooseWord={this.chooseWord}
        keepOriginalWord={this.keepOriginalWord}
        setNouns={this.setNouns}
        setVerbs={this.setVerbs}
        setAdjectives={this.setAdjectives}
        setAdverbs={this.setAdverbs}
        currentWordType={this.state.currentWordType}
        handleInputClick={this.handleInputClick}
        clickedWord={this.state.clickedWord}
       />
      </div>
    );
  }
}
