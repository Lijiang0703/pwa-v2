import React,{ Component } from "react"
import axios from "axios";

export default class Nav extends Component{
    constructor(props){
        super(props)
        this.state = {
            showLeftNav: false,
            showConfig: false,
            currentVersion: '1.0',
            SUBSCRIBED: false, //是否查看过订阅
            subscription: null, //订阅句柄
            subscribeText: "查看订阅状态"
        }
    }
    hideLeftNav(){
        this.setState({
            showLeftNav: false,
            showConfig: false
        })
    }
    showLeftNav(){
        this.setState({
            showLeftNav: true
        })
    }
    Search(type){
        this.props.getList(type)
        this.hideLeftNav()
    }
    setConfig(){
        const current = !this.state.showConfig
        this.setState({
            showConfig: current
        })
    }
    update(){
        //更新sw
        const latest = window.localStorage.getItem('LATEATVERSION')
        if(latest)
            this.setState({
                currentVersion: latest
            })
    }
    subscribe(type){
        //取消或订阅
        if(!window.userUnSubscribe)
            return Promise.reject()
        if(!type){
            //取消
            return window.userUnSubscribe().then(subscribe=>{
                this.setState({
                    subscription: null
                })
            }).catch(e=>{

            })
        }else{
            //订阅
            return window.userSubscribe().then(subscribe=>{
                this.setState({
                    subscription: subscribe
                })
                console.log(JSON.stringify(subscribe))
                // 发送给服务端
                axios({
                    url: "/test/subscribtion",
                    method: "post",
                    data: {
                        data: JSON.stringify(subscribe),
                        uniqueid: new Date().getTime() //生成唯一标识
                    }
                }).then((res)=>{
                    console.log(res.data.msg)
                }).catch((e)=>{
                    console.log(e)
                })
            }).catch(e=>{
                console.log(e)
            })
        }
    }
    togglePush(){
        //是否允许通知消息
        const { SUBSCRIBED } = this.state;
        getSubscription().then(sub=>{
            if(sub !== null){ //订阅状态
                //已订阅状态，返回promise对象
                if(!SUBSCRIBED){
                    this.setState({
                        subscribeText : "已订阅",
                        SUBSCRIBED: true,
                        subscription: sub
                    })
                    console.log(JSON.stringify(sub))
                } else{
                    this.subscribe(false).then(()=>{
                        this.setState({
                            SUBSCRIBED: true,
                            subscribeText : "订阅消息"
                        })
                    }).catch(e=>{
                        console.log(e)
                    })
                }
            }else {
                if(!SUBSCRIBED){
                    this.setState({
                        SUBSCRIBED: true,
                        subscribeText: "未订阅"
                    })
                } else {
                    this.subscribe(true)
                    .then(()=>{
                        this.setState({
                            SUBSCRIBED: true,
                            subscribeText: "取消订阅"
                        })
                    }).catch(e=>{
                        console.log(e)
                    })
                }
            }
        })
    }
    componentWillMount(){
        const version = window.localStorage.getItem('version') //版本没仔细管
        if(version)
            this.setState({
                currentVersion : version
            })
    }
    render(){
        const { showLeftNav, showConfig, currentVersion, SUBSCRIBED, subscription, subscribeText} = this.state;
        const { type } = this.props;
        return (
            <div className="Nav">
                {
                    showLeftNav &&
                    <div className="main" onClick={()=>{ this.hideLeftNav()}}>
                        <div className="nav-content">
                            <div className="banner">
                                <div className="person">
                                    <img className="ava" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3846895839,2711067435&fm=27&gp=0.jpg"/>
                                    <span>导航</span>
                                </div>
                            </div>
                            <div className="content-list">
                            {
                                !showConfig ?
                                <ul>
                                    <li className={`${type === 'LATEST'? ' active' : ''} list-item`} onClick={(e)=>{
                                        e.preventDefault()
                                        e.stopPropagation()
                                        this.Search('LATEST')
                                    }}><i className="fa fa-search"></i><span>最新主题</span></li>
                                    <li className={`${type === 'HOT'? ' active' : ''} list-item`} onClick={(e)=>{
                                        e.preventDefault()
                                        e.stopPropagation()
                                        this.Search('HOT')
                                    }}><i className="fa fa-search"></i><span>最热主题</span></li>
                                </ul>
                                :
                                <div className="v-config">
                                    <div className="version">当前版本: {currentVersion}</div>
                                    <ul>
                                        <li className="list-item" onClick={(e)=>{
                                            e.preventDefault()
                                            e.stopPropagation()
                                            this.update()
                                        }}><span>更新版本</span></li>
                                        <li className={`${SUBSCRIBED && subscription ? 'active' : '' } list-item`} onClick={(e)=>{
                                            e.preventDefault()
                                            e.stopPropagation()
                                            this.togglePush()
                                        }}><span>{subscribeText}</span></li>
                                    </ul>
                                </div>
                            }
                                
                            </div>
                            <div className="footer">
                                <i className="fa fa-cog" onClick={(e)=>{
                                    e.preventDefault()
                                    e.stopPropagation()
                                    this.setConfig()
                                }}></i>
                                <i className="fa fa-question-circle"></i>
                            </div>
                        </div>
                    </div>
                }
                <div className="top">
                    <i className="fa fa-bars fa-3" onClick={()=>{
                        this.showLeftNav()
                    }}>  {`${type === "HOT" ? "最热" : "最新"}`}</i>
                </div>
            </div>
        )
    }
} 