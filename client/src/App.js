import React from 'react';
import axios from 'axios';
import OriginalTweet from './components/OriginalTweet';
import './App.css';

function App() {

  useEffect(() => {
    fetch('https://api.datamuse.com/words?ml=')
    .then(res => res.json())
    .then(items => setItems(items))
    .catch(console.log(err))
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
