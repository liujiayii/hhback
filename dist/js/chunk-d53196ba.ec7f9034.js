(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d53196ba"],{"552d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"top"},[a("Input",{staticStyle:{width:"300px"},attrs:{search:"",placeholder:"Enter something..."}}),a("Button",{attrs:{type:"primary",shape:"circle",icon:"md-add"}},[t._v("添加")])],1),a("Table",{attrs:{border:"",columns:t.columns12,data:t.data6},scopedSlots:t._u([{key:"name",fn:function(e){var n=e.row;return[a("strong",[t._v(t._s(n.name))])]}},{key:"action",fn:function(e){e.row;var n=e.index;return[a("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.show(n)}}},[t._v("查看")]),a("Button",{attrs:{type:"error",size:"small"},on:{click:function(e){return t.remove(n)}}},[t._v("删除")])]}}])}),a("div",{staticClass:"page-box"},[a("Page",{attrs:{total:40,size:"small","show-elevator":"","show-total":""}})],1)],1)},o=[],r=(a("7f7f"),{name:"order",data:function(){return{columns12:[{title:"编号",slot:"name"},{title:"订单状态",key:"age"},{title:"商品类型",key:"address"},{title:"金额",key:"age"},{title:"收货地址",key:"age"},{title:"操作",slot:"action",width:150,align:"center"}],data6:[{name:"John Brown",age:18,address:"New York No. 1 Lake Park"},{name:"Jim Green",age:24,address:"London No. 1 Lake Park"},{name:"Joe Black",age:30,address:"Sydney No. 1 Lake Park"},{name:"Jon Snow",age:26,address:"Ottawa No. 2 Lake Park"}]}},methods:{show:function(t){this.$Modal.info({title:"User Info",content:"Name：".concat(this.data6[t].name,"<br>Age：").concat(this.data6[t].age,"<br>Address：").concat(this.data6[t].address)})},remove:function(t){this.data6.splice(t,1)}}}),s=r,i=(a("73d9"),a("2877")),c=Object(i["a"])(s,n,o,!1,null,"54358e84",null);e["default"]=c.exports},"73d9":function(t,e,a){"use strict";var n=a("9f2b"),o=a.n(n);o.a},"9f2b":function(t,e,a){}}]);
//# sourceMappingURL=chunk-d53196ba.ec7f9034.js.map