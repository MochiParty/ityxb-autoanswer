import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from './vite.svg';
import { search } from './serverApi';

(() => {
  const app = document.createElement('div');
  document.body.append(app);
  return app;
})().innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setTimeout(async () => {
  let data = {
    question:
      "vm.$attrs可以获取的属性中也包含class、style以及被声明为props的属性。",
    options: [],
    type: "4",
    questionData: "",
    workType: "zy",
    id: "297101598",
    key: "",
  };
  const res = await search(data).then((response: any) => {
    console.log(response.responseText);
  });
}, 1000);