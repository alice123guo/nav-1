//因为li是在siteList里面的，所以需要把siteList放前面
const $siteList = $(".siteList")
const $lastLi = $siteList.find('li.last')


const hashMap = [
  {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
  {logo:'./images/bilibili.svg',logoType:'image',url:'https://www.bilibili.com'},
  {logo:'./images/百度.svg',logoType:'image',url:'https://www.baidu.com'}
]

hashMap.forEach(node=>{
  const $li = $(`
        <li>
          <a href="${node.url}">
            <div class="site">
              <div class="logo">${node.logo[0]}</div>
              <div class="link">${node.url}</div>
            </div>
          </a>
        </li>
  `).insertBefore($lastLi)//
})

$('.addButton')
    .on('click',()=>{
        console.log(1)
        let url = window.prompt("请问你要添加的网址是：")
        if(url.indexOf("http")!==0){
            url = "https://"+url
            // alert("请输入以http开头的网址")
            console.log(url)
        }
        // const $siteList = $(".siteList")//先找到siteList
        // console.log($siteList)///jQuery返回的是一个API 
        // const $lastLi = $siteList.find('li.last')
        const $li = $(` <li>
          <a href="${url}">
            <div class="site">
              <div class="logo">${url[0]}</div>
              <div class="link">${url}</div>
            </div>
          </a>
        </li>`)
        .insertBefore($lastLi)
    })