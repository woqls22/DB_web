import React, {Component} from 'react';
import Employee from './components/Employee'
import './App.css';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import EmployeeAdd from './components/EmployeeAdd'
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme =>({
  root:{
    width : '100%',
    marginTop:theme.spacing(3),
    overflowX:"auto"
  },
  paper:{
    marginLeft:18,
    marginRight:18
  },
  menu:{
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent:'center'
  },
  table:{
    minWidth : 1080
  },
  progress:{
    margin:theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})
class App extends Component{
  constructor (props){
    super (props);
    this.state = {
      employees:'',
      completed:0,
      searchKeyword:''
    }
  }
  stateRefresh=()=>{
    this.setState({
      employees:'',
      completed:0,
      searchKeyword:''
    });
    this.callApi()
    .then(res=>this
    .setState({employees:res}))
    .catch(err=>console.log(err));
  }
  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res=>this
      .setState({employees:res}))
      .catch(err=>console.log(err));
  }
  callApi = async()=>{
    const response = await fetch('/api/employees');
    const body = await response.json();
    return body;
  }
  progress=()=>{
    const {completed} = this.state;
    this.setState({completed : completed>=100 ? 0 : completed+1})
  }
  handleValueChange=(e)=>{
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render(){
    const filteredComponents=(data)=>{
      data = data.filter((c)=>{
        return c.ename.indexOf(this.state.searchKeyword)>-1;
      });
      return data.map((c)=>{
        return <Employee stateRefresh={this.stateRefresh} key = {c.empno } empno  = {c.empno } ename = {c.ename} job = {c.job} mgr = {c.mgr} hiredate  = {c.hiredate } sal = {c.sal} comm = {c.comm} deptno= {c.deptno}/>
      });
    }
    const {classes} = this.props;
    return(
      <div className = {classes.root}>
          <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            임직원관리시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="이름 검색[대,소문자구별]"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name = "searchKeyword"
              value = {this.state.searchKeyword}
              onChange = {this.handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className = {classes.menu}>
      <EmployeeAdd stateRefresh={this.stateRefresh}/>
      </div>
      <Paper className = {classes.paper}>
        <Table className = {classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>사번</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>직책</TableCell>
              <TableCell>직책수정</TableCell>
              <TableCell>매니저</TableCell>
              <TableCell>고용일</TableCell>
              <TableCell>급여</TableCell>
              <TableCell>커미션</TableCell>
              <TableCell>부서명</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.employees ? 
            filteredComponents(this.state.employees) :
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className = {classes.progress} variant = "determinate" value = {this.state.completed}/>
            </TableCell>
          </TableRow>
        }
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}
export default withStyles (styles)(App);
