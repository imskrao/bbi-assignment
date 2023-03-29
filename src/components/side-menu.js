import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import menuItems from './menu-items.json';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '350px',
    height: '100vh',
    backgroundColor: '#4CA3DF'
  },
  list: {
    width: '100%',
    backgroundColor: '#4CA3DF',
    color: '#FFF',
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: '#0E1332'
  },
  textWhite: {
    color: '#fff'
  },
  textDecorationNone: {
    textDecoration: 'none'
  },
  linkFinal: {
    width: '100%',
    textDecoration: 'none'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default function SideMenu() {

  const [collapseStatus, setCollapseStatus] = useState({});
  const classes = useStyles();

  // --------------------------------**************************--------------------------
  // Intially I tried to fetch JSON data using axios but unable to fetch the data due to CORS error. That's why using menu-items.json file
  // --------------------------------**************************--------------------------------

  // const [menuItems, setMenuItems] = useState([]);
  // const URL = 'https://nifty-kare-32d12b.netlify.app/treemenu.json';
  useEffect(() => {
    // axios.get(URL).then(data => setMenuItems(data)).catch(err => console.error(err))
  }, [])

  const handleClick = (key) => {
    // debugger;
    const value = !collapseStatus[key];
    const tempObj = { ...collapseStatus };
    tempObj[key] = value
    setCollapseStatus(tempObj);
  }

  const submenuHandler = (item) => {
    if ((item.nodes && item.nodes.length === 0) || !item.nodes) {
      return (<div className='ml-40'>
        <ListItem button className={classes.nested}>
          <Link to={item.url} className={classes.linkFinal} target="_blank">
            <ListItemText inset primary={item.label} className={classes.textWhite}></ListItemText>
          </Link>
        </ListItem>
      </div>)
    } else {
      // debugger;
      return (<div><ListItem button onClick={() => handleClick(item.key)} className={classes.spaceBetween}>
        <Link to={item.url} className={classes.textDecorationNone} target="_blank">
          <ListItemText inset primary={item.label} className={classes.textWhite}>
          </ListItemText>
        </Link>
        {collapseStatus[item.key] ?
          <ExpandLess /> :
          <ExpandMore />
        }
      </ListItem>
        <Collapse
          in={collapseStatus[item.key]}
          timeout="auto"
          unmountOnExit
        >
          {item && item.nodes && item.nodes.map(innerItem => {
            return (<List component="div" disablePadding>
              {submenuHandler(innerItem)}
            </List>)
          })}
        </Collapse></div>)
    }
  }

  return (
    <div className={classes.menu}>
      {menuItems && menuItems.map(item => {
        return (<List key={item.key} className={classes.list}>
          {submenuHandler(item)}
        </List>)
      })}
    </div>
  )
}
