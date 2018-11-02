import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Header from './Header';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

/**
 * Renders the main layout and loads semantic-ui CSS file.
 */
const Layout = (props) => {
  const { children } = props;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css" />
      </Head>
      <Header />
      <Container style={{ paddingTop: '7em' }}>
        {children}
      </Container>
    </>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
