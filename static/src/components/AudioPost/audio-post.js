import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
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
    postTitle: {
        textAlign: "center",
        margin: "auto",
        marginLeft: theme.spacing.unit*2,
    },
    player: {
        marginLeft: theme.spacing.unit*2,
        marginRight: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2,
    }
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
                        className={classes.postTitle}
                    >
                    {this.props.title}
                    </Typography>
                </Paper>
            </div>
            {player} 
        </div>
        );
    }
}

export default withStyles(styles)(AudioPost);
