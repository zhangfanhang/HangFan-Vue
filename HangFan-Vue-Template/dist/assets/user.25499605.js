import{B as t,y as s}from"./index.f7730682.js";const o=t("user",{state:()=>({userInfo:s.getItem("userInfo")||{}}),actions:{saveUserInfo(e){this.userInfo=e,s.setItem("userInfo",e)}}});export{o as u};
