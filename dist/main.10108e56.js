// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
//因为li是在siteList里面的，所以需要把siteList放前面
var $siteList = $(".siteList");
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: 'A',
  logoType: 'text',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  logoType: 'text',
  url: 'https://www.bilibili.com'
}, {
  logo: 'B',
  logoType: 'text',
  url: 'https://www.baidu.com'
}];

//简化URL显示
var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};
var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    console.log(index);
    var $li = $("<li>\n              <div class=\"site\">\n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"close\">\n                  <svg class=\"icon\"><use xlink:href=\"#icon-close\"></use></svg>\n                </div>\n\n              </div>\n          </li>")).insertBefore($lastLi);

    //因为a标签没办法再加一个关闭按钮，点关闭按钮总是跳转所以直接不用,改用JS控制
    $li.on('click', function () {
      window.open(node.url);
    });

    //阻止冒泡，然后关闭按钮生效
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      console.log(hashMap);
      hashMap.splice(index, 1); //根据索引index开始删，删除一个数据
      render(); //删除以后必须渲染
    });
  });
};

render();
$('.addButton').on('click', function () {
  console.log(1);
  var url = window.prompt("请问你要添加的网址是：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
    // alert("请输入以http开头的网址")
    console.log(url);
  }
  ;
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: 'text',
    url: url
  });
  render();
});

// 当关闭页面的时候，把当前的hashMap存在x里面，下次进来的时候会自动保存
window.onbeforeunload = function () {
  console.log('页面关闭');
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

//键盘事件：在页面输入a就可以打开acfun.com等
$(document).on('keypress', function (e) {
  console.log(e.key); //打印出按下的是哪个键

  var key = e.key; //这是全写语法：const key = e.key  
  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      //toLowerCase转成小写
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.10108e56.js.map