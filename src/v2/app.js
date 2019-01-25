import React ,{ Component } from 'react'
import Hot from './hot/hot'
import Nav from './component/nav'
import axios from "axios";
import API from "./api/index";

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            type: '',
            hotData: []
        }
        this.getList = this.getList.bind(this)
    }
    componentWillMount(){
        const type = localStorage.getItem('NAV')
        this.getList(type || 'LATEST')
    }
    componentDidMount(){
    }
    render(){
        const { type, hotData} = this.state;
        return (
            <div>
                <Nav getList={this.getList} type={type}/>
                <Hot hotData={hotData} type={type}/>
            </div>
        )
    }
    getList(type){
        if(API[type])
            axios({
                url: API[type]
            }).then((result)=>{
                this.setState({
                    hotData: result.data,
                    type: type
                })
                //设在本地
                const nav = localStorage.getItem('NAV')
                if(nav !== type)
                    localStorage.setItem('NAV',type)
            }).catch(e=>{
                console.log('axios error')
            })
    }
} 
export default App