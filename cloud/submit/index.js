// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('visiterInfo').add({
      data:{
        openid:event.openid,
        department:event.department,
        date:event.date,
        day:event.day,
        place:event.place,
        visiterNameList:event.visiterNameList,
        visiterLevelList:event.visiterLevelList,
        visiterType:event.visiterType,
        contacterName:event.contacterName,
        contacterTel:event.contacterTel,
        visitcontent:event.visitcontent,
        other:event.other
      }
    })
  }catch(e){
    console.log(e);
  }
}