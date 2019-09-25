import React from 'react';
import ReactDOM from 'react-dom';
import MinimalPairs from './MinimalPairs.js';

const pairs = [
    {
        name: "voiceless bilabial plosive / voiced bilabial plosive",
        optionOneName: "p",
        optionOneAudioUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Voiceless_bilabial_plosive.ogg",
        optionTwoName: "b",
        optionTwoAudioUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Voiced_bilabial_plosive.ogg",
    },

];

ReactDOM.render(
    <MinimalPairs pairs={pairs}/>,
    document.getElementById('root')
);
