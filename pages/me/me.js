Page({
  data:{
    userinfo:{},
    openid:"",
    item:[]
  },
  onGotUserInfo:function(e){
    const that = this
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        console.log("调用成功")
        that.setData({
          openid:res.result.openid,
          userinfo:e.detail.userInfo
        })
        that.data.userinfo.openid = that.data.openid
        console.log("userinfo",that.data.userinfo)
        wx.setStorageSync('userinfo', that.data.userinfo)
      }
    })
  },
  onLoad:function(event){
    const ui = wx.getStorageSync('userinfo')
    this.setData({
      userinfo:ui,
      openid:ui.openid,
    })
  },
 getInfo:function(){
   const that = this
   const ui = wx.getStorageSync('userinfo')
    wx.cloud.callFunction({
      name:"getInfo",
      data:{
        openid:ui.openid
      },
      success:res=>{
        that.setData({
          item:res.result.data
        })
        console.log("res",res)
        console.log("openid",ui.openid)
      }, 
      fail:res=>{
        console.log("res",res)
        console.log("openid",ui.openid)
      }, 
    })
 },
 onShow:function(){
  this.getInfo()
 }
})