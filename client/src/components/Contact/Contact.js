import * as React from 'react';
import update from 'immutability-helper';
import ContactInfo from './ContactInfo'
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectKey: -1,
            keyword: '',
            contactData: [
                {name:"A", phone:'000-0000-0000'},
                {name:"B", phone:'000-0000-0001'},
                {name:"C", phone:'000-0000-0002'},
                {name:"D", phone:'000-0000-0003'}
            ]
        }

        this.handleChnage = this.handleChnage.bind(this);
        this.handleClick = this.handleClick.bind(this);

        //crud
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleChnage(e){
        this.setState({
            keyword: e.target.value
        })
    }

    handleClick(key){
        this.setState({
            selectKey: key
        });
    }

    handleCreate(contact){
        this.setState({
            contactData: update(this.state.contactData, {
                $push: [contact]
            })
        })
    }

    handleRemove(){
        if(this.state.selectKey === -1){
            return;
        }

        this.setState({
            contactData: update(this.state.contactData, {
                $splice: [[this.state.selectKey, 1]]
            }),

            selectKey: -1
        })
    }

    handleEdit(name, phone){
        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.selectKey]: {
                    name: { $set: name },
                    phone: { $set: phone }
                }
            })
        })
    }

    render(){
        // 순수 함수형으로 제작
        const mapToComponent = (data) => {
            data.sort();
            data = data.filter((contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
                }
            )
            return data.map((contact, i) => {
                return (
                    <ContactInfo 
                        key={i}
                        contact={contact} 
                        onClick={() => this.handleClick(i)} 
                        />
                );
            })
        }

        return(
            <div>
                <h1>Contacts</h1>

                <input 
                    name="keyword" 
                    placeholder="search.."
                    onChange={this.handleChnage}
                />

                {mapToComponent(this.state.contactData)}

                <ContactDetails 
                    isSelect={this.state.selectKey !== -1}
                    contact={this.state.contactData[this.state.selectKey]}
                    onRemove={this.handleRemove}
                    onEdit={(name, phone) => this.handleEdit(name, phone)}
                />

                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}