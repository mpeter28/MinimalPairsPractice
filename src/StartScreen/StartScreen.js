import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './StartScreen.less';

export default class StartScreen extends Component {

    static propTypes = {
        startHandler: PropTypes.func,
    };

    render() {
        return <div className="startScreen">
            <h3 className="startScreen-title">
                German Minimal Pair Training
            </h3>

            <p className="startScreen-explanation">
                Every round, listen to the audio clip and decide which of the two words is being spoken
            </p>

            <button className="startScreen-start" onClick={this.props.startHandler}>
                Begin!
            </button>
        </div>;
    }

}