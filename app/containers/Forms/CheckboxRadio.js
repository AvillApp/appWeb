import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { SourceReader, PapperBlock } from 'enl-components';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import { Checkboxes, RadioButton } from './demos';

class CheckboxRadio extends React.Component {
  render() {
    const title = brand.name + ' - Form';
    const description = brand.desc;
    const docSrc = 'containers/Forms/demos/';
    const { intl } = this.props;
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
          title={intl.formatMessage(messages.checkBoxTitle)}
          icon="check_box"
          desc={intl.formatMessage(messages.checkboxDesc)}
        >
          <div>
            <Checkboxes />
            <SourceReader componentName={docSrc + 'Checkboxes.js'} />
          </div>
        </PapperBlock>
        <PapperBlock
          title={intl.formatMessage(messages.radioTitle)}
          icon="radio_button_checked"
          desc={intl.formatMessage(messages.radioDesc)}
        >
          <div>
            <RadioButton />
            <SourceReader componentName={docSrc + 'RadioButton.js'} />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

CheckboxRadio.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(CheckboxRadio);
