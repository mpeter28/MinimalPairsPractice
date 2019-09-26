import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PairTrainingSet extends Component {

    static propTypes = {
        chosenTrainingPair: PropTypes.shape({
            name: PropTypes.string,
            optionOneName: PropTypes.string,
            optionOneAudioUrl: PropTypes.string,
            optionTwoName: PropTypes.string,
            optionTwoAudioUrl: PropTypes.string,
        }),
        trainingPassedHandler: PropTypes.func,
        trainingFailedHandler: PropTypes.func,
    };

    state = {
        successCount: 0,
        failureCount: 0,
        round: 0,
        waitingToStart: true,
        lastGuessSuccess: true,
        useFirstOption: Math.random() > 0.5,
    };

    render() {
        return <div className="pairTrainingSet">
            <h3 className="pairTrainingSet-name">{ this.props.chosenTrainingPair.name }</h3>

            { this.renderMainContent() }
        </div>;
    }

    renderMainContent() {

        if (this.state.waitingToStart) {
            if (this.state.successCount === 0 && this.state.failureCount === 0) { // Start screen
                return <div>
                    { this.getStartButton() }
                </div>;

            } else if (this.state.successCount === 0 + this.state.failureCount === 20) { // End screen
                return <div>
                    { this.getAudioPlayer() }
                    { this.getScoreCard() }
                    { this.getDoneButton() }
                </div>;

            } else { // results screen
                return <div>
                    { this.getAudioPlayer() }
                    { this.getResultsFromLastRound() }
                    { this.getScoreCard() }
                    { this.getStartButton() }
                </div>;

            }
        } else { // guessing screen
            return <div>
                { this.getAudioPlayer() }
                { this.getGuessControls() }
            </div>;
        }
    }

    getDoneButton() {
        return <button className="pairTrainingSet-doneButton" onClick={this.done()}>
            Choose Next Pair
        </button>;
    }

    done() {
        return () => {
            (this.state.successCount >= 16
                ? this.props.trainingPassedHandler
                : this.props.trainingFailedHandler)();
        };
    }

    getResultsFromLastRound() {
        return <p className="pairTrainingSet-roundResults">
            { this.state.lastGuessSuccess ? 'Correct!' : 'Wrong :(' }
        </p>;
    }

    getStartButton() {
        return <button className="pairTrainingSet-startButton" onClick={() => this.setState({ waitingToStart: false,
                    useFirstOption: Math.random() > 0.5, round: this.state.round + 1})}>
            Begin
        </button>;
    }

    getScoreCard() {
        return <div className="pairTrainingSet-scoreCard">
            <span>{this.state.successCount} Correct</span>
            <span>{this.state.failureCount} Failed</span>
        </div>
    }

    getAudioPlayer() {
        return <audio key={this.state.round} controls autoPlay={true} className="pairTrainingSet-audioPlayer">
            <source src={this.getTestAudioUrl()} type="audio/ogg" />
            Your browser does not support the audio element.
        </audio>;
    }

    getGuessControls() {
        return <div className="pairTrainingSet-controls">
            <button className="pairTrainingSet-optionOne"
                    onClick={this.guessOptionOne()}>
                {this.props.chosenTrainingPair.optionOneName}
            </button>

            <button className="pairTrainingSet-optionTwo"
                    onClick={this.guessOptionTwo()}>
                {this.props.chosenTrainingPair.optionTwoName}
            </button>
        </div>;
    }

    getTestAudioUrl() {
        return this.state.useFirstOption
            ? this.props.chosenTrainingPair.optionOneAudioUrl
            : this.props.chosenTrainingPair.optionTwoAudioUrl;
    }

    guessOptionOne() {
        return () => {
            this.setState((state) => {
                return {
                    successCount: state.successCount + (state.useFirstOption ? 1 : 0),
                    failureCount: state.failureCount + (state.useFirstOption ? 0 : 1),
                    waitingToStart: true,
                    lastGuessSuccess: state.useFirstOption,
                }
            });
        }
    }

    guessOptionTwo() {
        return () => {
            this.setState((state) => {
                return {
                    successCount: state.successCount + (state.useFirstOption ? 0 : 1),
                    failureCount: state.failureCount + (state.useFirstOption ? 1 : 0),
                    waitingToStart: true,
                    lastGuessSuccess: !state.useFirstOption,
                }
            });
        }
    }
}