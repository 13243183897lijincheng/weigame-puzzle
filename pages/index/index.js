//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    row:4,
    col:3,
    moveBlockPos: [],
    succs:false
  },
  onLoad: function () {
    let temp = [], that = this,sh = 0,sw = 0;
    
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.screenWidth, res.screenHeight, res.windowHeight)
        sh = res.windowHeight;
        sw = res.screenWidth;
        for (let i = 0; i < (that.data.row * that.data.col); i++) {
          let l = Math.floor(parseInt(i % (that.data.col))) * (100 / (that.data.col));
          let t = Math.floor(parseInt((i) / (that.data.col))) * (100 / (that.data.row));
          temp.push({
            left: l,
            top: t,
            bgLeft: -(sw * l / 100 ),
            bgTop: -( sh * t /100 ),
            index: i,
          })
        };
        that.setData({
          moveBlockPos: temp
        })

        that.setData({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight
        })  
      },
    })
  },
  close: function () {
   this.setData({
     succs:false
   })
  },
  tap: function (e) {
    let index = e.currentTarget.dataset.index
    if(index == 11)return;
    // 准备交换数据
    let obj ={};
    ({ top: obj.top, left: obj.left, index: obj.index} = this.data.moveBlockPos[index])
    obj.bgLeft = this.data.moveBlockPos[11].bgLeft;
    obj.bgTop = this.data.moveBlockPos[11].bgTop;
    let tempArr = this.data.moveBlockPos;
    if (((Math.abs(tempArr[11].top - obj.top) <= 25) && (tempArr[11].left == obj.left)) || ((Math.abs(tempArr[11].left - obj.left) <= 34) && (tempArr[11].top == obj.top))){
      ({ top: tempArr[index].top, left: tempArr[index].left, index: tempArr[index].index} = tempArr[11])
      tempArr[11] = obj;
      this.setData({
        moveBlockPos: tempArr
      })

      // 判断是否成功
      let succs = true;
      this.data.moveBlockPos.map((item,index) => {if (item.index !== index){succs = false}})
      if(succs){
        this.setData({
          succs: true
        })
      }
    }
  }
})
