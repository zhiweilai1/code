import Mock from 'mockjs'
const addCompany = Mock.mock('/api/addCompany', 'post', (req, res) => {
  return {
    code: 200,
    data: {
      isSave: true
    },
    message: '查询成功'
  }
})
const updateCompany = Mock.mock('/api/updateCompany', 'post', (req, res) => {
  return {
    code: 200,
    data: {
      isSave: true
    },
    message: '查询成功'
  }
})
const deleteCompany = Mock.mock('/api/deleteCompany', 'get', (req, res) => {
  return {
    code: 200,
    data: true,
    message: '查询成功'
  }
})
const isShow = Mock.mock('/api/isShow', 'post', (req, res) => {
  return {
    code: 200,
    data: true,
    message: '查询成功'
  }
})
const getCompanyList = Mock.mock('/api/getCompanyList', 'get', (req, res) => {
  return {
    code: 200,
    data: [{
      id: 1,
      companyName: '北京嘀嘀无限科技发展有限公司',
      account_number: '12345678',
      password: 666666,
      isShow: true,
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      companyPlace: '中国北京海淀',
      companyIntru: '嘀嘀是一家非常棒的公司，很赞，为中国出行事业做出了自己一份努力'
    }],
    message: '查询成功'
  }
})

export default {
  addCompany,
  getCompanyList, updateCompany, deleteCompany, isShow
}
