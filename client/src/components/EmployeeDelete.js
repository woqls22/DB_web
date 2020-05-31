import React from 'react'
import Button from '@material-ui/core/Button'
class EmployeeDelete extends React.Component{
    deleteEmployee(empno ){
        const url = '/api/employees/'+empno;
        fetch(url, {
            method:'DELETE'
        });
        this.props.stateRefresh();
    }
    render(){
        return(
            <Button variant = "contained" color="priomary" onClick={(e)=>this.deleteEmployee(this.props.empno )}>삭제</Button>
        )
    }
}
export default EmployeeDelete;