import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PairTrainingSet from './PracticeScreen/PairTrainingSet.js';
import StartScreen from './StartScreen/StartScreen.js';

export default class MinimalPairs extends Component {

    static propTypes = {
        pairs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                optionOneName: PropTypes.string,
                optionOneAudioUrl: PropTypes.string,
                optionTwoName: PropTypes.string,
                optionTwoAudioUrl: PropTypes.string,
            })
        )
    };

    state = {

    };

    render() {
        return <StartScreen startHandler={this.startTrainingHandler()}/>

    }

    startTrainingHandler() {
        return () => {

        }
    }


}
