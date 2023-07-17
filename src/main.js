$('.addButton')
    .on('click',()=>{
        console.log(1)
        let url = window.prompt("请问你要添加的网址是：")
        if(url.indexOf("http")!==0){
            url = "https://"+url
            // alert("请输入以http开头的网址")
            console.log(url)
        }4
    })