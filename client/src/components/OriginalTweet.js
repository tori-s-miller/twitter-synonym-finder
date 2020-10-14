import React, { useState } from 'react';

// export default class OriginalTweet extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             text: ''
//         }

//         this.handleText = this.handleText.bind(this);
//     }


//     handleText(e) {
//         this.setState({
//             text: e.target.value
//         })
//     }

//     render() {
//         {console.log('this.state:', this.state)}
//         return (
//             <div>
//                 <input 
//                     type="text"
//                     value={this.state.text}
//                     onChange={this.handleText}
//                     />
//             </div>
//         )
//     }
// }

export default function OriginalTweet() {
    // useState will return an array, with the first item in it being the current 
    // value of the state, and the second item being a setter to update that value.
    const [text, handleText] = useState('');
    const [textArray, setTextArray] = useState([]);

    console.log('text:', text);
    // console.log('textArray', textArray);


//      Keep track of state for an input field
//      Update the value on change
//      Make the field value available to the submit handler
{console.log('Original Tweet rendered')}

    return (
        <div>
            <form>
                <input 
                    type="text"
                    value={text}
                    onChange={e => handleText(e.target.value)}
                    />
                <input 
                    type="submit"
                    onSubmit={() => setTextArray(text)}
                    />
            </form>
        </div>
    )
}