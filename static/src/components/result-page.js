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

import * as actionCreators from "../actions/get";

const styles = theme => ({
    body: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingTop: "2vh",
        paddingBottom: "2vh",
        backgroundColor: fade(theme.palette.common.black, 0.80),
    },
    title: {
        marginBottom: theme.spacing.unit * 3,
        color: "white",
        textAlign: "center",
    },
});

function mapStateToProps(state) {
    return {
        posts: state.get.posts,
        status: state.get.status,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class ResultPage extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.match.params.genre !== prevProps.match.params.genre ||
            this.props.match.params.user !== prevProps.match.params.user ||
            this.props.match.params.search !== prevProps.match.params.search) {

            let genre = this.props.match.params.genre || '';
            let user = this.props.match.params.user || '';
            let title = this.props.match.params.search || '';

            if (genre.toLowerCase() === 'all') {
                genre = '';
            }

            this.props.get(user, title, genre, '50');
        }
    }

    render() {
        let title = '';
        if (this.props.match.params.genre) {
            title = `Genre: ${this.props.match.params.genre}`
        } else if (this.props.match.params.user) {
            title = `User: ${this.props.match.params.user}`
        } else if (this.props.match.params.search) {
            title = `Search: ${this.props.match.params.search}`
        }

        let allPosts = null;
        if (this.props.posts) {
            allPosts = <div>
                {this.props.posts.map((post) => (
                    <AudioPost 
                        title={post.title}
                        src={`/posts/${post.music}`}
                    />
                ))}
                </div>;
        } else {
            allPosts = null;
        }

        const { classes } = this.props;
        return (
        <div>
            <Header />
            <Paper elevation={1} className={classes.body}>
                <Typography
                    variant="h2"
                    color="inherit"
                    className={classes.title}
                >
                {title}
                </Typography>
                {allPosts}
            </Paper>
            <Footer />
        </div>
        );
    }
}

export default withStyles(styles)(ResultPage);
