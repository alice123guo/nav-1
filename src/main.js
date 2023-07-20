//因为li是在siteList里面的，所以需要把siteList放前面
const $siteList = $(".siteList")
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
  {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
  {logo:'./images/bilibili.svg',logoType:'image',url:'https://www.bilibili.com'},
  {logo:'./images/百度.svg',logoType:'image',url:'https://www.baidu.com'}
]

//简化URL显示
const simplifyUrl = (url)=>{
  return url.replace('https://','')
            .replace('http://','')
            .replace('www.','')
}


const render = ()=>{
  $siteList.find("li:not(.last)").remove()
  hashMap.forEach(node=>{
    const $li = $(`<li>
            <a href="${node.url}">
              <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
              </div>
            </a>
          </li>`).insertBefore($lastLi)})
}
render()

$('.addButton')
    .on('click',()=>{
        console.log(1)
        let url = window.prompt("请问你要添加的网址是：")
        if(url.indexOf("http")!==0){
            url = "https://"+url
            // alert("请输入以http开头的网址")
            console.log(url)};

        hashMap.push({logo:url[0],logoType:'text',url:url});
        render();
    })


    // 当关闭页面的时候，把当前的hashMap存在x里面，下次进来的时候会保存
window.onbeforeunload = ()=>{
  console.log('页面关闭')
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x',string) 
}
