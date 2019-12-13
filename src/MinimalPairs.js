import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PracticeScreen from './PracticeScreen/PracticeScreen.js';
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
        pairScores: {},
        roundNumber: 0,
    };

    render() {
        if (!this.state.currentTrainingPair) {
            return <StartScreen startHandler={this.startTrainingHandler()}/>
        } else {
            return <PracticeScreen key={this.state.roundNumber}
                                   chosenTrainingPair={this.state.currentTrainingPair}
                                   trainingPassedHandler={this.trainingPassedHandler()}
                                   trainingFailedHandler={this.trainingFailedHandler()} />;
        }
    }

    startTrainingHandler() {
        return () => {
            this.setState({
                currentTrainingPair: this.choseNextPair(),
                waitingOnResultsScreen: false,
            });
        };
    }

    trainingPassedHandler() {
        return () => {
            const newScores = {...this.state.pairScores};
            newScores[this.state.currentTrainingPair.name] = newScores[this.state.currentTrainingPair.name] + 1;

            this.setState({
                pairScores: newScores,
                currentTrainingPair: this.choseNextPair(),
                roundNumber: this.state.roundNumber + 1,
            });
        }
    }

    trainingFailedHandler() {
        return () => {
            const newScores = {...this.state.pairScores};
            newScores[this.state.currentTrainingPair.name] = newScores[this.state.currentTrainingPair.name] - 1;

            this.setState({
                pairScores: newScores,
                currentTrainingPair: this.choseNextPair(),
                roundNumber: this.state.roundNumber + 1,
            });
        }
    }

    choseNextPair() {
        while (true) {
            const index = Math.floor((Math.random() * this.props.pairs.length));
            const chosenPair = this.props.pairs[index];

            if (!this.state.pairScores[chosenPair.name] || this.state.pairScores[chosenPair.name] < 10) {
                return chosenPair;
            }
        }
    }

}
