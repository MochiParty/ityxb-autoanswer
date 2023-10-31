import { search } from "../serverApi";
import { BoxTask,TiankongTask,PanduanTask } from "./boxTask";

enum BoxType {
  DANXUAN, // 单选
  DUOXUAN, // 多选
  PANDUAN, // 判断
  TIANKONG, // 填空
  JIANDA, // 简答
}

class QuestionBox {
  // Question name
  readonly type: BoxType;
  private items: Array<QuestionItem> = [];
  private task: BoxTask | undefined;
  constructor(type: BoxType) {
    this.type = type;
    let dom = "." + BoxType[type].toLocaleLowerCase() + " .questionItem";
    let domQuery = $(dom);
    domQuery.each((_index, element) => {
      this.items.push(new QuestionItem($(element)));
    });
    switch (type) {
      case BoxType.PANDUAN: {
        this.task = new PanduanTask();
        break;
      }
      case BoxType.TIANKONG: {
        this.task = new TiankongTask();
      }
    }
  }

  get getDoms(): Array<QuestionItem> {
    return this.items;
  }

  doTask(item: QuestionItem){
    this.task?.doWork(item)
  }
}

class QuestionItem {
  readonly dom: JQuery<HTMLElement>;
  readonly title: JQuery<HTMLElement>; // 标题
  readonly optionBox: JQuery<HTMLElement>;
  readonly questionNum: JQuery<HTMLElement>
  constructor(dom: JQuery<HTMLElement>) {
    this.dom = dom;
    this.title = this.dom.find(".question-title-box");
    this.optionBox = this.dom.find(".question-option-box");
    this.questionNum = this.dom.find(".question-num");
  }

  /**
   * 获取答案
   * @param element Dom元素
   */
  public async getAnswer() {
    const res = await search({ question: this.title[0].innerText })
      .then((response: any) => {
        const result = JSON.parse(response.responseText);
        switch (result.code) {
          case 200:
            return result.data.answer;
          default:
            return result.msg;
        }
      })
      .catch((_error) => {
        this.title.append($("<span style='color: red'>出错啦~</span>"))
        return "error";
      });
    return [res];
  }
}

export { BoxType, QuestionBox, QuestionItem };
