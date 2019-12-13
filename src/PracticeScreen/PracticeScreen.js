import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PairTrainingSet.less';

export default class PracticeScreen extends Component {

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
        useFirstOption: Math.random() > 0.5,
        success: false,
        roundDone: false,
    };

    render() {
        return <div className="pairTrainingSet">
            <h3 className="pairTrainingSet-name">{ this.props.chosenTrainingPair.name }</h3>

            <div className="pairTrainingSet-content">
                { this.getAudioPlayer() }
                { this.state.roundDone ? this.getResultsFromLastRound() : null }
                { this.state.roundDone ? this.getRoundOverButton() : this.getGuessControls() }
            </div>
        </div>;
    }

    getAudioPlayer() {
        return <audio key={this.props.chosenTrainingPair.name} controls autoPlay={true} className="pairTrainingSet-audioPlayer">
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

    getRoundOverButton() {
        return <div className="pairTrainingSet-controls">
            <button className="pairTrainingSet-optionOne" onClick={ () => {this.state.success ? this.props.trainingPassedHandler() : this.props.trainingFailedHandler() } }>
                Next Minimal Pair
            </button>
        </div>;
    }

    getResultsFromLastRound() {
        return <p className="pairTrainingSet-roundResults">
            { this.state.success ? 'Correct!' : 'Wrong :(' }
        </p>;
    }

    getTestAudioUrl() {
        return this.state.useFirstOption
            ? this.props.chosenTrainingPair.optionOneAudioUrl
            : this.props.chosenTrainingPair.optionTwoAudioUrl;
    }

    guessOptionOne() {
        return () => {
            this.setState({
                success: this.state.useFirstOption,
                roundDone: true,
            });
        }
    }

    guessOptionTwo() {
        return () => {
            this.setState({
                success: !this.state.useFirstOption,
                roundDone: true,
            });
        }
    }
}