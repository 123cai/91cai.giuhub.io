import React, { Component } from 'react';
import ajax from '../../ajax.js';
import './app.scss';
import count from "../../img/star_home_Leaderboard_number.png";
import listli from "../../img/star_home_Leaderboard_list.png";

import bja from "../../img/star_home_top.png";
import bjb from "../../img/star_home_btn_rule.png";
import xinyun from "../../img/star_home_Leaderboard_title.png";
import dialogimg from "../../img/star_rule.png";
import dialoghide from "../../img/star_rule_close.png";

import bgtop from "../../img/star_bg_top.png";
import bgmiddle from "../../img/star_bg_middle.png";
import bgbottom from "../../img/star_bg_bottom.png";

import dialogtop from "../../img/star_home_Leaderboard_bg_top.png";
import dialogmiddle from "../../img/star_home_Leaderboard_bg_middle.png";
import dailogbottom from "../../img/star_home_Leaderboard_bg_bottom.png";

import global from "./global.js";

class App extends Component {
  constructor(props, context) {
        super(props, context);
        this.state = {
          dialogVisible: false,
          anchorRankList: [], 
          richerRankList: []
        };
    }

  render() {
    return (
      <div className="app">
        
        <div className="bg-con">
           <div className="bg-top" style={{backgroundImage: 'url('+bgtop+')'}}>
               <img src={bja} className="bg-top-one"/>
               <img src={bjb} className="bg-top-two" onClick={this.showRegular.bind(this, true)}/>
           </div>
           <div className="bg-middle" style={{backgroundImage: 'url('+bgmiddle+')'}}>
             <img src={xinyun} className="xinyun"/>
             <div className="content">
               <div className="content-top">
                  <img src={dialogtop}/>
               </div>
               <div className="content-middle" style={{backgroundImage: 'url('+dialogmiddle+')'}}>
                 <div className="list">
                   {this.renderlist()}
                 </div>
               </div>


               <div className="content-bottom">
                  <img src={dailogbottom}/>
               </div>
               
             </div>
           </div>
           <div className="bg-bottom">
            <img src={bgbottom}/>
           </div>
           
        </div>
        <div className="dialog-regular" style={{display: this.state.dialogVisible ? "block" : "none"}}>
             <img className="dialog-bg" src={dialogimg}/>
             <img className="dialog-hide" src={dialoghide} onClick={this.showRegular.bind(this, false)}/>
        </div>
      </div>
    );
  }
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}
  componentDidMount(){
    let extendKey = this.getQueryString("extendKey");
    let that = this;
    ajax({
      method: 'get',
      url: global.devBaseUrl + '/api/pwapi/active/luckstar/getRankList',
      data: {
        extendKey: extendKey,
        clientChannel: "test",
        pid: 13,
        uin: 31084465
      },
      success: function (res) {
        let list = res && res.retData || {};
        let {anchorRankList, richerRankList} = list;
        //anchor表示主播， richer表示土豪 onlynick:昵称 score:幸运值
        that.setState({
          anchorRankList: anchorRankList || [],
          richerRankList: richerRankList || []
        })
      },
       error: function (error){

       }
    });
  }  
showRegular(v){
   this.setState({
    dialogVisible: v
   })
}
renderlist(){

  let arr = [];
  let {anchorRankList, richerRankList} = this.state|| {};
  let list = ( anchorRankList.length > richerRankList.length ) ? anchorRankList : richerRankList;
          list.forEach((item,index)=>{
            arr.push(
              <div className="list-li" style={{backgroundImage: 'url('+listli+')'}}>
               <div className="list-li-left">
                 <img style={{display: anchorRankList[index] ? "block" : "none"}} src={anchorRankList && anchorRankList[index] && anchorRankList[index].imageUrl || ""} className="list-li-left-renson"/>
                 <div className="list-text">  
                   <p style={{display: anchorRankList[index] ? "block" : "none"}}>{item.onlynock}</p>
                   <p style={{display: anchorRankList[index] ? "block" : "none"}}>幸运值: {item.score}</p>
                 </div>
               </div>
               <div  className="count">
                 <img src={count}/>
                 <span>{index+1}</span>
               </div>
               <div className="list-li-right">
                 <img className="list-li-left-renson" style={{display: richerRankList[index] ? "block" : "none"}} src={item.imageUrl || ""}/>
                 <div className="list-text"> 
                   <p style={{display: richerRankList[index] ? "block" : "none"}}>{item.onlynock}</p>
                   <p style={{display: richerRankList[index] ? "block" : "none"}}>幸运值: {item.score}</p>
                 </div>
               </div>
           </div>
           )
          })

    return arr
  }
}

export default App;
