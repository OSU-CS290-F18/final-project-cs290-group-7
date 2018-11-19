import React, { Component } from "react";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
}

class Header extends Component {
    render() {
        const { classes } = this.props;

        return (
        <header className = {classes.root}>
            <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    color="inherit"
                    className = {classes.grow}
                >
                Group 7 Project
                </Typography>
                <Button color="inherit" href="/register">Register</Button>
                <Button color="inherit" href="/login">Login</Button>
            </Toolbar>
            </AppBar>
        </header>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header);
