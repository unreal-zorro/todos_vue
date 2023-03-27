# Заметки ![Todos](./images/Todos.png)

## 1. Описание

### 1.1 Цель создания приложения

Приложение написано после прочтения статьи на
Хабре ![Habr](./images/Habr.png): [Чистая Архитектура для веб-приложений](https://habr.com/ru/post/493430/) ![Clean architecture](./images/Clean_architecture.png)
.

Захотелось попробовать чистую архитектуру в действии.

В данном репозитории используется фреймворк Vue ![Vue](./images/Vue.png).

Также приложение реализовано на фреймворках React ![React](./images/React.png) и
Angular ![Angular](./images/Angular.png) (в других моих репозиториях).

### 1.2 Про приложение

Само приложение представляет собой SPA ![SPA](./images/SPA.png) приложение для заметок.

Каждая заметка имеет название и список задач. Каждая
задача имеет текст и чекбокс, говорящий о её завершённости.

На главной странице показано количество заметок.

На странице "Все заметки" показан список всех заметок. У каждой заметки показано только 3 первые задачи. Можно открыть
заметку и посмотреть все задачи в ней.

На странице "Новая заметка" можно создать заметку: ввести заголовок заметки, добавить задачи, ввести их заголовки и их
статус - завершённые или нет.

Также заметку можно отредактировать, изменяя данные в ней. При сохранении изменений или удалении заметки появляется
модальное окно с подтверждением действия.

Заметки сохраняются в Local Storage браузера.

Также при создании новой заметки или редактировании существующей имеется возможность выполнить отмену/повтор последних
действий.

### 1.3 Стили

Для стилизации используется библиотека Bootstrap ![Bootstrap](./images/Bootstrap.png).

### 1.4 Язык программирования

Приложение написано на языке Typescript ![Typescript](./images/Typescript.png).

### 1.5 Фреймворк

Фронтенд-фреймворк - Vue ![Vue](./images/Vue.png).

## 2. Настройка приложения с нуля ![Setting](./images/Setting.png)

### 2.1 Создать папку **todos_react**

### 2.2 Создать приложение vue

* **vue create todos_vue**

### 2.3 Установить зависимости

* **npm i -D prettier** ![Prettier](./images/Prettier.png)
* **npm i -D eslint-config-prettier eslint-plugin-prettier** ![ESLint](./images/ESLint.png)

* **npm i -D @types/node**

* **npm i bootstrap@5.3.0-alpha1**
* **npm i bootstrap-icons**

* **npm i first-di**
* **npm i class-validator**
* **npm i reflect-metadata**
* **npm i ts-serializable**
* **npm i typeorm**

* **npm i axios**

* **npm i -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties**
* **npm i -D @vue/babel-plugin-jsx**
* **npm i vue-property-decorator**

### 2.4 Добавить в файл .eslintrc.js:

```
module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {
    ...
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  },
}
```

### 2.5 Создать файл .prettierrc и добавить в него:

```
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid"
}
```

### 2.6 В файле babel.config.js включить:

```
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [
        ["@babel/proposal-decorators", { legacy: true }],
        ["@babel/proposal-class-properties", { loose: true }],
        ["@vue/babel-plugin-jsx"]
    ]
};
```

### 2.7 В файле tsconfig.json включить:

```
{
  "compilerOptions": {
    "emitDecoratorMetadata": true, // Позволяет генерировать рефлексию
  }
}
```

### 2.8 В IDE ![IDE](./images/IDE.png) включить опции:

#### Settings/Languages & Frameworks/Javascript/Prettier:

* Prettier package: выбрать текущий каталог - **...\node_modules\prettier**
* поставить галочку - **On 'Reformat Code' action**
* поставить галочку - **On save**

#### Settings/Tools/Action on Save:

* поставить галочку - **Reformat code**
* поставить галочку - **Run eslint --fix**

### 2.9 Создать файл ./src/main.css.

### 2.10 Добавить в файл ./src/main.ts:

```
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import './main.css';
```

### 2.11 Настройка тестов

2.11.1 Установить зависимости:

* **npm i -D cross-env**
* **npm i ts-node**
* **npm i -D @babel/core**
* **npm i -D @babel/preset-env**
* **npm i -D eslint-plugin-cypress**
* **npm i vue-template-compiler**
* **npm i -D @vue/vue3-jest**

2.11.2 Добавить в файл package.json:

```
  "scripts": {
    ...
    "test_e2e": "cypress open",
    "test_jest": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test": "cross-env NODE_OPTIONS='--experimental-vm-modules' npx jest",
  }
```

2.11.3 Добавить в файл tsconfig.json:

```
{
  "compilerOptions": {
    "rootDirs": [
      "src"
    ],
    "outDir": "dist",
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "incremental": true,
    "allowJs": true,
    "types": [
      "node",
      "@types/jest",
      "cypress"
    ]
  },
  "ts-node": {
    "esm": true,
    "experimentalSpecifierResolution": "node"
  }
}
```

2.11.4 Изменить расширение файла jest.config.js на .ts и изменить его содержимое на:

```
// @ts-ignore
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: [".ts"],
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest"
  },
  testPathIgnorePatterns: ["./dist", "/cypress"],
  setupFiles: ["<rootDir>/tests/test-setup.ts"]
};

export default config;
```

2.11.5 Добавить в файл babel.config.js:

```
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset", "@babel/preset-env"],
```

2.11.6 Добавить в файл .eslintrc.js:

```
module.exports = {
  extends: [
    "plugin:cypress/recommended",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  },
  globals: {
    cy: true
  }
};
```

2.11.7 Обновить библиотеки до последних версий:

* **npm i -D cypress**

2.11.8 Запустить e2e тесты и настроить файлы cypress:

* **npm run test_e2e**

2.11.9 Запуск тестов:

* **npm run test**
  или
* **npm run test_jest**
