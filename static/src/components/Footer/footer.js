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

class Footer extends Component {
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
                Created by Andrew Quach and Stan Lyakhov for CS 290
                </Typography>
                <Button color="inherit" href="/g/all">All</Button>
                <Button color="inherit" href="/g/blues">Blues</Button>
                <Button color="inherit" href="/g/classical">Classical</Button>
                <Button color="inherit" href="/g/country">Country</Button>
                <Button color="inherit" href="/g/rock">Rock</Button>
                <Button color="inherit" href="/g/jazz">Jazz</Button>
                <Button color="inherit" href="/g/pop">Pop</Button>
                <Button color="inherit" href="/g/electronic">Electronic</Button>
            </Toolbar>
            </AppBar>
        </header>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer);
