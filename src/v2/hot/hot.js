import React,{ Component } from "react"
import _ from "lodash"
import moment from "moment"

class Hot extends Component{
    constructor(props){
        super(props)
    }
    compontWillMount(){
        //获取数据   
    }
    
    componentDidMount(){
        
    }
    render(){
        const { hotData, type } = this.props;
        const ava = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3846895839,2711067435&fm=27&gp=0.jpg" //固定，不管他
        return (
            <div className="hot-theme">
                <ul>
                    {
                        hotData.length !==0 && _.map(hotData,(data,index)=>{
                            moment.locale('zh-cn')
                            return (
                                <li className="hot-items" key={index}>
                                    <div className="member-avatar">
                                        <img className="ava" src={ava}/>
                                        <span className="node"><a href={data.node.url}>{data.node.title}</a></span>
                                        <span style={{color: '#999'}}>  •  </span>
                                        <strong className="name"><span>{data.member.username}</span></strong>
                                    </div>
                                    <div className="hot-content">
                                        <h3><a href={data.url}>{data.title}</a></h3>
                                    </div>
                                    {
                                            data.last_reply_by && 
                                            <div className="hot-tags">
                                                <span>{moment.unix(data.last_touched).endOf('hour').fromNow()}</span>
                                                <span className="last-reply">最后回复: {data.last_reply_by}</span>
                                            </div>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Hot;