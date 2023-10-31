import { updateStudentAns } from "../serverApi";
import { QuestionItem } from "./questionBox";

interface BoxTask {
  // 作答
  doWork(questionItem: QuestionItem): void;
  // 获取所有答案
  getOptionItems(questionItem: QuestionItem): JQuery<HTMLElement>;
}

abstract class Task implements BoxTask {
  abstract doWork(questionItem: QuestionItem): void;
  getOptionItems(questionItem: QuestionItem): JQuery<HTMLElement> {
    return questionItem.optionBox.find(".question-option-item-box");
  }
}

class PanduanTask extends Task {
  // 运行选择答案
  doWork(questionItem: QuestionItem): void {
    const answers = this.getOptionItems(questionItem).find("input");
    questionItem.getAnswer().then((result) => {
      const answer = result[0][0];
      if (answer === "正确") {
        answers[0].click();
      } else {
        answers[1].click();
      }
      questionItem.title.append($("<span style='color: green;'>已完成</span>"));
    });
  }
}

class TiankongTask extends Task {
  doWork(questionItem: QuestionItem): void {
    let input = questionItem.title.find(".tk_input");
    questionItem.getAnswer().then((result) => {
      const answers: Array<string> = result[0];
      // 包含 error
      if (answers.indexOf("error") > -1) {
        questionItem.title.append(
          $("<span style='color: green;'>未找到答案</span>")
        );
      } else {
        // console.log(questionItem.questionNum);

        updateStudentAns(questionItem.title.attr("data-id"), answers).then(
          (res) => {
            console.log(questionItem.title[0].innerText, " answer: " + result);
            const parse = JSON.parse(res.responseText);
            if (parse.success) {
              input.attr("value", answers[0]);
              // todo update right bar
              questionItem.title.append(
                $("<span style='color: green;'>已完成</span>")
              );
            }
          }
        );
      }
    });
  }
}

export { PanduanTask, TiankongTask };
export type { BoxTask };
