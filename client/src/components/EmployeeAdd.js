import React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme=>({
    hidden:{
        display:'none'
    }
});

class EmployeeAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            empno :'',
            ename :'',
            job :'',
            mgr :'',
            hiredate :'',
            sal  :'',
            comm  :'',
            deptno  :'',
            open : false
        }
    }
    handleFormSubmit=(e)=>{
        e.preventDefault()
        this.addEmployee()
            .then((response)=>{
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            empno :'',
            ename :'',
            job :'',
            mgr :'',
            hiredate :'',
            sal  :'',
            comm  :'',
            deptno  :'',
            open:false
        })
    }
    handleValueChange=(e)=>{
        let nextState = {};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }
    addEmployee=()=>{
        const url = '/api/employees';
        const formData = new FormData();
        formData.append('empno',this.state.empno );
        formData.append('ename',this.state.ename );
        formData.append('job',this.state.job );
        formData.append('mgr',this.state.mgr );
        formData.append('hiredate',this.state.hiredate );
        formData.append('sal',this.state.sal );
        formData.append('comm',this.state.comm );
        formData.append('deptno',this.state.deptno );
        return post(url, formData);
    }

    handleClickOpen = ()=>{
        this.setState({
            open:true
        });
    }
    handleClose = ()=>{
        this.setState({
            empno :'',
            ename :'',
            job :'',
            mgr :'',
            hiredate :'',
            sal  :'',
            comm  :'',
            deptno  :'',
            open:false
        })
    }
    render(){
        const {classes}=this.props;
        return(
            <div>
                <br/>
                <Button variant = "contained" color="priomary" onClick={this.handleClickOpen}>
                    임직원 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>사원 추가</DialogTitle>
                    <DialogContent>
                    <br/>
                   <TextField label = "사번" type = "text" name = "empno" value = {this.state.empno} onChange = {this.handleValueChange}/>
                   <br/>
                   <TextField label = "이름"  type = "text" name = "ename" value={this.state.ename} onChange = {this.handleValueChange}/>
                   <br/>
                   <TextField label = "직책" type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange}/>
                   <br/>
                   <TextField label = "담당매니저 사번" type = "text" name = "mgr" value = {this.state.mgr} onChange = {this.handleValueChange}/>
                   <br/>
                   <TextField label = "고용일[YYYY-MM-DD]" type = "text" name = "hiredate" value = {this.state.hiredate} onChange = {this.handleValueChange}/>
                   <br/>
                   <TextField label = "급여" type = "text" name = "sal" value = {this.state.sal} onChange={this.handleValueChange}/>
                   <br/>
                    <TextField label = "커미션" type = "text" name = "comm" value={this.state.comm} onChange = {this.handleValueChange}/>
                    <br/>
                    <TextField label = "부서번호" type = "text" name = "deptno" value={this.state.deptno} onChange = {this.handleValueChange}/>
                    <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color = "primary" onClick = {this.handleFormSubmit}> 추가</Button>
                        <Button variant="outlined" color = "primary" onClick = {this.handleClose}> 닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(EmployeeAdd);