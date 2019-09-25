import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PairTrainingSet from './PracticeScreen/PairTrainingSet.js';
import PairSelection from './PairSelection/PairSelection.js';

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
        chosenTrainingPair: null,
        passedPairs: [],
        failedPairs: [],
    };

    render() {

        if (this.state.chosenTrainingPair) {
            return <PairTrainingSet chosenTrainingPair={this.state.chosenTrainingPair}
                                    trainingPassedHandler={this.trainingPassedHandler()}
                                    trainingFailedHandler={this.trainingFailedHandler()} />;
        } else {
            return <PairSelection allPairs={this.props.pairs}
                                  passedPairs={this.state.passedPairs}
                                  failedPairs={this.state.failedPairs}
                                  selectPairHandler={this.selectPairHandler()} />;
        }
    }

    selectPairHandler() {
        return (selectPairHandler) => {
            this.setState({
                chosenTrainingPair: selectPairHandler
            });
        };
    }

    trainingPassedHandler() {
        return (selectPairHandler) => {
            this.setState(state => {

                return {
                    chosenTrainingPair: null,
                    passedPairs: state.passedPairs.concat(state.chosenTrainingPair)
                };
            });
        };
    }

    trainingFailedHandler() {
        return (selectPairHandler) => {
            this.setState(state => {

                return {
                    chosenTrainingPair: null,
                    failedPairs: state.failedPairs.concat(state.chosenTrainingPair)
                };
            });
        };
    }
}
