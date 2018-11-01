import React from 'react';
import { Menu, Container, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

/**
 * Renders the navigation bar
 */
const Header = () => (
  <Menu size="huge" fixed="top">
    <Container>
      <Menu.Item
        header
        content={(
          <Link route="/">
            <a>
              <Icon name="trophy" />
              Goalie
            </a>
          </Link>)
        }
      />
    </Container>
  </Menu>
);

export default Header;
