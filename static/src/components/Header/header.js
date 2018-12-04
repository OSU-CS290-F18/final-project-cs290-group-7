import React, { Component } from "react";
import { history } from "../../store/configureStore";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Toolbar from '@material-ui/core/Toolbar';

import * as actionCreators from "../../actions/authentication";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    btnBase: {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing.unit,
    },
});

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
    
    post(e) {
        e.preventDefault();
        history.push('/post');
    }

    userPage(e) {
        e.preventDefault();
        history.push(`/u/${this.props.username}`);
    }

    main(e) {
        e.preventDefault();
        history.push('/');
    }

    render() {
        const { classes } = this.props;

        let rightNav;
        if (this.props.isAuthenticated && this.props.username) {
            rightNav =
                <div>
                    <Button 
                        color="inherit"
                        onClick={(e) => this.userPage(e)} 
                    >
                        {this.props.username} User Page
                    </Button>
                    <Button color="inherit" onClick={(e) => this.post(e)}>Post</Button>
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
                <div className={classes.grow}>
                    <ButtonBase 
                        className={classes.btnBase}
                        onClick={(e) => this.main(e)}>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.grow}
                        >
                        Mixolydian
                        </Typography>
                    </ButtonBase>
                </div>
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
