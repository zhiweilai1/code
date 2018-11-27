import Mock from 'mockjs'
const vehicle = Mock.mock(
  '/api/vehicle', 'post', (req, res) => {
    return {
      code: 200,
      data: [{
        id: 1,
        licNumber: '陕A79898',
        color: 1,
        buyTime: '2017-04-01'

      }, {
        id: 1,
        licNumber: '陕A79898',
        color: 1,
        buyTime: '2017-04-01'

      }],
      message: '查询成功'
    }
  })
const user = Mock.mock(
  '/api/user', 'get', (req, res) => {
    return {
      code: 200,
      data: {
        id: 1,
        sex: 1,
        age: 25,
        createTime: '2017-04-01'
      },
      message: '查询成功'
    }
  })
const banner = Mock.mock(
  '/api/getBanner', 'get', (req, res) => {
    return {
      code: 200,
      data: [
        'http://q-cf.bstatic.com/images/hotel/840x460/348/34850663.jpg',
        'http://i2.wp.com/www.dreahorvath.eu/wp-content/uploads/2014/04/KingdomOfGold_1080p_vue105.jpg',
        'http://img00.deviantart.net/0305/i/2012/356/8/9/scenic_environment_creation_in_vue_by_2753productions-d5os5qd.jpg'
      ],
      err_msg: '查询成功'
    }
  }
)

const company = Mock.mock(
  '/api/getCompany', 'get', (req, res) => {
    return {
      code: 200,
      data: [
        {
          url: '',
          imgUrl: 'http://img00.deviantart.net/0305/i/2012/356/8/9/scenic_environment_creation_in_vue_by_2753productions-d5os5qd.jpg',
          company: '京东'
        },
        {
          url: 'https://m.mi.com/',
          imgUrl: 'http://img00.deviantart.net/0305/i/2012/356/8/9/scenic_environment_creation_in_vue_by_2753productions-d5os5qd.jpg',
          company: '小米'
        },
        {
          url: '',
          imgUrl: 'http://img00.deviantart.net/0305/i/2012/356/8/9/scenic_environment_creation_in_vue_by_2753productions-d5os5qd.jpg',
          company: '滴滴'
        }
      ],
      err_msg: '查询成功'
    }
  }
)

const companyDetail = Mock.mock(
  '/api/getCompany/detail', 'get', (req, res) => {
    return {
      code: 200,
      data: {
        backImg: '../../static/banner3.jpg',
        companyImg: '../../static/bai.jpeg',
        companyName: '北京嘀嘀无限科技发展有限公司',
        companydet: '电子商务、B2C',
        companyType: '私营.民营企业',
        companyPer: '>10000人',
        companyIntru: '嘀嘀是一家非常棒的公司，很赞，为中国出行事业做出了自己一份努力',
        companyPlace: '中国北京海淀',
        welfareArr: ['nice', '薪资高', '五险一金'],
        offList: [{
          id: 1,
          name: '总裁1',
          place: '北京',
          experience: '1年以上',
          education: '大专以上',
          money: '4000/月',
          pushTime: '2018-11-11 11:11:11'
        }, {
          id: 2,
          name: '总裁2',
          place: '北京',
          experience: '1年以上',
          education: '大专以上',
          money: '4000/月',
          pushTime: '2018-11-11 11:11:11'
        }, {
          id: 3,
          name: '总裁3',
          place: '北京',
          experience: '1年以上',
          education: '大专以上',
          money: '4000/月',
          pushTime: '2018-11-11 11:11:11'
        }]

      },
      err_msg: '查询成功'
    }
  }
)

const officeDetail = Mock.mock(
  '/api/getOfficContent', 'get', (req, res) => {
    return {
      code: 200,
      data: {
        id: 1,
        isshi: true,
        offName: '总裁',
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
      },
      err_msg: '查询成功'
    }
  }
)
const resume = Mock.mock(
  '/api/submit/resume', 'post', (req, res) => {
    return {
      code: 200,
      data: {
        isSub: true
      },
      message: '查询成功'
    }
  })
const userMsg = Mock.mock(
  '/api/getUserMsg', 'get', (req, res) => {
    return {
      code: 200,
      data: {
        userNi: '小周同学',
        userImg: '../../static/banner3.jpg',
        Identity: 1
      },
      message: '查询成功'
    }
  })
const hireList = Mock.mock(
  '/api/gethirelist', 'get', (req, res) => {
    return {
      code: 200,
      data: [{
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
const loginYan = Mock.mock(
  '/api/postLogin', 'post', (req, res) => {
    return {
      code: 200,
      message: '查询成功'
    }
  })
const login = Mock.mock(
  '/api/postSubmit', 'post', (req, res) => {
    return {
      code: 200,
      data: {
        userName: 'zhouwenkai',
        imgUrl: '../../static/banner2.jpg',
        telphone: '17610826989'
      },
      message: '查询成功'
    }
  })
const registration = Mock.mock(
  '/api/registration', 'post', (req, res) => {
    return {
      code: 200,
      data: {
        isReg: true
      },
      message: '查询成功'
    }
  })
const getResume = Mock.mock(
  '/api/getResume', 'get', (req, res) => {
    return {
      code: 200,
      data: {
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
        }]
      },
      message: '查询成功'
    }
  })
const postBaseMessage = Mock.mock(
  '/api/postBaseMessage', 'post', (req, res) => {
    return {
      code: 200,
      data: {
        save: true
      },
      message: '查询成功'
    }
  })
const postTecMessage = Mock.mock(
  '/api/postTecMessage', 'post', (req, res) => {
    return {
      code: 200,
      data: {
        save: true
      },
      message: '查询成功'
    }
  })
const getBaseMessage = Mock.mock(
  '/api/getBaseMessage', 'get', (req, res) => {
    return {
      code: 200,
      data: {
        baseMsg: {
          username: '周先生',
          number: 24,
          sex: '男',
          status: '未实习-随时到岗',
          phone: 17610826989,
          email: '13298310629@163.com'
        }
      },
      message: '查询成功'
    }
  })
export default {
  vehicle, user, banner,
  company, companyDetail, officeDetail, resume, hireList, userMsg, loginYan, registration, getResume, postBaseMessage, getBaseMessage, postTecMessage
}