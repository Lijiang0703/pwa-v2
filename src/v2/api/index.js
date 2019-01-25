var publicPath = "/api";

var API = {
    HOT: publicPath + "/topics/hot.json",
    LATEST:  publicPath + "/topics/latest.json",
    NODES: publicPath + "/nodes/show.json", // ?name= python
    MEMBERS: publicPath + "/members/show.json" // ?username = livid / ?id = 1
}

export default API