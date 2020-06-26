// import React from 'react';
// import "../css/search.css";
const React = require('react')
require('../css/search.css')

class Search extends React.Component{
    constructor(){
        super()
    }
    render() {
        return <div className='title'>hi marin server!</div>;
    }
}

module.exports = <Search />;