import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => (
  <Menu size="huge" style={{ marginTop: '5px' }}>
    <Link route="/">
      <a className="item">Goalie</a>
    </Link>
  </Menu>
);
