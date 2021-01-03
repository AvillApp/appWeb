import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OndemandVideo from '@material-ui/icons/OndemandVideo';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import Edit from '@material-ui/icons/Edit';
import { CounterWidget } from 'enl-components';
import styles from 'enl-components/Widget/widget-jss';


class IconInfographic extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootCounterFull}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color="primary-main"
              start={0}
              end={207}
              duration={3}
              title="Subscribers"
            >
              <OndemandVideo className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color="secondary-main"
              start={0}
              end={300}
              duration={3}
              title="Followers"
            >
              <SupervisorAccount className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color="primary-dark"
              start={0}
              end={67}
              duration={3}
              title="Total Posts"
            >
              <Edit className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color="secondary-dark"
              start={0}
              end={70}
              duration={3}
              title="Total Articles"
            >
              <CollectionsBookmark className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
        </Grid>
      </div>
    );
  }
}

IconInfographic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconInfographic);
