import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EmployeeDelete from './EmployeeDelete';
import EmployeeJobModify from './EmployeeJobModify';
import EmployeeDeptModify from './EmployeeDeptModify';

class Employee extends React.Component{
    render(){
        return(  
            <TableRow>
                <TableCell>{this.props.empno}</TableCell>
                <TableCell>{this.props.ename}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><EmployeeJobModify stateRefresh = {this.props.stateRefresh} empno = {this.props.empno}/></TableCell>
                <TableCell>{this.props.mgr}</TableCell>
                <TableCell>{this.props.hiredate}</TableCell>
                <TableCell>{this.props.sal}</TableCell>
                <TableCell>{this.props.comm}</TableCell>
                <TableCell>{this.props.deptno}</TableCell>
                <TableCell><EmployeeDeptModify stateRefresh = {this.props.stateRefresh} empno = {this.props.empno}/></TableCell>
                <TableCell><EmployeeDelete stateRefresh = {this.props.stateRefresh} empno = {this.props.empno}/></TableCell>
            </TableRow>
        );
    }
}
export default Employee;