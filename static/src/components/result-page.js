import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Header from "./Header/header";
import Footer from "./Footer/footer";
import AudioPost from "./AudioPost/audio-post";

import "../../styles.scss";

const styles = theme => ({
    body: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingTop: "15vh",
        paddingBottom: "15vh",
        backgroundColor: fade(theme.palette.common.black, 0.80),
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        color: "white",
        textAlign: "center",
    },
});

class ResultPage extends Component {
    render() {
        const { classes } = this.props;
        return (
        <div>
            <Header />
            <Paper elevation={1} className={classes.body}>
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                >
                {this.props.match.params.genre}
                </Typography>
                <AudioPost 
                    title="HELLO WORLD"
                    src="/posts/788b69b116105a849c2376fd5fb6c26a916fb9b810998d8ea8db4a0963eb6283"
                />
                <AudioPost 
                    title="HELLO WORLD"
                    src="/posts/788b69b116105a849c2376fd5fb6c26a916fb9b810998d8ea8db4a0963eb6283"
                />
            
            </Paper>
            <Footer />
        </div>
        );
    }
}

export default withStyles(styles)(ResultPage);
