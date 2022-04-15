import React from 'react';
import PropTypes from 'prop-types';
// isSelect bool
// contact object
// onRemove func
// onEdit func(string, string)  
export default class ContactDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    
    handleToggle(){
        if(this.state.isEdit){
            this.handleEdit();
        }else{
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })            
        }

        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    handleChange(event){
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    handleEdit(){
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        }

        this.props.onEdit(contact.name, contact.phone);
        this.setState({
            name: '',
            phone: ''
        })
    }

    handleCancel(){
        this.setState({
            isEdit: false,
            name: '',
            phone: ''
        })
    }


    render(){

        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                    />
                </p>
            </div>
        )
        const view = (
            <div>
                {this.state.isEdit ? edit : details}
                <p>
                    <button onClick={this.handleToggle}>{this.state.isEdit ? 'OK' : 'Edit'}</button>

                    {
                        this.state.isEdit ? 
                            (<button onClick={this.handleCancel}>Cancel</button>) : 
                            (<button onClick={this.props.onRemove}>Remove</button>)
                    }
                </p>
            </div>
        );
        const blank = (<div></div>);

        return(
            <div>
                <h2>Details</h2>
                {this.props.isSelect ? view : blank }
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },

    onRemove: () => { console.error('onRemove not defined.'); },
    onEdit: () => { console.error('onEdit not defined.'); }
}

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
}