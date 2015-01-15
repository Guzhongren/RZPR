define([
    'jimu/BaseWidget',
  'dojo/_base/declare',
    'dojo/parser',
    'dojo/dom',
    'dojo/query',
    'dojo/on',
    'dojo/dom-class',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/_base/array',
    'dijit/form/Button',
    'dijit/form/CheckBox',
    'dijit/form/ComboBox',
    'dojo/store/Memory',
    'dijit/form/Select',
    'dijit/layout/TabContainer',
    'dijit/layout/ContentPane',

//    'jimu.js/DateUtil',

    'esri/dijit/TimeSlider',
    'esri/TimeExtent'
], function(
    BaseWidget,
  declare,
  parser,
  dom,
  query,
  on,
  domClass,
  domAttr,
  domStyle,
  domConstruct,
  array,
  Button,
  CheckBox,
  ComboBox,
  Memory,
  Select,
  TabContainer,
  ContentPane,

//  DateUtil,

  TimeSlider,
  TimeExtent


) {
    parser.parse();

  var clazz = declare([BaseWidget], {
    //these two properties are defined in the BaseWiget
    baseClass: 'scene-and-review',
    name: 'SceneAndReview',
      mainTab:null,
      scenePane:null,
      reviewPane:null,
      checkBox:[],
      monitorDistribution:null,
      polluter:null,
      detailTime:null,


    // add additional properties here

    postCreate: function() {
      // summary:
      //      Overrides method of same name in dijit._Widget.
      // tags:
      //      private
      this.inherited(arguments);
      console.log('SceneAndReview::postCreate', arguments);

      // add additional post constructor logic here
    },

    // start up child widgets
    startup: function() {
      // summary:
      //      Overrides method of same name in dijit._Widget.
      // tags:
      //      private
      this.inherited(arguments);
      console.log('SceneAndReview::startup', arguments);
        this.detailTime=this.config.detailTime;
        /*this.polluter=this.config.polluter;*/
        /*this.polluter=this.processConfigString(this.polluter);*/
        this.innitWidget();
        this.switchNavButton();
//
    },

    onOpen: function() {
      // summary:
      //      Overrides method of same name in jimu._BaseWidget.
      console.log('SceneAndReview::onOpen', arguments);

      // add code to execute whenever the widget is opened
    },

    onClose: function() {
      // summary:
      //      Overrides method of same name in jimu._BaseWidget.
      console.log('SceneAndReview::onClose', arguments);

      // add code to execute whenever the widget is closed
    },
      /*创建页面--失败*/
      innitWidget:function(){
          //处理config中的字符串  "

        /*this.mainTab=new TabContainer({
               id:'mainTab',
               class:'gzr-Tab'
           },'divMain');
          this.scenePane=new ContentPane({
              id:'scenePane',
              title:'实况',
              class:'gzr-ContenPane',
              content:'实况'
          });
          this.mainTab.addChild(this.scenePane);
          this.reviewPane=new ContentPane({
              id:'reviewPane',
              title:'回顾',
              class:'gzr-ContenPane',
              content:'回顾'
          });
          this.mainTab.addChild(this.reviewPane);

          domClass.add(this.mainTab,'gzr-table');
          array.forEach(this.mainTab.tabs,function(item){
             domClass.add(item,'gzr-th')
          });
          this.mainTab.startup();*/
          //Button
          /*this.button1=new Button({
              id:'sceneButton',
              class:'gzr-btn',
              label:'实况'
          },'divMain1').startup();
          *//*domClass.add(this.button1,'.gzr-btn');*//*
          this.button2=new Button({
              id:'reviewButton',
              class:'gzr-btn',
              label:'回顾'
          },'divMain1').startup();
          console.log("ok");*/
          //create Controls
           this.checkBox[0]=new CheckBox(null,{
               id:'ckMonitorSites',
               label:'监测站点',
               value:'ckMonitorSitesToTrue',
               readOnly:true,
               /*checked:true,*/
               tooltip:'ckMonitorSites',
               name:'ckMonitorSites'
      }).placeAt('dataContent1',0).startup();
          domAttr.set(this.checkBox[0],'for','ckMonitorSites');

          //监测站点label
          query('.gzr-font1')[0].innerHTML='叠加数据 : ';
          query('.gzr-font2')[0].innerHTML='监测站点';
          //风场
          this.checkBox[1]=new CheckBox(null,{
              id:'ckWind',
              label:'风场',
              value:'ckwind',
              readOnly:true,
              tooltip:'风场',
              name:'ckWind'
          }).placeAt('dataContent2',0).startup();
          domAttr.set(this.checkBox[1],'for','ckWind');
          query('.gzr-font2')[1].innerHTML='风场';
          //同化区域
          var monitorLabel=new domConstruct.create('label',{
              innerHTML:'同化区域 :'
          },query('.gzr-font1')[1]);

          /*var MonitorStore = new Memory({
              data: [
                  {name:"全国", id:"allCounty"},
                  {name:"全国", id:"allCounty"},
                  {name:"全国", id:"allCounty"}
              ]
          });
          var monitorData=ObjectStore({objectStore:MonitorStore});*/
          /*var comboBox = new ComboBox({
              id: "ckWindDomain",
              name: "Domian",
              value: "全国",
              store: MonitorStore,
              searchAttr: "name"
          }, "ckWindDomain").startup();*/
          var select=new Select({
              id:'ckWindDomain',
              options:[{label:'全国',value:'allCounty',selected:true},
                      {label:'全国一',value:'allCounty1'},
                      {label:'全国二',value:'allCounty2'}],
              class:'dijitSelect gzr-comboBox'
          },'ckWindDomain').startup();
          //同化模式
          query('.gzr-font1')[2].innerHTML='同化模式';
          var assimilateSelect=new Select({
              id:'ckAssimilateMode',
              options:[{label:'NAQPMS',value:'naqpms',selected:true}],
              class:'dijitSelect gzr-comboBox'
          },'ckAssimilateMode').startup();
          //污染物质

          query('.gzr-font1')[3].innerHTML='污染物质';
          var polluter=new Select({
              id:'ckPolluter',
              options:[{label:'<span>SO<sub>2</sub></span>',value:'so2',selected:true},
                       {label:'<span>NO<sub>2</sub></span>',value:'no2'},
                       {label:'<span>PM<sub>10</sub></span>',value:'pm10'},
                       {label:'<span>PM<sub>2.5</sub></span>',value:'pm2.5'},
                       {label:'<span>CO</span>',value:'co'},
                       {label:'<span>O<sub>3</sub></span>',value:'o3'}
                    ],
              class:'dijitSelect gzr-comboBox'
          },'ckPolluter').startup();
          //时间
           domConstruct.place("<br/><br/><br/><br/>",'condition1');
           domConstruct.create('span',{innerHTML:this.detailTime,class:'gzr-font3'},query('br')[3],'after');
          //时间滑块
          var divTimerSlider=domConstruct.create('div',{id:'divTimerSlider'},dom.byId('condition2'));
          var startTime=DateUtil.strToDate(this.config.timerSlider.tiemExtent.startTime);
          var endTime=dateUtil.strToDate(this.config.timerSlider.timeExtent.endTime);
          var timeExtent=new TimeExtent(startTime,endTime);
          var timeSlider=new TimeSlider({
              loop:this.config.timerSlider.loop,
              thumbCount:this.config.timerSlider.thumbCount,
              thumbMovingRate:this.config.timerSlider.thumbMovingRate,
              style:{width:'100%'}

          },dom.byId('divTimerSlider'));
          timeSlider.createTimeStopsByTimeInterval(timeExtent,1,'UNIT_HOURS');
          timeSlider.startup();
          this.map.setTimeSlider(timeSlider);


          console.log("polluter");

      },
      switchNavButton:function(){
          //content of operation
          domClass.add(dom.byId('content1'),'gzr-content');
          domClass.add(dom.byId('content2'),'gzr-content');
          domStyle.set(dom.byId('content1'),'display','block');
          domStyle.set(dom.byId('content2'),'display','none');
          //默认选中实况
          domStyle.set(dom.byId('btnScene'),'background','#229d7b');
          domStyle.set(dom.byId('btnReview'),'background','#1d2123');
          query('.gzr-btn').on('click',this.jumpPages);

      },
      //跳转页面
      jumpPages:function(e){
          if(e.target.id==='btnScene'){
              domStyle.set(e.target,'background','#229d7b');
              domStyle.set(dom.byId('btnReview'),'background','#1d2123');
              domStyle.set(dom.byId('content1'),'display','block');
              domStyle.set(dom.byId('content2'),'display','none');
          }else{
              domStyle.set(e.target,'background','#229d7b');
              domStyle.set(dom.byId('btnScene'),'background','#1d2123');
              domStyle.set(dom.byId('content1'),'display','none');
              domStyle.set(dom.byId('content2'),'display','block');
          }
          console.log('ok');
      }
      /*processConfigString:function(strings){
          strings.substring(0,1);
          return strings.substring(strings.length-1,strings.length);
      }*/
  });

  return clazz;
});