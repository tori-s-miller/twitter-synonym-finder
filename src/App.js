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
      clickedWord: null,
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
    const noWords = this.state.oldTextArray.length === 0;
    const nothingClicked = this.state.clickedWord === null;
    const endOfArray = this.state.oldTextArray.length === this.state.counter +1;
    const oldTextArrayLength = this.state.oldTextArray;
    const newTextArrayLength = this.state.newTextArray.length;

    if(oldTextArrayLength === newTextArrayLength) {
      this.setState({
        currentWordType: null
      })
    }

    if(noWords || nothingClicked) {
      console.log('create an alert')
    } else if(endOfArray) {
      this.state.newTextArray.push(this.state.clickedWord)
      this.setState({
        currentWordType: null,
        counter: this.state.counter + 1,
        clickedWord: null,
        newTextArray: this.state.newTextArray
      })
    } else {
      this.state.newTextArray.push(this.state.clickedWord)
      this.setState({
        counter: this.state.counter + 1,
        clickedWord: null,
        newTextArray: this.state.newTextArray
      })
    }
  }

  keepOriginalWord() {
    this.state.newTextArray.push(this.state.oldTextArray[this.state.counter])
    this.setState({
      clickedWord: null,
      counter: this.state.counter + 1,
      newTextArray: this.state.newTextArray
    })
  }

  handleInputClick(e) {
    const event = e.target.value;
    if(event !== undefined) {
      this.setState({
        clickedWord: event
      })
    }
  }

  setNouns() {
    this.state.currentWordType !== 'nouns' ? (
      this.setState({
        currentWordType: 'nouns'
      })
    ) : (
      this.setState({
        currentWordType: null
      })
    )
  }

  setVerbs() {
    this.state.currentWordType !== 'verbs' ? (
      this.setState({
        currentWordType: 'verbs'
      })
    ) : (
      this.setState({
        currentWordType: null
      })
    )
    
  }

  setAdjectives() {
    this.state.currentWordType !== 'adjectives' ? (
      this.setState({
        currentWordType: 'adjectives'
      })
    ) : (
      this.setState({
        currentWordType: null
      })
    )
  }

  setAdverbs() {
    this.state.currentWordType !== 'adverbs' ? (
      this.setState({
        currentWordType: 'adverbs'
      })
    ) : (
      this.setState({
        currentWordType: null
      })
    )
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
      <OriginalTweet 
        oldText={oldText} 
        onTextChange={this.handleOldText} 
        onFormSubmit={this.handleSubmit}
      />
      <NewTweet newTextArray={this.state.newTextArray} />
      <Synonyms
        key={counter}
        oldTextArray={this.state.oldTextArray}
        currentPosition={counter}
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