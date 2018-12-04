import React, { Component } from "react";
import { history } from "../store/configureStore";

import { withStyles } from '@material-ui/core/styles';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Header from "./Header/header";
import Footer from "./Footer/footer";

const styles = theme => ({
    body: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingTop: "12vh",
        paddingBottom: "12vh",
        backgroundColor: fade(theme.palette.common.black, 0.80),
    },
    search: {
        display: "flex",
        margin: "auto",
        width: "90%",
        backgroundColor: fade(theme.palette.common.white, 0.80),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.90),
        },
        borderRadius: theme.shape.borderRadius,
    },
    iconDiv: {
        width: theme.spacing.unit * 9,
        display: "flex",
    },
    icon: {
        margin: "auto",
    },
    input: {
        width: "100%",
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    buttonDiv: {
        display: "block",
        textAlign: "center",
    },
    button: {
        display: "inline-block",
        margin: theme.spacing.unit,
        width: "20%",
    },
    img: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*4,
        borderRadius: theme.shape.borderRadius,
    }
}); 

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
        };
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            history.push(`/s/${this.state.search}`);
        }
    }

    search(e) {
        history.push(`/s/${this.state.search}`);
    }

    home(e) {
        history.push("/g/all");
    }

    update(e, field) {
        const nextState = {};
        nextState[field] = e.target.value;
        this.setState(nextState);
    }

    render() {
        const { classes } = this.props;

        return (
        <div>
            <Header /> 
            <Paper elevation={1} className={classes.body}>
                <img className={classes.img} src="/logo.png" />
                <div className={classes.search} onKeyPress={(e) => this._handleKeyPress(e)}>
                    <div className={classes.iconDiv}>
                        <SearchIcon className={classes.icon}/>
                    </div>
                    <InputBase
                        color="inherit"
                        placeholder="Search for music (or enter nothing to see all posts)..."
                        onChange={(e) => this.update(e, "search")}
                        className={classes.input}
                    />
                </div>
                <div className={classes.buttonDiv}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={(e) => this.search(e)}
                        className={classes.button}>
                        Search
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={(e) => this.home(e)}
                        className={classes.button}>
                        Show Home Page
                    </Button>
                </div>
            </Paper>
            <Footer />
        </div>
        );
    }
}

export default withStyles(styles)(FrontPage);
