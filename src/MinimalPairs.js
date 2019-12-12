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
        currentTrainingPair: null,
    };

    render() {
        if (!this.state.currentTrainingPair) {
            return <StartScreen startHandler={this.startTrainingHandler()}/>
        } else {
            return null;
        }


    }

    startTrainingHandler() {
        return () => {
            this.setState({
                currentTrainingPair: {foo: "bar"}
            });
        };
    }


}
