import React from 'react'

export default class Word extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        {console.log('Word this.props:', this.props)}
        return (
            <div>Word</div>
        )
    }
}