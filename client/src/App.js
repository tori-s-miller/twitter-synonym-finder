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
    this.state = {
      error: null,
      isLoaded: false,
      counter: -1,
      currentWord: '',
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
    this.setState({oldTextArray: this.state.oldText.split(' ')});
    if(this.state.counter === -1) {
      this.setState({
        counter: this.state.counter + 1
      })
    }
  }

  chooseWord() {
    console.log('chooseWord ran in App')
    console.log('this.state.counter:', this.state.counter)
    this.setState({
      counter: this.state.counter + 1
    })
  }

  findCurrentWord() {
    let oldTextArray = this.state.oldTextArray;
    let currentPosition = this.state.counter;
    let currentWord = oldTextArray[currentPosition];
    // console.log('currentWord:', currentWord);
    // this.getDataFromApi();

    /* start at position zero */
    /* need a "go to next word" button to increment counter */
  }

  // getDataFromApi() {
  //   let oldTextArray = this.state.oldTextArray;
  //   let currentPosition = this.state.counter;
  //   let currentWord = oldTextArray[currentPosition];
  //   console.log('getDataFromApi this.state:', this.state);
  //   const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
  //   const DATAMUSE_SEARCH_URL = CORS_URL + 'https://api.datamuse.com/words?ml=';
  //   console.log('https://api.datamuse.com/words?ml= + currentWord:', `https://api.datamuse.com/words?ml=${currentWord}`)
  //   // fetch(DATAMUSE_SEARCH_URL)
  //   //   .then(res => res.json())
  //   //   .then(
  //   //     (result) => {
  //   //       console.log('DATAMUSE_SEARCH result:', result)
  //   //       this.setState({
  //   //         isLoaded: true,
  //   //         items: result.items
  //   //       });
  //   //     },
  //   //     (error) => {
  //   //       this.setState({
  //   //         isLoaded: true,
  //   //         error
  //   //       })
  //   //     }
  //   //   )
  // }


  /* 
  infinite loop triggered by fetch
  fetch must be called in "componentDidMount"
  can only be called once, so maybe try functional hook component? and pass state up?
  
  */

  

  componentDidMount() {
    console.log('APP componentDidMount ran')
    let oldTextArray = this.state.oldTextArray;
    let currentPosition = this.state.counter;
    let currentWord = oldTextArray[currentPosition];
    const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
    const DATAMUSE_SEARCH_URL = CORS_URL + `https://api.datamuse.com/words?ml=${currentWord}`;

    fetch(DATAMUSE_SEARCH_URL)
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
    const counter = this.state.counter;
    return (
      <div className="App">
        <div className="intro-container">
          <h1>Twitter Synonym Finder</h1>
          <p>Add your Tweet to the Original Tweet box to search for synonyms. 
            Select a new synonym, choose "Next", and send your new Tweet to 
            the world when you're done!</p>
        </div>
      {/* {this.findCurrentWord()} */}
      <OriginalTweet oldText={oldText} onTextChange={this.handleOldText} onFormSubmit={this.handleSubmit} />
      <NewTweet />
      <Synonyms
        key={counter}
        findCurrentWord={this.findCurrentWord} 
        oldTextArray={this.state.oldTextArray}
        currentPosition={this.state.counter}
        chooseWord={this.chooseWord}
       />
      </div>
    );
  }
}
