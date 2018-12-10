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
      accountNumber: '12345678',
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

const getOfficList = Mock.mock('/api/getOfficList', 'get', (req, res) => {
  return {
    code: 200,
    data: [{
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁',
      type: '高级技工',
      money: '4000/月',
      place: '北京',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁',
      money: '4000/月',
      type: '普通技工',
      place: '北京',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁',
      money: '4000/月',
      type: 'UI设计师',
      place: '北京',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁',
      money: '4000/月',
      type: '高级技工',
      place: '北京',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁',
      money: '4000/月',
      place: '北京',
      type: '普通技工',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁',
      money: '4000/月',
      place: '北京',
      type: 'UI设计师',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '普通技工',
      money: '4000/月',
      place: '北京',
      type: '高级技工',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京新浪科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '高级技工',
      money: '4000/月',
      place: '北京',
      type: '普通技工',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京小桔科技有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁2',
      money: '4000/月',
      place: '北京',
      type: 'UI设计师',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁3',
      money: '4000/月',
      place: '北京',
      type: '高级技工',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁1',
      money: '4000/月',
      place: '北京',
      type: '普通技工',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }, {
      person: 20,
      id: 1,
      isshi: true,
      offName: '总裁5',
      money: '4000/月',
      place: '北京',
      type: 'UI设计师',
      companydet: '电子商务、B2C',
      companyType: '私营.民营企业',
      companyPer: '>10000人',
      experience: '1年以上',
      education: '大专以上',
      welfareArr: ['nice', '薪资高', '五险一金'],
      companyImg: '../../static/banner2.jpg',
      companyId: 10,
      companyName: '北京嘀嘀无限科技发展有限公司',
      companyPlace: '中国北京海淀',
      Responsibilities: ['完成游戏中的界面设计'],
      requirements: ['本科学历，美术、设计相关专业毕业，有较强的专业美术基础，熟悉二次元风格设计', '有良好的美术功底和优秀的视觉设计能力，及较强的细节处理能力', '精通Photoshop、Flash、AI等各类主流图形处理软件，并有良好的手绘能力'],
      pushTime: '2018-11-11 11:11:11'
    }],
    message: '查询成功'
  }
})

const getResumeList = Mock.mock('/api/getResumeList', 'get', (req, res) => {
  return {
    code: 200,
    data: [{
      id: 1,
      baseMsg: {
        username: '周先生',
        number: 24,
        sex: '男',
        status: '未实习-随时到岗',
        phone: 17610826989,
        email: '13298310629@163.com'
      },
      tecMsg: [{
        school: '华北水利水电大学',
        level: '本科',
        profession: '网络工程',
        dec: '它是一个非常棒的学校',
        begin: '2013',
        end: '2017'
      }],
      workMsg: [{
        company: '北京嘀嘀无限科技发展有限公司',
        position: 'web前端工程师',
        duties: '在平台技术部工作',
        begin: '2017-02',
        end: '2017-05'
      }],
      projectMsg: [{
        projectName: 'Omega',
        begin: '2017-02',
        end: '2017-05',
        projectPosition: 'web前端工程师',
        projectDesc: '一个数据集成的一个网站，我做了很多有用的工作'
      }]
    }, {
      id: 1,
      baseMsg: {
        username: '周先生',
        number: 24,
        sex: '男',
        status: '未实习-随时到岗',
        phone: 17610826989,
        email: '13298310629@163.com'
      },
      tecMsg: [{
        school: '华北水利水电大学',
        level: '本科',
        profession: '网络工程',
        dec: '它是一个非常棒的学校',
        begin: '2013',
        end: '2017'
      }],
      workMsg: [{
        company: '北京嘀嘀无限科技发展有限公司',
        position: 'web前端工程师',
        duties: '在平台技术部工作',
        begin: '2017-02',
        end: '2017-05'
      }],
      projectMsg: [{
        projectName: 'Omega',
        begin: '2017-02',
        end: '2017-05',
        projectPosition: 'web前端工程师',
        projectDesc: '一个数据集成的一个网站，我做了很多有用的工作'
      }]
    }, {
      id: 1,
      baseMsg: {
        username: '周先生',
        number: 24,
        sex: '男',
        status: '未实习-随时到岗',
        phone: 17610826989,
        email: '13298310629@163.com'
      },
      tecMsg: [{
        school: '华北水利水电大学',
        level: '本科',
        profession: '网络工程',
        dec: '它是一个非常棒的学校',
        begin: '2013',
        end: '2017'
      }],
      workMsg: [{
        company: '北京嘀嘀无限科技发展有限公司',
        position: 'web前端工程师',
        duties: '在平台技术部工作',
        begin: '2017-02',
        end: '2017-05'
      }],
      projectMsg: [{
        projectName: 'Omega',
        begin: '2017-02',
        end: '2017-05',
        projectPosition: 'web前端工程师',
        projectDesc: '一个数据集成的一个网站，我做了很多有用的工作'
      }]
    }, {
      id: 1,
      baseMsg: {
        username: '周先生',
        number: 24,
        sex: '男',
        status: '未实习-随时到岗',
        phone: 17610826989,
        email: '13298310629@163.com'
      },
      tecMsg: [{
        school: '华北水利水电大学',
        level: '本科',
        profession: '网络工程',
        dec: '它是一个非常棒的学校',
        begin: '2013',
        end: '2017'
      }],
      workMsg: [{
        company: '北京嘀嘀无限科技发展有限公司',
        position: 'web前端工程师',
        duties: '在平台技术部工作',
        begin: '2017-02',
        end: '2017-05'
      }],
      projectMsg: [{
        projectName: 'Omega',
        begin: '2017-02',
        end: '2017-05',
        projectPosition: 'web前端工程师',
        projectDesc: '一个数据集成的一个网站，我做了很多有用的工作'
      }]
    }],
    message: '查询成功'
  }
})

export default {
  addCompany,
  getCompanyList, updateCompany, deleteCompany, isShow, getOfficList, getResumeList
}
