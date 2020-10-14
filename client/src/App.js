import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OriginalTweet from './components/OriginalTweet';
import './App.css';


function App() {
const CORS_URL = 'https://cors-anywhere.herokuapp.com/';

  const [data, setData] = useState({ hits: [] });

  // const [tweetArray]

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        CORS_URL + 'https://api.datamuse.com/words?ml='
      );
  
      setData(result.data);
      console.log('result.data:', result.data)
    }
    fetchData();
  }, [])

  return (
    <div className="App">
    <h1>Twitter Synonym Finder</h1>
    <p>Add your Tweet to the Original Tweet box to search for synonyms. 
        Select a new synonym, choose "Next", and send your new Tweet to 
        the world when you're done!</p>
    <OriginalTweet />
    </div>
  );
}

export default App;
