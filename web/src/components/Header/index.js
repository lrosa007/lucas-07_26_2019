import React from 'react';

// Styles
import styles from './styles.module.css';

const Header = ({ children }) => (
  <header className={styles.header}>{children}</header>
);

export default Header;
