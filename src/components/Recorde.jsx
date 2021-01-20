import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { Button, Grid } from '@material-ui/core';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorde extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            blobURL: '',
            isBlocked: false,
        };
    }

    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                this.setState({ blobURL, isRecording: false });
                this.props.stopPad()
            }).catch((e) => console.log(e));
    };

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
    }

    render() {
        return (
            <Grid container justify="center" item xs={12} spacing={3}>
                {!this.state.isRecording ?
                    <Button variant="contained" color="green" onClick={this.start}>Start Record</Button>
                    :
                    <Button variant="contained" color="red" onClick={this.stop}>Stop recording</Button>
                }
                {this.state.blobURL ? <audio src={this.state.blobURL} controls="controls" /> : null}
            </Grid>
        );
    }
}

export default Recorde