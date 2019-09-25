import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PairSelection extends Component {

    static propTypes = {
        allPairs: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                optionOneName: PropTypes.string,
                optionOneAudioUrl: PropTypes.string,
                optionTwoName: PropTypes.string,
                optionTwoAudioUrl: PropTypes.string,
            })
        ),
        selectPairHandler: PropTypes.func,
    };

    render() {
        return <div className="pairSelection">
            <ul>
            {
                this.props.allPairs.map((pair, index) => {
                    return <li key={index}
                               className="pairSelection-option"
                               onClick={() => this.props.selectPairHandler(pair)}>{pair.name}</li>
                })
            }
            </ul>
        </div>;
    }
}