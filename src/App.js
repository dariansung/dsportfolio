import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import TabList from './components/TabList';
import Body from './components/Body';
import ScrollTop from './components/ScrollTop';

export class App extends Component{
  constructor(props){
    super();
    this.state = {
      activeTab: 1
    }
  }

  changeTab = (id) => {
    this.setState({
      activeTab: id
    })
  }
  
  render(){
    const tabs = [
      {
        id: 1,
        title: "Home"
      },
      {
        id: 2,
        title: "Projects"
      },
      {
        id: 3,
        title: "Images"
      },
      {
        id: 4,
        title: "Videos"
      }
    ]
    return (
      <div className="body">
        <Header activeTab={this.state.activeTab}/>
        <div className="navbar">
          <TabList tabs={tabs} 
          activeTab={this.state.activeTab}
          changeTab={this.changeTab}/>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>
        <ScrollTop/>
      </div>
    );
  }
}

export default App;
