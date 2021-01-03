import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { SourceReader, PapperBlock } from 'enl-components';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import { ReduxFormDemo } from './demos';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

class ReduxForm extends React.Component {
  state = {
    valueForm: []
  }

  showResult(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      window.alert(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
      console.log(values); // eslint-disable-line
    }, 500); // simulate server latency
  }

  render() {
    const title = brand.name + ' - Form';
    const description = brand.desc;
    const docSrc = 'containers/Forms/demos/';
    const { intl, classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock
          title={intl.formatMessage(messages.formTitle)}
          icon="library_books"
          desc={intl.formatMessage(messages.formDesc)}
        >
          <div>
            <ReduxFormDemo onSubmit={(values) => this.showResult(values)} />
            <SourceReader componentName={docSrc + 'ReduxFormDemo.js'} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

ReduxForm.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(injectIntl(ReduxForm));
