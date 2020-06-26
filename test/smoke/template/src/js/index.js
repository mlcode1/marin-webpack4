import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css'
import one from '../images/one.png'

class Main extends React.Component{
    constructor(){
        super();
        this.state = {
            Text:null
        }
    }
    loadComponent(){
        import('../libs/local/text.js').then(Text => {
            this.setState({
                Text:Text.default
            })
        });
    }

    render() {
        const {Text} = this.state;
        return <div className='title'>
            {
                Text?<Text/>:null
            }
            hello marin!<img onClick={this.loadComponent.bind(this)} src={ one }/>
            </div>;
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('marin')
);