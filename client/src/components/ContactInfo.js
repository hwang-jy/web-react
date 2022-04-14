import * as React from 'react';
import PropTypes from 'prop-types';

class ContactInfo extends React.Component{
    render(){
        return(
            <div onClick={this.props.onClick}>
                {this.props.contact.name}
            </div>
        );
    }
}

ContactInfo.defaultProps = {
    name: PropTypes.string
}

export default ContactInfo;

