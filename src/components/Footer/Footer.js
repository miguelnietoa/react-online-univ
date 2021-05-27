/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
// core components
import styles from 'assets/jss/material-dashboard-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={classes.block}>
                Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={classes.block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={classes.block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{' '}
            <a
              href="https://github.com/miguelnietoa/react-online-univ"
              target="_blank"
              className={classes.a}
            >
              Online Univ
            </a>
            , made with ❤ by{' '}
            <a
              href="https://github.com/miguelnietoa/"
              target="_blank"
              className={classes.a}
            >
              @miguelnietoa
            </a>
            ,{' '}
            <a
              href="https://github.com/JhanU1/"
              target="_blank"
              className={classes.a}
            >
              @jhanu
            </a>
            ,{' '}
            <a
              href="https://github.com/reyesjd"
              target="_blank"
              className={classes.a}
            >
              @reyesjd
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
