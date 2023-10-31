import { updateStudentAns } from "./serverApi";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import { getUrlParam, getWorkBusyId } from "./utils";
import viteLogo from "./vite.svg";
import { QuestionBox, BoxType } from "./work/questionBox";

import { executeTasks } from "./work/schedule";

(() => {
  const app = document.createElement("div");
  document.body.append(app);

  setTimeout(() => {
    /*     let panduan = new QuestionBox(BoxType.PANDUAN);
    let size = panduan.getDoms.length
    let count = 24
    setInterval(()=>{
      if(count < size){
        panduan.doTask(panduan.getDoms[count])
        count++;
      }
    },3000) */
    // let tiankong = new QuestionBox(BoxType.TIANKONG)
    // let size = tiankong.getDoms.length
    // let count = 0
    // setInterval(()=>{
    //   if(count < size){
    //     tiankong.doTask(tiankong.getDoms[count])
    //     count++;
    //   }
    // },3000)
  }, 3000);
  return app;
})().innerHTML = ``