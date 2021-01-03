import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm, SelectLanguage } from 'enl-components';
import logo from '../../../images/fondo.svg';
import ArrowBack from '@material-ui/icons/ArrowBack';
import styles from 'enl-components/Forms/user-jss';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


function Login(props) {
  const { classes } = props;
  const title = brand.name + ' - Login';
  const description = brand.desc;
  const [valueForm, setValueForm] = useState(null);
  const [isError, setIsError] = useState(false);

  const submitForm = (values) => {
    setValueForm(values)
  }

  // Buscamos si existe un usuario autenticado
  const busqUser = async () => {
    const user = await AsyncStorage.getItem('user')
    if (user!=undefined)
     window.location.href = '/app';
  }
  
  busqUser();

  useEffect(() => {
    if (valueForm) {
      
      const autentication = async () => {

          setIsError(false)
          const dt =  await axios.get(`http://localhost:8000/api/personas/login/${valueForm.get('phone')}/${valueForm.get('password')}`);
          
          console.log(dt.data)
          console.log(dt.data.length)
          if (dt.data.length>0){
            window.location.href = '/app';
            await AsyncStorage.setItem('user', dt.data[0].name)
          }
          else
            setIsError(true)
      } 
      autentication();
    }
  }, [valueForm]);

  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.containerSide}>
        <Hidden smDown>
          <div className={classes.opening}>
            <div className={classes.openingWrap}>
              <div className={classes.openingHead}>
                {/* <NavLink to="/" className={classes.brand}>
                  <img src={logo} alt={brand.name} />
                  {brand.name}
                </NavLink> */}
              </div>
              <Typography variant="h3" component="h1" gutterBottom>
                <FormattedMessage {...messages.welcomeTitle} />
                &nbsp;
                {brand.name}
              </Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>
                <FormattedMessage {...messages.welcomeSubtitle} />
              </Typography>
            </div>
            <div className={classes.openingFooter}>
              {/* <NavLink to="/" className={classes.back}>
                <ArrowBack />
                &nbsp;back to site
              </NavLink> */}
              <div className={classes.lang}>
                <SelectLanguage />
              </div>
            </div>
          </div>
        </Hidden>
       
        <div className={classes.sideFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} isError={isError} />
          
        </div>
      
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
