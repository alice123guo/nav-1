//因为li是在siteList里面的，所以需要把siteList放前面
const $siteList = $(".siteList")
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
  {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
  {logo:'B',logoType:'text',url:'https://www.bilibili.com'},
  {logo:'B',logoType:'text',url:'https://www.baidu.com'}
]

//简化URL显示
const simplifyUrl = (url)=>{
  return url.replace('https://','')
            .replace('http://','')
            .replace('www.','')
            .replace(/\/.*/,'')
}


const render = ()=>{
  $siteList.find("li:not(.last)").remove()
  hashMap.forEach((node,index)=>{
    console.log(index)
    const $li = $(`<li>
              <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                  <svg class="icon"><use xlink:href="#icon-close"></use></svg>
                </div>

              </div>
          </li>`).insertBefore($lastLi)

    //因为a标签没办法再加一个关闭按钮，点关闭按钮总是跳转所以直接不用,改用JS控制
    $li.on('click',()=>{
      window.open(node.url)

    })

    //阻止冒泡，然后关闭按钮生效
    $li.on('click','.close',(e)=>{
      e.stopPropagation()
      console.log(hashMap)
      hashMap.splice(index,1)//根据索引index开始删，删除一个数据
      render()//删除以后必须渲染
    })  
  })
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

        hashMap.push({logo:simplifyUrl(url)[0].toUpperCase(),logoType:'text',url:url});
        render();
    })


    // 当关闭页面的时候，把当前的hashMap存在x里面，下次进来的时候会自动保存
window.onbeforeunload = ()=>{
  console.log('页面关闭')
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x',string) 
}



//键盘事件：在页面输入a就可以打开acfun.com等
$(document).on('keypress',(e)=>{
  console.log(e.key)//打印出按下的是哪个键

  const {key} = e //这是全写语法：const key = e.key  
  for(let i = 0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()===key){//toLowerCase转成小写
      window.open(hashMap[i].url)
    }
  }
})