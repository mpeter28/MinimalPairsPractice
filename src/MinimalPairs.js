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
        waitingOnResultsScreen: false,
        trainingSuccess: false,

        pairScores: {},
    };

    render() {
        if (!this.state.currentTrainingPair) {
            return <StartScreen startHandler={this.startTrainingHandler()}/>
        } else if (!this.state.waitingOnResultsScreen) {
            return <PracticeScreen chosenTrainingPair={this.state.currentTrainingPair}
                                   trainingPassedHandler={this.trainingPassedHandler()}
                                   trainingFailedHandler={this.trainingFailedHandler()} />;
        } else {
            return null;
        }
    }

    startTrainingHandler() {
        return () => {
            this.setState({
                currentTrainingPair: this.props.pairs[0],
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
                waitingOnResultsScreen: true,
                trainingSuccess: true,
            });
        }
    }

    trainingFailedHandler() {
        return () => {
            const newScores = {...this.state.pairScores};
            newScores[this.state.currentTrainingPair.name] = newScores[this.state.currentTrainingPair.name] - 1;

            this.setState({
                pairScores: newScores,
                waitingOnResultsScreen: true,
                trainingSuccess: false,
            });
        }
    }

}
