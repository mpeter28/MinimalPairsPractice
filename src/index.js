import React from 'react';
import ReactDOM from 'react-dom';
import MinimalPairs from './MinimalPairs.js';

const pairs = [
    {
        name: "langes e / kurzes e",
        optionOneName: "langes e",
        optionOneAudioUrl: "",
        optionTwoName: "kurzes e",
        optionTwoAudioUrl: "",
    },

];

ReactDOM.render(
    <MinimalPairs pairs={pairs}/>,
    document.getElementById('root')
);
