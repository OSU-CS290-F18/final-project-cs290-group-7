import React, { Component } from "react";
import { history } from "../../store/configureStore";
import PropTypes from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AudioPlayer from "react-h5-audio-player";

import "../../../styles.scss";

const styles = theme => ({
    post: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        backgroundColor: fade(theme.palette.common.white, 0.70),
        borderRadius: theme.shape.borderRadius,
    },
    postTop: {
        margin: theme.spacing.unit,
        display: "flex",
    },
    playBtn: {
        background: theme.palette.primary.main,
        margin: theme.spacing.unit,
        '&:hover': {
            background: theme.palette.primary.main,
        }
    },
    postTitleBox: {
        margin: theme.spacing.unit,
        color: "black",
        width: "100%",
        display: "flex",
    },
    postAuthorBox: {
        background: theme.palette.primary.main,
        margin: theme.spacing.unit,
        width: "100%",
        height: "100%",
        display: "flex",
    },
    postGenreBox: {
        background: theme.palette.primary.main,
        margin: theme.spacing.unit,
        width: "100%",
        height: "100%",
        display: "flex",
    },
    postTagBody: {
        textAlign: "center",
        margin: "auto",
        marginLeft: theme.spacing.unit*2,
    },
    player: {
        marginLeft: theme.spacing.unit*2,
        marginRight: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2,
    },
    btnGenreBase: {
        borderRadius: theme.shape.borderRadius,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        width: "10%",
    },
    btnAuthorBase: {
        borderRadius: theme.shape.borderRadius,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        width: "20%",
    },
});

class AudioPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
        };
    }

    expand(e) {
        e.preventDefault();
        this.setState({isExpanded: !this.state.isExpanded});
    }

    genre(e) {
        e.preventDefault();
        history.push(`/g/${this.props.genre}`);
    }

    author(e) {
        e.preventDefault();
        history.push(`/u/${this.props.author}`);
    }

    render() {
        const { classes } = this.props;

        let player;
        if (this.state.isExpanded) {
            player = 
                <AudioPlayer
                    className={classes.player}
                    src={this.props.src}
                />
        } else {
            player = null;
        }

        return (
        <div className={classes.post}>
            <div className={classes.postTop}>
                <Button 
                    className={classes.playBtn}
                    onClick={(e) => this.expand(e)}>
                    <PlayArrowIcon />
                </Button>
                <Paper elevation={1} className={classes.postTitleBox}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.postTagBody}
                    >
                    {this.props.title}
                    </Typography>
                </Paper>
                <ButtonBase
                    className={classes.btnAuthorBase}
                    onClick={(e) => this.author(e)}>
                    <Paper elevation={1} className={classes.postAuthorBox}>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.postTagBody}
                        >
                        {this.props.author}
                        </Typography>
                    </Paper>
                </ButtonBase>
                <ButtonBase
                    className={classes.btnGenreBase}
                    onClick={(e) => this.genre(e)}>
                    <Paper elevation={1} className={classes.postGenreBox}>
                            <Typography
                                variant="h6"
                                color="inherit"
                                className={classes.postTagBody}
                            >
                            {this.props.genre}
                            </Typography>
                    </Paper>
                </ButtonBase>
            </div>
            {player} 
        </div>
        );
    }
}

export default withStyles(styles)(AudioPost);
