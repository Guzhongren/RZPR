var dojoConfig, jimuConfig, path = getPath();
/*global apiUrl:true , weinreUrl, loadResource, loadResources */

if(apiUrl.substr(apiUrl.length - 1, apiUrl.length) !== '/'){
  apiUrl = apiUrl + '/';
}

var loading = document.querySelector('#main-loading .loading');

var resources = [];
if(window.debug){
  resources.push({type: 'js', url: weinreUrl});
}

if(!path){
    console.error('error path.');
}else{
    /*jshint unused:false*/
    dojoConfig = {
        parseOnLoad: true,
        async: true,
        tlmSiblingOfDojo: false,
        local:"zh-cn",

        has: {
            'extend-esri': 1
        },
        packages : [{
            name : "widgets",
            location : path + "widgets"
        }, {
            name : "jimu",
            location : path + "jimu.js"
        }, {
            name : "themes",
            location : path + "themes"
        },{
            name:"GZR",
            location:path+"GZR"
        }]
    };

    jimuConfig = {
        loadingId: 'main-loading',
        mainPageId: 'main-page',
        layoutId: 'jimu-layout-manager',
        mapId: 'map'
    };
}

resources = resources.concat([
  {type: 'css', url: apiUrl + 'dojo/resources/dojo.css'},
  {type: 'css', url: apiUrl + 'dijit/themes/claro/claro.css'},
  {type: 'css', url: apiUrl + 'esri/css/esri.css'},
  {type: 'js', url: apiUrl+"init.js"},
  {type: 'css', url: path + 'jimu.js/css/jimu.css'}
]);

var progress;
loadResources(resources, null, function(url, i){
  loading.setAttribute('title', url);
  if(!progress){
    progress = document.createElement('div');
    progress.setAttribute('class', 'loading-progress');
    loading.appendChild(progress);
  }
  progress.style.width = (((i - 1)/resources.length) * 100) + '%';
}, function(){
  require(['jimu'], function(jimuMain){
    progress.style.width = '100%';
    jimuMain.initApp();
  });
});




function getPath() {
  var fullPath, path;

  fullPath = window.location.pathname;
  if(fullPath === '/' || fullPath.substr(fullPath.length - 1) === '/'){
    path = fullPath;
  }else if(fullPath.split('/').pop() === 'index.html'){
    var sections = fullPath.split('/');
    sections.pop();
    path = sections.join('/') + '/';
  }else{
    return false;
  }
  return path;
}

