import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    navBar: {
        position:'static',
        height:'100px',
        textAlign: 'center',
        backgroundColor: '#878686'
    },
}));

const NavBar = () => {
    const classes = useStyles();
    return (
            <AppBar className={classes.navBar}>
                <h2>Looper Machine - Let's Make Music</h2>
            </AppBar>
    );
};

export default NavBar;
