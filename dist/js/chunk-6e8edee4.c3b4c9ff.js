(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e8edee4"],{"140b":function(e,t,a){"use strict";var n=a("48f6"),o=a.n(n);o.a},"48f6":function(e,t,a){},"516e":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Divider",[e._v(e._s(e.forumName))]),a("div",{staticClass:"top"},[a("Input",{staticStyle:{width:"300px"},attrs:{search:"",placeholder:"Enter something..."}}),a("Button",{attrs:{type:"primary",shape:"circle",icon:"md-add"}},[e._v("添加")])],1),a("Table",{attrs:{border:"",columns:e.columns12,data:e.data6},scopedSlots:e._u([{key:"name",fn:function(t){var n=t.row;return[a("strong",[e._v(e._s(n.name))])]}},{key:"action",fn:function(t){t.row;var n=t.index;return[a("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.show(n)}}},[e._v("查看")]),a("Button",{attrs:{type:"error",size:"small"},on:{click:function(t){return e.remove(n)}}},[e._v("删除")])]}}])}),a("div",{staticClass:"page-box"},[a("Page",{attrs:{total:40,size:"small","show-elevator":"","show-total":""}})],1)],1)},o=[],r=(a("7f7f"),{name:"forumTable",props:["forumName"],data:function(){return{columns12:[{title:"贴主编号",slot:"name"},{title:"贴主",key:"age"},{title:"贴吧主题",key:"address"},{title:"被评论数",key:"age"},{title:"操作",slot:"action",width:150,align:"center"}],data6:[{name:"John Brown",age:18,address:"New York No. 1 Lake Park"},{name:"Jim Green",age:24,address:"London No. 1 Lake Park"},{name:"Joe Black",age:30,address:"Sydney No. 1 Lake Park"},{name:"Jon Snow",age:26,address:"Ottawa No. 2 Lake Park"}]}},methods:{show:function(e){this.$Modal.info({title:"User Info",content:"Name：".concat(this.data6[e].name,"<br>Age：").concat(this.data6[e].age,"<br>Address：").concat(this.data6[e].address)})},remove:function(e){var t=this;this.$Modal.confirm({title:"提示",content:"<p>是否删除帖子</p>",onOk:function(){t.$Message.info("Clicked ok"),t.data6.splice(e,1)},onCancel:function(){t.$Message.info("Clicked cancel")}})}}}),s=r,i=(a("140b"),a("2877")),c=Object(i["a"])(s,n,o,!1,null,"c00e511e",null);t["a"]=c.exports},"9e28":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("forumTable",{attrs:{"forum-name":"闪电传媒"}})],1)},o=[],r=a("516e"),s={name:"shanDian",components:{forumTable:r["a"]}},i=s,c=a("2877"),l=Object(c["a"])(i,n,o,!1,null,"2fd8f2de",null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-6e8edee4.c3b4c9ff.js.map