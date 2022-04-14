import React from 'react';

export default class ContactDetails extends React.Component{
    render(){

        const details = (
            <div>
                <h2>Details</h2>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
            );
        const blank = (<div></div>);

        return(
            <div>
                {this.props.isSelect ? details : blank }
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    }
}