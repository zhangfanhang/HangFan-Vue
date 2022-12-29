import{N as m,c as Z,q as u,n as ee,r as d,o as k,b as C,g as z,e,w as t,F as q,d as A,i as p,t as f,j as le,E as M,Q as ae}from"./index.97ded6be.js";import{r as te}from"./zh-cn.54e2677e.js";import{_ as oe,C as ne}from"./CommonBtns.c3b1a12c.js";import{u as re}from"./useMessageBox.6d5b6efb.js";import{_ as ue}from"./lodash.6bf63fca.js";import{a as E,g as se}from"./leave.e9c38dc9.js";import{_ as ie}from"./_plugin-vue_export-helper.cdc0426e.js";import"./request.d016c993.js";const pe={class:"role-manage"},de={class:"role-manage-from"},me={class:"role-manage-table-btns",ref:"testRef"},ce=p("\u7533\u8BF7\u4F11\u5047"),ve={class:"role-manage-table"},fe=p("\u53D6 \u6D88"),_e=p("\u786E \u5B9A"),ye=p("\u5173 \u95ED"),be={__name:"Leave",setup(ge){m.locale("zh-cn"),m.extend(te);const h={1:"\u4E8B\u5047",2:"\u8C03\u4F11",3:"\u5E74\u5047"},T=[{label:"\u5F85\u5BA1\u6279",value:1},{label:"\u5BA1\u6279\u4E2D",value:2},{label:"\u5BA1\u6279\u62D2\u7EDD",value:3},{label:"\u5BA1\u6279\u901A\u8FC7",value:4},{label:"\u4F5C\u5E9F",value:5}],I=Z(a=>{let l=s.value.time?s.value.time:[];const n=m(l[1]);return s.value.startTime=l[0],s.value.endTime=l[1],s.value.leaveTime=n.diff(l[0],"day"),n.diff(l[0],"day")}),s=u({reasons:"",time:[],startTime:"",endTime:"",applyType:""});let i=u({});const P={applyType:[{required:!0,message:"\u8BF7\u9009\u62E9\u4F11\u5047\u7C7B\u578B",trigger:"change"}],time:[{required:!0,message:"\u8BF7\u9009\u62E9\u4F11\u5047\u65F6\u95F4",trigger:"change"}]};let w=u("create"),_=u(!1),b=u(!1),x=u("\u4F11\u5047\u7533\u8BF7");const N=u(),B=u(),V=u(),y=u({applyState:""});let c=u({pageSize:10,pageNum:1}),U=u(!0),$=u(0),F=u([]);const H=async()=>{V.value.validate(async a=>{a&&(await E({...s.value,action:w.value}),w.value==="create"?M.success("\u7533\u8BF7\u6210\u529F"):M.success("\u4F5C\u5E9F\u6210\u529F"),await v(),_.value=!1)})},j=()=>{N.value.resetFields(),v()},v=async()=>{U.value=!0;let a={...y.value,...c.value},{list:l,page:n}=await se(a);$.value=n.total,F.value=l,U.value=!1},O=a=>{c.value.pageSize=a.pageSize,c.value.pageNum=a.currentPage,v()},K=a=>{c.value.pageNum=a,v()},Q=async()=>{_.value=!0,w.value="create",await ae(),V.value.resetFields()};ee(()=>{v()});const G=[{label:"\u5355\u53F7",prop:"orderNo",width:"60"},{label:"\u4F11\u5047\u65F6\u95F4",prop:"",width:"60",formatter(a){return`${m(a.startTime).locale("zh-cn").format("YYYY/MM/DD")}~${m(a.endTime).locale("zh-cn").format("YYYY/MM/DD")}`}},{label:"\u4F11\u5047\u65F6\u957F",prop:"leaveTime",width:"60",formatter(a,l,n){return`${n}\u5929`}},{label:"\u4F11\u5047\u7C7B\u578B",prop:"applyType",width:"60",formatter(a,l,n){return h[n]}},{label:"\u4F11\u5047\u539F\u56E0",prop:"reasons",width:"60"},{label:"\u7533\u8BF7\u65F6\u95F4",prop:"createTime",width:"80",formatter(a,l,n){return m(n).locale("zh-cn").format("YYYY/MM/DD A hh:mm ")}},{label:"\u5BA1\u6279\u4EBA",prop:"auditUsers",width:"60"},{label:"\u5F53\u524D\u5BA1\u6279\u4EBA",prop:"curAuditUserName",width:"60"},{label:"\u5BA1\u6279\u72B6\u6001",prop:"applyState",width:"60",formatter(a,l,n){return T.filter(r=>r.value===n)[0].label}},{width:"100",fixed:"right",showOperation:!0,operationConfig:{type:"button",buttons:[{title:"\u67E5\u770B",func:a=>{b.value=!0,i.value=ue.cloneDeep(a),console.log(i.value),i.value._applyState=T.filter(l=>l.value===a.applyState)[0].label,i.value.applyType=h[a.applyType],i.value.leaveTime=`${a.leaveTime}\u5929`,i.value.time=`${m(a.startTime).locale("zh-cn").format("YYYY/MM/DD")}~${m(a.endTime).locale("zh-cn").format("YYYY/MM/DD")}`},link:!0,type:"primary"},{show:a=>[1,2].includes(a.applyState),title:"\u4F5C\u5E9F",func:async a=>{await re("\u786E\u8BA4\u4F5C\u5E9F\u6B64\u4F11\u5047\u7533\u8BF7\uFF1F","\u63D0\u793A");let l={_id:a._id,action:"delete"};await E(l),await v({...y.value,...c.value}),M.success("\u4F5C\u5E9F\u6210\u529F")},link:!0,type:"danger"}]}}];return(a,l)=>{const n=d("el-option"),D=d("el-select"),r=d("el-form-item"),S=d("el-form"),g=d("el-button"),J=d("el-date-picker"),W=d("el-input"),L=d("el-dialog"),Y=d("el-step"),X=d("el-steps");return k(),C("div",pe,[z("div",de,[e(S,{inline:!0,model:y.value,ref_key:"elFormRef",ref:N},{default:t(()=>[e(r,{label:"\u5BA1\u6279\u72B6\u6001",prop:"applyState"},{default:t(()=>[e(D,{modelValue:y.value.applyState,"onUpdate:modelValue":l[0]||(l[0]=o=>y.value.applyState=o),placeholder:"\u8BF7\u9009\u62E9\u7528\u6237\u72B6\u6001"},{default:t(()=>[(k(),C(q,null,A(T,o=>e(n,{value:o.value,key:o.value,label:o.label},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1}),e(r,null,{default:t(()=>[e(oe,{query:v,"re-set":j})]),_:1})]),_:1},8,["model"])]),z("div",me,[e(g,{type:"primary",onClick:Q},{default:t(()=>[ce]),_:1})],512),z("div",ve,[e(ne,{ref_key:"commonTableRef",ref:B,tableHeight:450,rowKey:"roleId",selectable:!1,tableData:F.value,columnData:G,currentPage:c.value.pageNum,pageSize:c.value.pageSize,total:$.value,onHandleSizeChange:O,onHandleCurrentChange:K},null,8,["tableData","currentPage","pageSize","total"])]),e(L,{title:x.value,width:"40%",modelValue:_.value,"onUpdate:modelValue":l[5]||(l[5]=o=>_.value=o)},{footer:t(()=>[e(g,{onClick:l[4]||(l[4]=o=>_.value=!1)},{default:t(()=>[fe]),_:1}),e(g,{type:"primary",onClick:H},{default:t(()=>[_e]),_:1})]),default:t(()=>[e(S,{rules:P,model:s.value,"label-width":"80px","label-position":"right",ref_key:"leaveInfoForm",ref:V},{default:t(()=>[e(r,{label:"\u4F11\u5047\u7C7B\u578B",prop:"applyType"},{default:t(()=>[e(D,{modelValue:s.value.applyType,"onUpdate:modelValue":l[1]||(l[1]=o=>s.value.applyType=o),placeholder:"\u8BF7\u9009\u62E9\u4F11\u5047\u7C7B\u578B"},{default:t(()=>[(k(),C(q,null,A(h,(o,R)=>e(n,{value:R,key:R,label:o},null,8,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"\u4F11\u5047\u65F6\u95F4",prop:"time"},{default:t(()=>[e(J,{modelValue:s.value.time,"onUpdate:modelValue":l[2]||(l[2]=o=>s.value.time=o),type:"daterange","range-separator":"\uFF5E","start-placeholder":"\u5F00\u59CB\u65F6\u95F4","end-placeholder":"\u7ED3\u675F\u65F6\u95F4","disabled-date":o=>o.getTime()<Date.now()-24*60*60*1e3},null,8,["modelValue","disabled-date"])]),_:1}),e(r,{label:"\u4F11\u5047\u65F6\u957F"},{default:t(()=>[p(f(le(I))+"\u5929 ",1)]),_:1}),e(r,{label:"\u4F11\u5047\u539F\u56E0",prop:"reasons"},{default:t(()=>[e(W,{modelValue:s.value.reasons,"onUpdate:modelValue":l[3]||(l[3]=o=>s.value.reasons=o),placeholder:"\u8BF7\u8F93\u5165\u4F11\u5047\u539F\u56E0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["title","modelValue"]),e(L,{title:x.value,width:"40%",modelValue:b.value,"onUpdate:modelValue":l[7]||(l[7]=o=>b.value=o)},{footer:t(()=>[e(g,{onClick:l[6]||(l[6]=o=>b.value=!1)},{default:t(()=>[ye]),_:1})]),default:t(()=>[e(S,{"label-width":"80px","label-position":"right"},{default:t(()=>[e(X,{active:i.value.applyState,"align-center":""},{default:t(()=>[e(Y,{title:"\u5F85\u5BA1\u6279"}),e(Y,{title:"\u5BA1\u6279\u4E2D"}),e(Y,{title:"\u5BA1\u6279\u901A\u8FC7/\u62D2\u7EDD/\u4F5C\u5E9F"})]),_:1},8,["active"]),e(r,{label:"\u4F11\u5047\u7C7B\u578B"},{default:t(()=>[p(f(i.value.applyType),1)]),_:1}),e(r,{label:"\u4F11\u5047\u65F6\u95F4"},{default:t(()=>[p(f(i.value.time),1)]),_:1}),e(r,{label:"\u4F11\u5047\u65F6\u957F"},{default:t(()=>[p(f(i.value.leaveTime),1)]),_:1}),e(r,{label:"\u4F11\u5047\u539F\u56E0"},{default:t(()=>[p(f(i.value.reasons),1)]),_:1}),e(r,{label:"\u5BA1\u6279\u72B6\u6001"},{default:t(()=>[p(f(i.value._applyState),1)]),_:1}),e(r,{label:"\u5BA1\u6279\u4EBA"},{default:t(()=>[p(f(i.value.auditUsers),1)]),_:1})]),_:1})]),_:1},8,["title","modelValue"])])}}},Me=ie(be,[["__scopeId","data-v-27f422c3"]]);export{Me as default};
