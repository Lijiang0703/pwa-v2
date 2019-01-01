import React,{ Component } from "react"
import axios from "axios";
import API from "../api/index";

class Hot extends Component{
    constructor(props){
        super(props)
        this.state= {
            hotData :[
                {
                    "node": {
                        "avatar_large": "//cdn.v2ex.com/navatar/4ea0/6fbc/770_large.png?m=1545652844",
                        "name": "career",
                        "avatar_normal": "//cdn.v2ex.com/navatar/4ea0/6fbc/770_normal.png?m=1545652844",
                        "title": "职场话题",
                        "url": "https://www.v2ex.com/go/career",
                        "topics": 5229,
                        "footer": "",
                        "header": "这里，我们聊聊那些工作中遇到的开心和不开心的事。",
                        "title_alternative": "Career",
                        "avatar_mini": "//cdn.v2ex.com/navatar/4ea0/6fbc/770_mini.png?m=1545652844",
                        "stars": 1014,
                        "root": false,
                        "id": 770,
                        "parent_node_name": "work"
                    },
                    "member": {
                        "username": "hackxing",
                        "website": "https://api.meowv.com",
                        "github": "Meowv",
                        "psn": "",
                        "avatar_normal": "//cdn.v2ex.com/avatar/f179/7c72/267098_mini.png?m=1512010834",
                        "bio": "",
                        "url": "https://www.v2ex.com/u/hackxing",
                        "tagline": "Talk is cheap. Show me the code",
                        "twitter": "",
                        "created": 1510708440,
                        "avatar_large": "//cdn.v2ex.com/avatar/f179/7c72/267098_mini.png?m=1512010834",
                        "avatar_mini": "//cdn.v2ex.com/avatar/f179/7c72/267098_mini.png?m=1512010834",
                        "location": "",
                        "btc": "",
                        "id": 267098
                    },
                    "last_reply_by": "huoluobo",
                    "last_touched": 1546072282,
                    "title": "请假被拒了。。。。。。",
                    "url": "https://www.v2ex.com/t/522131",
                    "created": 1546045338,
                    "content": "2018 年，就只请过 5 小时年假。压根没机会用掉，要这年假有何用？\r\n\r\n![hehe]( https://i.loli.net/2018/12/29/5c26c71e3d130.jpg)",
                    "content_rendered": "<p>2018 年，就只请过 5 小时年假。压根没机会用掉，要这年假有何用？</p>\n<p><img src=\"https://i.loli.net/2018/12/29/5c26c71e3d130.jpg\" alt=\"hehe\"></p>\n",
                    "last_modified": 1546046155,
                    "replies": 213,
                    "id": 522131
                }]
        }
    }
    compontWillMount(){
        //获取数据
        axios(API.HOT).then((result)=>{
            this.setState({
                hotData: result
            })
        })
    }
    render(){
        return (
            <div>
                <div className="hot">
                    <ul>
                        <li>
                            <div className="member-avatar">
                                <img src=""/>
                            </div>
                            <div className="hot-title">
                                <h4><a href="">请假被拒了</a></h4>
                                <span>2018-09-24</span>
                                <span>217</span>
                            </div>
                            <div className="hot-content">
                                2018 年，就只请过 5 小时年假。压根没机会用掉，要这年假有何用？\r\n\r\n![hehe]( https://i.loli.net/2018/12/29/5c26c71e3d130.jpg)
                            </div>
                        </li>
                    </ul>
                </div>
                <div></div>
            </div>
        )
    }
}

export default Hot;