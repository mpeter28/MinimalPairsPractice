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
        waitingToStart: true,
        useFirstOption: Math.random > 0.5,
    };

    render() {
        return <div className="pairTrainingSet">
            <h3 className="pairTrainingSet-name">{ this.props.chosenTrainingPair.name }</h3>

            <audio controls className="pairTrainingSet-audioPlayer">
                <source src={this.getTestAudioUrl()} type="audio/ogg" />
                Your browser does not support the audio element.
            </audio>

            <div className="pairTrainingSet-controls">
                <button className="pairTrainingSet-optionOne">
                    {this.props.chosenTrainingPair.optionOneName}
                </button>

                <button className="pairTrainingSet-optionTwo">
                    {this.props.chosenTrainingPair.optionTwoName}
                </button>
            </div>
        </div>;
    }

    getTestAudioUrl() {
        return this.state.useFirstOption
            ? this.props.chosenTrainingPair.optionOneAudioUrl
            : this.props.chosenTrainingPair.optionTwoAudioUrl;
    }

    guessOptionOne() {
        
    }

    guessOptionTwo() {

    }
}