import React from 'react';
import PropTypes from 'prop-types';

export default class ContactCreate extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            name: '',
            phone: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event){
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    handleSubmit(){
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        }

        if(this.state.name === '' || this.state.phone === ''){
            alert("id 또는 password가 공란입니다.");
            return;
        }

        this.props.onCreate(contact);
        this.setState({
            name: '',
            phone: ''
        })

        this.nameInput.focus();
    }

    handleKeyPress(event){
        if(event.charCode === 13){
            this.handleSubmit();
        }
    }

    render(){
        return(
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input 
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        ref={(ref) => {this.nameInput = ref}}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <button onClick={this.handleSubmit}>Create</button>
                </p>
            </div>
        );
    }
}

ContactCreate.propTypes = {
    onCreate: PropTypes.func
}

ContactCreate.defaultPoprs = {
    onCreate: () => console.error('on create not defined.')
}