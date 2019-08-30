/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率

  怎么封装呢？
    通常我们喜欢把方法封装到对象身上
*/
var kits = {};

kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

kits.randomInt = function(n,m){
  return Math.floor(Math.random() * (m-n+1) + n);
}
//随机颜色
kits.randomColor = function(){
  var r = kits.randomInt(0, 255);
  var g = kits.randomInt(0, 255);
  var b = kits.randomInt(0, 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
//获得随机十六进制颜色
kits.randomHexColor = function() { 
  let result = '#';
  for (var i = 0; i < 6; i++) {
      result += Math.floor(Math.random() * 16).toString(16);
  }
  return result;
}

// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function(){
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000,999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}
// 从本地存储中读取复杂数据
/**
 *@description 从本地存储中读取复杂数据
 * @param{string}要以哪个键从本地存储中读取数据
 * @returns{object}读取出来的，是JSON转换的js复杂数据
 */
kits.getLocalDataArray=function(key){
  let json = localStorage.getItem(key);
  let arr = JSON.parse(json);
  return arr || [];
}
// 把复杂数据存储在本地存储中
/**
 * @description 把复杂数据存储到本地里面，默认是存储json格式字符串
 * @param{string} key 存储到本地里面的键
 * @param{object} obj 要存储的复杂数据
 * @returns undefined 返回
 */
kits.saveLocalDataArray=function(key,obj){
let json=JSON.stringify(obj);
localStorage.setItem(key,json);
}
//给本地存储里面指定键为(key)的数组数据，追加一个数据对象，执行之后是jq对象
/**
 * @description 给本地存储里面指定键(key)的数组数据，追加一个数据对象
 * @param{string} key 存储到本地里面的键
 * @param{object} data 追加到localstorage的数据
 */
kits.appendDataIntoArray=function(key,data){
  let arr= kits.getLocalDataArray(key);
  arr.push(data);
  kits.saveLocalDataArray(key,arr);
}
//根据对应的id从localStorage指定键(key)的数组中删除一条数据
/**
 * @description 根据对应的id从本地存储里面指定键(key)的数组数据中，删除一条数据
 * @param{string} key 存储到本地里面的键
 * @param{object} id 需要删除的数据的id
 */
kits.deleteLocalDataById=function(key,id){
  let arr=kits.getLocalDataArray(key);
  let pitch=arr.find((e,i)=>{
    return arr[i].id==id;
  })
  let index= arr.indexOf(pitch)
  arr.splice(index,1);
  kits.saveLocalDataArray(key,arr);
}
//根据对应的id从localStorage指定键(key)的数组中,修改一条数据
/**
 * @description 根据对应的id从本地存储里面指定键(key)的数组数据中，修改一条数据
 * @param{string} key 存储到本地里面的键
 * @param{object} id 需要修改的数据的id
 * @param{object} data: 把通过id找到的数据，修改为你传入的data
 */
kits.modifyLocalDataById=function(key,id,data){
  let arr=kits.getLocalDataArray(key);
   fanKui=false;
  let pitch=arr.find((e,i)=>{
    return arr[i].id==id;
  })
  let index= arr.indexOf(pitch);
  if(index!==-1){
    arr.splice(index,1,data);
    kits.saveLocalDataArray(key,arr);
  }else{
      fanKui=true;
    }
  return fanKui;
}