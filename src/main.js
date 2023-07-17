$('.addButton')
    .on('click',()=>{
        console.log(1)
        let url = window.prompt("请问你要添加的网址是：")
        if(url.indexOf("http")!==0){
            url = "https://"+url
            // alert("请输入以http开头的网址")
            console.log(url)
        }
        const $siteList = $(".siteList")//先找到siteList
        console.log($siteList)///jQuery返回的是一个API 
        const $lastLi = $siteList.find('li.last')
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