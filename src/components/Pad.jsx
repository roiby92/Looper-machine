import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
const useStyles = makeStyles(() => ({
    pad: {
        height: '120px',
        width: '120px',
        border: '10px black solid',
        borderRadius: '4px',
    },
}));
const Pad = (props) => {
    const classes = useStyles();
    const { audioSound, changePlayingStatus } = props

    const changeStatus = () => {
        changePlayingStatus(audioSound.id)
    }

    return (
        <Grid item xs={4} lg={4} container justify='center'>
            <Button variant="contained" className={classes.pad} onClick={changeStatus}>
                {audioSound.name}
            </Button>
        </Grid >
    );
};
export default Pad;