 const recharge = {
  gateway: {
    hlb:{
      '0': '112', //合利宝借记卡
      '1': '115'  //合利宝信用卡      
    },
    sft: {
      '0': '102', //盛付通借记卡
      '1': '105'  //盛付通信用卡
    },
    jdzf: {
      '0': '5005',
      '1': '5008'
    },
    ldys: {
      '0': '8002',
      '1': '8005'
    },
  },
  recType: {
    hlb:'2',
    sft: '1',
    alipay: '18',
    weixin: '10',
    qq: '25',
    jdzf: '21',
    ldys: '26'
  }
}
 export default recharge
