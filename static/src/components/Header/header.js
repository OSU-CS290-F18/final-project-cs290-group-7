import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import * as actionCreators from "../../actions/authentication";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        username: state.authentication.username,
        token: state.authentication.token,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Header extends Component {
    logout(e, token) {
        e.preventDefault();
        this.props.logout(token);
    }

    render() {
        const { classes } = this.props;

        let rightNav;
        if (this.props.isAuthenticated && this.props.username) {
            rightNav =
                <div>
                    <Button color="inherit">{this.props.username} User Page</Button>
                    <Button color="inherit" onClick={(e) => this.logout(e, this.props.token)}>Logout</Button>
                </div>
        } else {
            rightNav = 
                <div>
                    <Button color="inherit" href="/register">Register</Button>
                    <Button color="inherit" href="/login">Login</Button>
                </div>;

        }

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
                {rightNav}
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
