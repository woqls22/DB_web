import React from 'react'
import Button from '@material-ui/core/Button'
class CustomerDelete extends React.Component{
    delteCustomer(id){
        const url = '/api/customers/'+id;
        fetch(url, {
            method:'DELETE'
        });
        this.props.stateRefresh();
    }
    render(){
        return(
            <Button variant = "contained" color="priomary" onClick={(e)=>this.delteCustomer(this.props.id)}>삭제</Button>
        )
    }
}
export default CustomerDelete;