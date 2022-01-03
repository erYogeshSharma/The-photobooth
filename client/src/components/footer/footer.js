import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@material-ui/core";
import useStyles from './styles.js'

export default function Footer() {
  const classes = useStyles();
  return (
    <AppBar position="relative" color="primary" className={classes.footer}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © 2019 Gistia
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
