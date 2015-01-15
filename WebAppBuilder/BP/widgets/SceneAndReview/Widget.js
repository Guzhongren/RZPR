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

    'GZR/Util/DateUtil',

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

    DateUtil,

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
        sceneContent:null,
        reviewContent:null,
        monitorSites:null,
        sitesLabel:null,
        wind:null,
        monitorLabel:null,
        assimilateMode:null,
        timeSlider:null,



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
            this.sceneContent=this.config.scene;
            this.reviewContent=this.config.review;
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
            this.button1=new Button({
             id:this.sceneContent.id,
             class:this.sceneContent.class,
             label:this.sceneContent.label
             },'divMain1');
             this.button1.startup();
             /*domClass.add(this.button1,'.gzr-btn');*/
             this.button2=new Button({
             id:'reviewButton',
             class:'gzr-btn'
             },'divMain1');
            this.button2.startup();
             console.log(" create buttons success!");
            //create Controls
            this.monitorSites=this.config.MonitorSites;
            this.checkBox[0]=new CheckBox(null,{
                id:'ckMonitorSites',
                label:this.monitorSites.label,
                value:'ckMonitorSitesToTrue',
                readOnly:true,
                /*checked:true,*/
                tooltip:'ckMonitorSites',
                name:'ckMonitorSites'
            }).placeAt('dataContent1',0);
           this.checkBox[0].startup();
            domAttr.set(query('.gzr-font2')[0],'for','ckMonitorSites');

            //监测站点label
            this.sitesLabel=this.config.sitesLabel;
            query('.gzr-font1')[0].innerHTML=this.sitesLabel.addData;
            query('.gzr-font2')[0].innerHTML=this.sitesLabel.sites;
            //风场
            this.wind=this.config.wind;
            this.checkBox[1]=new CheckBox(null,{
                id:this.wind.id,
                label:this.wind.label,
                value:this.wind.value,
                readOnly:this.wind.readOnly,
                tooltip:this.wind.toolTip,
                name:this.wind.name
            }).placeAt('dataContent2',0);
            this.checkBox[1].startup();
            domAttr.set(query('.gzr-font2')[1],'for','ckWind');
            query('.gzr-font2')[1].innerHTML=this.wind.label;
            //同化区域
            this.monitorLabel=this.config.monitorLabel;
            var createMonitorLabel=new domConstruct.create('label',{
                innerHTML:this.monitorLabel.label
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
            //处理json数据为数组

            var select=new Select({
                id:this.monitorLabel.id,
                options:this.monitorLabel.options, //[{label:'全国',value:'allCounty',selected:true},
                                                    //{label:'全国一',value:'allCounty1'},
                                                    //{label:'全国二',value:'allCounty2'}],
                class:this.monitorLabel.class
            },'ckWindDomain');
            select.startup();
            //同化模式
            this.assimilateMode=this.config.assimilateMode;
            query('.gzr-font1')[2].innerHTML=this.assimilateMode.label;
            var assimilateSelect=new Select({
                id:this.assimilateMode.id,
                options:this.assimilateMode.options,
                class:this.assimilateMode.class
            },'ckAssimilateMode');
            assimilateSelect.startup();
            //污染物质
            this.polluter=this.config.polluter;
            query('.gzr-font1')[3].innerHTML=this.polluter.label;
            var polluter=new Select({
                id:this.polluter.id,
                options:this.polluter.options,
                class:this.polluter.class
            },'ckPolluter');
            polluter.startup();
            //时间
            domConstruct.place("<br/><br/><br/><br/>",'condition1');
            domConstruct.create('span',{innerHTML:this.config.detailTime,class:'gzr-detailTime'},query('br')[3],'after');
            //时间滑块
            var divTimerSlider=domConstruct.create('div',{id:'divTimerSlider'},dom.byId('condition2'));
            var startTime=DateUtil.strToDate(this.config.timeSlider.timeExtent.startTime);
            var endTime=DateUtil.strToDate(this.config.timeSlider.timeExtent.endTime);
            var timeExtent=new TimeExtent(startTime,endTime);
            var timeSlider=new TimeSlider({
                loop:this.config.timeSlider.loop,
                thumbCount:this.config.timeSlider.thumbCount,
                thumbMovingRate:this.config.timeSlider.thumbMovingRate,
                style:{width:'100%'}

            },dom.byId('divTimerSlider'));

           timeSlider.createTimeStopsByTimeInterval(timeExtent,1,'esriTimeUnitsHours');
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

        /*
        *@ Summary将json中的label转为非string 并返回改数组
        * @param jsonArr string json字符数组
        * @param i int 默认选中第几个===select ：true
        * */
        /*processJsonTOArray:function(jsonArr){
            array.map(jsonArr,function toArray(item){
                return label:item.label,value:item.value,selected:item.selected
            })
        }*/

    });

    return clazz;
});