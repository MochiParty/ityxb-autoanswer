import { GM_xmlhttpRequest } from "$";
import { getWorkBusyId, toQueryString } from "./utils";

var defaultConfig = {
  ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
};

const requestUrl = "http://api.tikuhai.com/";
const studentAnsUrl =
  "https://stu.ityxb.com/back/bxg/my/busywork/updateStudentAns";

async function defaultRequest(
  url: string,
  method: string,
  data: any,
  headers = {}
) {
  headers = Object.assign(
    {
      "Content-Type": "application/json",
    },
    headers
  );
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: method,
      url: url,
      data: JSON.stringify(data),
      headers: headers,
      timeout: 5000,
      onload: function (response) {
        resolve(response);
      },
      onerror: function (response) {
        reject(response);
      },
      ontimeout: function () {
        reject();
      },
    });
  });
}

async function formRequest(url: string, method: string, data: any = {},ua = defaultConfig.ua) {
  try {
    const response: any = await new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        url,
        method,
        headers: {
          'User-Agent': ua,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Sec-Fetch-Site': 'same-origin'
        },
        data: toQueryString(data),
        onload: resolve,
        onerror: reject,
      });
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function search(data: any, status = true) {
  let params = {
    t: 4,
    z: "zy",
    u: "297101598",
  };
  data = Object.assign(
    {
      options: [],
      type: "4",
      questionData: "",
      workType: "zy",
      id: "297101598",
      key: "",
    },
    data
  );
  var url = requestUrl + "search/?" + toQueryString(params);
  const res = await defaultRequest(url, "post", data);
  return res;
}

async function updateStudentAns(questionId: string | undefined, answer: Array<string>) {
  let formData = {
    busyworkId: getWorkBusyId(),
    busyworkQuestionId: questionId,
    answer: JSON.stringify(answer),
  };
  const res = await formRequest(studentAnsUrl, "post", formData);
  return res;
}

export { search, updateStudentAns };
