import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Recorde from './Recorde'
const useStyles = makeStyles(() => ({
    controlerContainer: {
        marginTop: '25px'
    }
}));
const Controlers = (props) => {

    const classes = useStyles();
    const { play, stop } = props;

    return (
        <div className={classes.controlerContainer}>
            <Grid container justify="center" item xs={12} spacing={3}>
                <Grid item >
                    <Button variant="contained" color="primary" onClick={() => play()}>
                        Play
                    </Button>
                </Grid>
                <Grid item >
                    <Button variant="contained" color="secondary" onClick={() => stop()}>
                        Stop
                    </Button>
                </Grid>
                <Grid item>
                    <Recorde stopPad = {stop}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Controlers;
