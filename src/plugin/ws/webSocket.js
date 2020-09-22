// class WS {
//   // 客户端
//   static wsClient = null
//
//   // 初始化客户端
//   static init(url) {
//     this.wsClient = new WebSocket(url)
//     this.wsClient.onopen = this.wsOpen
//     this.wsClient.onmessage = this.wsMessage
//     this.wsClient.onclose = this.wsClose
//   }
//   // 连接成功
//   static wsOpen() {
//     this.wsClient.send('我连接上了')
//   }
//   // 接收到消息
//   static wsMessage(evt) {
//     let msg = evt.data
//     console.log('收到消息：', msg)
//   }
//   // 连接断开
//   static wsClose() {
//     console.log('连接已关闭')
//   }
// }
// export default WS
class WS {
  constructor(url) {
    this.init(url)
  }

  // 初始化客户端
  init(url) {
    wx.connectSocket({
      url
    })
    wx.onSocketOpen(this.wsOpen)
    wx.onSocketMessage(this.wsMessage)
    wx.onSocketClose(this.wsClose)
    wx.onSocketError(this.wsError)
  }
  // 连接成功
  wsOpen() {
    this.wsClient.send('我连接上了')
  }
  // 接收到消息
  wsMessage(evt) {
    let msg = evt.data
    console.log('收到消息：', msg)
  }
  // 连接断开
  wsClose() {
    console.log('连接已关闭')
  }
  // 连接错误
  wsError(err) {
    console.log('连接错误', JSON.stringify(err))
  }
}
export default WS
