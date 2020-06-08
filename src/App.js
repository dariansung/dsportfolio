import React, { Component } from 'react';
import SimpleReactLightbox from 'simple-react-lightbox';
import './App.css';
import Header from './components/Header'
import TabList from './components/TabList';
import Body from './components/Body';
import ScrollTop from './components/ScrollTop';

export class App extends Component{
  constructor(props){
    super(props);
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
      },
      {
        id: 5,
        title: "Guest Book"
      },
      {
        id: 6,
        title: "Movies"
      },
      {
        id: 7,
        title: "Add Movie"
      },
      {
        id: 8,
        title: "Create List"
      },
      {
        id: 9,
        title: "Graph"
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
        <SimpleReactLightbox>
          <div className="main-body">
            <Body activeTab={this.state.activeTab}/>
          </div>
        </SimpleReactLightbox>
        <ScrollTop/>
      </div>
    );
  }
}

export default App;
