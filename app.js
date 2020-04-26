//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'henuvisiter-ktnzg',
      traceUser:true
    })
  }
})