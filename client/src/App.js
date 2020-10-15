import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OriginalTweet from './components/OriginalTweet';
import NewTweet from './components/NewTweet';
import './App.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleOldText = this.handleOldText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findCurrentWord = this.findCurrentWord.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      oldText: '',
      oldTextArray: [],
      currentWord: '',
      synonyms: {
        nouns: [],
        verbs: [],
        adjectives: [],
        adverbs: []
      }
    }
  }

  /*
  
  take each item in oldTextArray, push to this.state.currentWord, 
  (need some sort of counter) and place 
  at the end of the api string

  push those results to this.state.synonyms

  iterate over tags, if the value is equal to "n", push to nouns, etc

  create "View Nouns", "View Adjectives" etc components

  */

  handleOldText(oldText) {
        this.setState({
          oldText
        })
    }
  
  handleSubmit() {
    this.setState({oldTextArray: this.state.oldText.split(' ')})
  }

  findCurrentWord() {
    this.state.oldTextArray.map(word => console.log('word:', word))
    /* start at position zero */
    /* need a "go to next word" button to increment counter */
  }

  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/' + 'https://api.datamuse.com/words?ml=work')
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result:', result)
          this.setState({
            isLoaded: true,
            items: result.items
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
// const CORS_URL = 'https://cors-anywhere.herokuapp.com/';

//   const [data, setData] = useState({ hits: [] });

//   useEffect(() => {
//     async function fetchData() {
//       const result = await axios(
//         CORS_URL + 'https://api.datamuse.com/words?ml='
//       );
  
//       setData(result.data);
//       console.log('result.data:', result.data)
//     }
//     fetchData();
//   }, [])
  render() {
    const oldText = this.state.oldText;
    console.log('App this.state:', this.state)
    return (
      <div className="App">
      <h1>Twitter Synonym Finder</h1>
      <p>Add your Tweet to the Original Tweet box to search for synonyms. 
          Select a new synonym, choose "Next", and send your new Tweet to 
          the world when you're done!</p>
      <OriginalTweet oldText={oldText} onTextChange={this.handleOldText} onFormSubmit={this.handleSubmit} />
      <NewTweet />
      </div>
    );
  }
}
