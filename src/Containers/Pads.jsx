import React from 'react'
import { Grid } from '@material-ui/core'
import Pad from '../components/Pad'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    padsContainer: {
        marginTop: '17px'
    }
}));

const Pads = (props) => {
    const classes = useStyles();
    const { audioSounds,changePlayingStatus } = props;

    return (
        <Grid container justify="space-evenly" item xs={12} spacing={3} className={classes.padsContainer}>
            {audioSounds.map(as => <Pad key={as.id} audioSound={as} changePlayingStatus={changePlayingStatus} />)}
        </Grid>
    );
};

export default Pads;
