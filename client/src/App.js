import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OriginalTweet from './components/OriginalTweet';
import './App.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleText = this.handleText.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      text: '',
      textArray: []
    }
  }

  handleText(text) {
        this.setState({
            text
        })
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
    const text = this.state.text;
    console.log('App this.state:', this.state)
    return (
      <div className="App">
      <h1>Twitter Synonym Finder</h1>
      <p>Add your Tweet to the Original Tweet box to search for synonyms. 
          Select a new synonym, choose "Next", and send your new Tweet to 
          the world when you're done!</p>
      <OriginalTweet text={text} onTextChange={this.handleText} />
      </div>
    );
  }
}
