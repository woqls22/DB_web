import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component{
    render(){
        return(  
            <TableRow>
                <TableCell>{this.props.empno}</TableCell>
                <TableCell>{this.props.ename}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell>{this.props.mgr}</TableCell>
                <TableCell>{this.props.hiredate}</TableCell>
                <TableCell>{this.props.sal}</TableCell>
                <TableCell>{this.props.comm}</TableCell>
                <TableCell>{this.props.deptno}</TableCell>
                <TableCell><CustomerDelete stateRefresh = {this.props.stateRefresh} empno = {this.props.empno}/></TableCell>
            </TableRow>
        );
    }
}
export default Customer;