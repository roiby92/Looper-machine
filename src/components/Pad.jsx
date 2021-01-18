import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    pad: {
        height: '100px',
        width: '100px',
        backgroundColor: 'black',
        borderRadius: '4px',
    }
}));

const Pad = (props) => {
    const classes = useStyles();
    const { audioSound, changePlayingStatus } = props

    const changeStatus = () => {
        changePlayingStatus(audioSound.id)
    }

    return (
        <Grid item xs={4} lg={4} container justify='center'>
            <div className={classes.pad} onClick={changeStatus} >
            </div>
        </Grid>
    );
};
export default Pad;