// import React from 'react'

// export default class Word extends React.Component {
//     constructor(props) {
//         super(props);
//         this.findCurrentWord = this.findCurrentWord.bind(this);
//         this.chooseWord = this.chooseWord.bind(this);
//     }

//     findCurrentWord() {
//         let oldTextArray = this.props.oldTextArray;
//         let currentPosition = this.props.currentPosition;
//         let currentWord = oldTextArray[currentPosition];
//         console.log('Word oldTextArray:', oldTextArray);
//         console.log('Word currentPosition:', currentPosition);
//         console.log('Word currentWord:', currentWord);
//     }

//     chooseWord(e) {
//         e.preventDefault();
//         this.props.chooseWord();
//     }

//     componentDidMount() {
//         console.log('WORD componentDidMount ran')
//         let oldTextArray = this.props.oldTextArray;
//         let currentPosition = this.props.currentPosition;
//         let currentWord = oldTextArray[currentPosition];
//         const CORS_URL = 'https://cors-anywhere.herokuapp.com/';
//         const DATAMUSE_SEARCH_URL = CORS_URL + `https://api.datamuse.com/words?ml=${currentWord}`;
    
//         fetch(DATAMUSE_SEARCH_URL)
//           .then(res => res.json())
//           .then(
//             (result) => {
//               console.log('Word result:', result)
//               this.setState({
//                 isLoaded: true,
//                 items: result.items
//               });
//             },
//             (error) => {
//               this.setState({
//                 isLoaded: true,
//                 error
//               })
//             }
//           )
//       }

//       /* REMOUNT A REACT COMONENT WHEN A PROP CHANGES */

//     render() {
//         {console.log('Word this.props:', this.props)}
//         {console.log('Word this.state:', this.state)}
//         return (
//             <div>
//                 {this.findCurrentWord()}
//                 <button onClick={this.chooseWord}>Choose this word</button>
//             </div>
//         )
//     }
// }