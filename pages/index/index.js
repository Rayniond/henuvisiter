// pages/index/index.js
Page({
  data: {
    department:'',                 //来访单位

    date: '0000-00-00',            //来访日期

    daysList:['1', '2', '3', '4', '5'],
    dayIndex:[0],
    day:'1',                        //来访天数

    placeList:['大礼堂','图书馆','综合楼'],
    placeIndex:[0],
    place:'大礼堂',                      //来访地点

    visiterList:[],
    visiterNameList:[],            //访客姓名数组
    visiterLevelList:[],           //访客职务数组

    visiterType:'',                //访问形式

    contacterName:'',              //联系人名称

    contacterTel:'',               //联系人电话

    visitcontent:'',               //来访内容

    other:'',                      //备注
  },

  department:function(event){                             //来访单位
    this.setData({
      department: event.detail.value
    })
    console.log("department",this.data.department)
  },

  changeDate(e){            //访问日期
    this.setData({ date:e.detail.value}),
    console.log("data",this.data.date)
    },

  changeDays(e){           //访问天数
    const that = this
    this.setData({
      dayIndex:e.detail.value,
      day:that.data.daysList[e.detail.value]
    })
    console.log("day",that.data.day)
  },
  changePlaces(e){            //访问地点
    const that = this
    this.setData({
      placeIndex:e.detail.value,
      place:that.data.placeList[e.detail.value]
    });
    console.log("place",this.data.place)
    },

    visiterNameInput:function(event){                   //将每位添加的访客名字插入数组对应位置
      var id = event.currentTarget.dataset.id;//使用event.currentTarget.dataset.XX获取内容
      var visiterNameList = "visiterNameList["+id+"]";
      this.setData({
        [visiterNameList]:event.detail.value
      });
      console.log("visiterNameList",this.data.visiterNameList[id])
    },

    visiterLevelInput:function(event){                  //将每位添加的访客职位插入数组对应位置
      var id = event.currentTarget.dataset.id;//使用event.currentTarget.dataset.XX获取内容
      var visiterLevelList = "visiterLevelList["+id+"]";
      this.setData({
        [visiterLevelList]:event.detail.value
      });
      console.log("visiterLevelList",this.data.visiterLevelList[id])
    },

    addList: function(){            //增加访问人员
      var  visiterList = this.data.visiterList;
      var  visiterNameList = this.data.visiterNameList;
      var  visiterLevelList = this.data.visiterLevelList;
      var newData = {};
      visiterList.push(newData);//实质是添加visiterList数组内容，使for循环多一次
      visiterNameList.push(newData);
      visiterLevelList.push(newData);
      this.setData({
        visiterList: visiterList,
      })  
    },

    delList: function () {            //删除访问人员
      var visiterList = this.data.visiterList;
      var  visiterNameList = this.data.visiterNameList;
      var  visiterLevelList = this.data.visiterLevelList;
      visiterList.pop();      //实质是删除visiterList数组内容，使for循环少一次
      visiterNameList.pop();
      visiterLevelList.pop();
      this.setData({
        visiterList: visiterList,
      })
    },  

    visiterType:function(event){                             //来访形式
      this.setData({
	      visiterType: event.detail.value
      })
      console.log("visiterType",this.data.visiterType)
    },

    contacterName:function(event){                             //联系人姓名
      this.setData({
	      contacterName: event.detail.value
      })
      console.log("contacterName",this.data.contacterName)
    },

    contacterTel:function(event){                             //联系人电话
      this.setData({
	      contacterTel: event.detail.value
      })
      console.log("contacterTel",this.data.contacterTel)
    },

    visitcontent:function(event){                             //来访内容
      this.setData({
	      visitcontent: event.detail.value
      })
      console.log("visitcontent",this.data.visitcontent)
    },


    other:function(event){                             //备注
      this.setData({
	      other: event.detail.value
      })
      console.log("other",this.data.other)
    },
    submit:function(event){                             //提交
      wx.showToast({title: '提交中', icon: 'loading', duration: 10000});
      const that = this
      const ui = wx.getStorageSync('userinfo')
      if(!ui.openid){
        wx.switchTab({
          url: '/pages/me/me',
        })
      }else{
        wx.cloud.callFunction({
          name:"submit",
          data:{
            openid:ui.openid,
            department:that.data.department,
            date:that.data.date,
            day:that.data.day,
            place:that.data.place,
            visiterNameList:that.data.visiterNameList,
            visiterLevelList:that.data.visiterLevelList,
            visiterType:that.data.visiterType,
            contacterName:that.data.contacterName,
            visitcontent:that.data.visitcontent,
            contacterTel:that.data.contacterTel,
            other:that.data.other
          }
        })
        wx.hideToast();
        wx.showToast({title: '提交成功', icon: 'success', duration: 1000});
      }
    },
})