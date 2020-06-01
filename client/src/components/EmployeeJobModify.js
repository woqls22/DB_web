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

class EmployeeJobModify extends React.Component{
    constructor(props){
        super(props);
        this.state={
            empno :'',
            job :'',
            open : false
        }
    }
    handleFormSubmit=(e)=>{
        e.preventDefault()
        this.modifyJob(this.props.empno)
            .then((response)=>{
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            empno :'',
            job :'',
            open:false
        })
    }
    handleValueChange=(e)=>{
        let nextState = {};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }
    modifyJob=(empno)=>{
        const url = '/api/employees/jobmodify/'+empno;
        const formData = new FormData();
        formData.append('job',this.state.job );
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
            job :'',
            open:false
        })
    }
    render(){
        const {classes}=this.props;
        return(
            <div>                
                <Button variant = "contained" color="priomary" onClick={this.handleClickOpen}>
                    수정
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>직책수정</DialogTitle>
                    <DialogContent>
                    <br/>
                   <TextField label = "변경 직책입력" type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange}/>
                   <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color = "primary" onClick = {this.handleFormSubmit}> 확인</Button>
                        <Button variant="outlined" color = "primary" onClick = {this.handleClose}> 닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(EmployeeJobModify);