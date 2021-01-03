import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { SourceReader, PapperBlock } from 'enl-components';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import { SwitchesInput } from './demos';

class Switches extends React.Component {
  render() {
    const title = brand.name + ' - Form';
    const description = brand.desc;
    const { intl } = this.props;
    const docSrc = 'containers/Forms/demos/';
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock
          title={intl.formatMessage(messages.switchesTitle)}
          icon="edit_attributes"
          desc={intl.formatMessage(messages.switchesDesc)}
        >
          <div>
            <SwitchesInput />
            <SourceReader componentName={docSrc + 'SwitchesInput.js'} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

Switches.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Switches);
