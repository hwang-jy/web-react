import * as React from 'react';
import PropTypes from 'prop-types';

class ContactInfo extends React.Component{
    render(){
        return(
            <div>{this.props.contact.name} {this.props.contact.phone}</div>
        );
    }
}

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contactData: [
                {name:"AAA", phone:'000-0000-0000'},
                {name:"B", phone:'000-0000-0001'},
                {name:"C", phone:'000-0000-0002'},
                {name:"D", phone:'000-0000-0003'}
            ]
        }
    }

    render(){

        // 순수 함수형으로 제작
        const mapToComponent = (data) => {
            return data.map((contact, i) => {
                return (<ContactInfo contact={contact} key={i}/>);
            })
        }

        return(
            <div>
                {mapToComponent(this.state.contactData)}
            </div>
        );
    }
}

class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:0
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            value: this.state.value + 1
        });
    }

    render(){
        return(
            <div>
                <h2>{this.state.value}</h2>
                <button onClick={this.handleClick}>Press me</button>
            </div>
        )
    }
}


class Welcome extends React.Component{
	render(){
		return(
			<div>
				<h2>Hello, {this.props.name}!</h2>
				<p>{this.props.value}</p>

				{/* <Welcome>[태그 사이에 작성된 값은 this.props.children 이다.]</Welcome> */}
				<p>{this.props.children}</p>
			</div>
		);
	}
};

// 작성 클래스 하단에 props의 자료형과 추가적인 설정을 할 수 있다.
// ex) value는 number 타입이며, 반드시 필요한 값이다.
// 조건과 일치하지 않는 값을 받았을 때 console에 경고를 출력한다.
// 자세한 내용은 아래 링크에서 확인한다.
// https://ko.reactjs.org/docs/typechecking-with-proptypes.html
Welcome.propTypes = {
	name: PropTypes.string,
	value: PropTypes.number.isRequired
};

// 작성 클래스 하단에 props의 defaultValue를 설정할 수 있다.
Welcome.defaultProps = {
	name: "Visitor"
};

class App extends React.Component{
    // JavaScript 문법을 사용하므로 정상적인 주석이다.
	render(){
		return(
			<div>
				{/* 
                본 주석은 정상적으로 동작한다. 
                JSX 문법에서 주석은 부모 태그 내부에 작성 해야한다. 
                본 예제를 기준으로 부모 태그는 div이며 div 외부에 작성 시 오류가 발생한다. 
                */}
				<Welcome value={0}>this is children prop message</Welcome>
                <Counter/>

                <Contact/>
			</div>
		);
	}
};

export default App;