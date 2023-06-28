# TranslateGO
## 純前端多語系輔助工具
### [NPM](https://www.npmjs.com/package/translate-go)

### [DEMO](https://babyblue94520.github.io/translate-go/dist/)

### [Toolbar DEMO](https://babyblue94520.github.io/translate-go/dist/lib/demo.html)

## 前言

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本身是Java後端開發工程師，碰過一些多語系的架構設計，老實說真的很麻煩，很多前後端程式都必須依賴原開發專案多語架構下去開發，就連原本沒有多語系的專案要導入多語系，也需要大改，於是開發這個純前端的多語套件，只要 __translate-go.js__ 加上自行翻譯的語言包，就可以讓專案有多語的功能！

## 目的

1. 
利用TranslateGO快速搜尋需要被翻譯的文字，再利用[TranslateGO ToolBar](https://babyblue94520.github.io/translate-go/dist/)快速製作多語系JS檔、TS檔。  

## 翻譯範圍

1. Text
2. Input placeholder
3. 

## 一. 安裝
在自己的網站需要翻譯的頁面，增加以下程式碼：

### JavaScript

直接下載，放進專案目錄。

__一般使用__

```JavaScript
<script type="text/javascript" src="js/translate-go.min.js"></script>
<script type="text/javascript">
  // 預設使用語系
  TranslateModule.translateConfig.defaultLanguage = 'zh-TW';
  var translateGO = TranslateModule.getTranslateGO();
  // 開始監聽
  translateGO.start();
</script>
```

__開發模式__

```JavaScript
<script type="text/javascript" src="js/translate-toolbar.js"></script>
<script type="text/javascript">
  // 預設使用語系
  TranslateModule.translateConfig.defaultLanguage = 'zh-TW';
  // 取得TranslateGO 
  var translateGO = TranslateModule.getTranslateGO();
  // 開始監聽
  translateGO.start();
  // 產生translate-toolbar element
  let toolbar = docuemnt.createElement('translate-toolbar');
  document.body.appendChild(toolbar);
</script>
```

### Angular TypeScript

安裝

```
npm install translate-go@latest
```

__一般使用__

__任意開始 *.ts__ ex: app.module.ts

```TypeScript
import { getTranslateGO,translateConfig } from 'translate-go';

// 預設使用語系
translateConfig.defaultLanguage = 'zh-TW';
let translateGO = getTranslateGO();
// 開始監聽
translateGO.start();
```

__開發模式__

__angular.json__

```json
{
  "architect": {
    "build": {
      "scripts": [{
        "input": "node_modules/translate-go/lib/translate-toolbar.js"
      }]
    }
  }
}
```

__切記正式環境設定要移除 scripts__

```json
{
  "configurations": {
    "production": {
      "scripts": []
    }
  }
}
```

__任意開始 *.ts__ ex: app.module.ts

```TypeScript
import { getTranslateGO,translateConfig } from 'translate-go';

// 預設使用語系
translateConfig.defaultLanguage = 'zh-TW';
// 取得TranslateGO 
let translateGO = getTranslateGO();
// 開始監聽
translateGO.start();
// 產生translate-toolbar element
document.body.appendChild(docuemnt.createElement('translate-toolbar'));
```

## 二. 翻譯工具列  

在開發模式下，左下角會出現工具列，利用該工具編輯翻譯檔

1. __▶ Start__:  
	* 開始監聽DOM insert、modify和remove事件並翻譯。

2. __● Stop__:  
	* 關閉開發模式，停止蒐集無法翻譯的資料。
	* 停止監聽DOM insert、modify和remove事件。
  * 還原成原本未翻譯的值

3. __✎ Tool__:  
	* 開啟編輯翻譯資料頁面。

4. __語系__:  
	* 列出目前有的翻譯資料語系，切換可轉換語系。

5. __❱ 展開__:  
	* 列出目前有的翻譯資料語系，切換可轉換語系。

6. __✖ 縮小__:  
	* 列出目前有的翻譯資料語系，切換可轉換語系。

## 三. 加載翻譯檔案

加載已產生的翻譯資料，反覆搜尋是否有遺漏的。

__JavaScript__

```JavaScript
<script type="text/javascript" src="js/translate-go.min.js"></script>
<script type="text/javascript">
  // 預設使用語系
  translateConfig.defaultLanguage = 'zh-TW';
  // 取得TranslateGO 
  var translateGO = TranslateModule.getTranslateGO();
  // 載入翻譯資料
  translateGO.load('zh-TW',{"Test":"測試"});  
  // 開始監聽
  translateGO.start();
  
  // 其他使用方式
  var testText = translateGO.get('{Test}');// return '測試';
</script>
```

__TypeScript__

```TypeScript
import { getTranslateGO,translateConfig } from 'translate-go';

// 預設使用語系
translateConfig.defaultLanguage = 'zh-TW';
// 取得TranslateGO 
let translateGO = getTranslateGO();
// 載入翻譯資料
translateGO.load('zh-TW',{"Test":"測試"});
// 開始監聽
translateGO.start();
// 其他使用方式
var testText = translateGO.get('{Test}');// return '測試';
```

## 四. 開始使用:

1. HTML

	```html
	<div>{Test}</div>
	<!--or -->
	<div translateKey="{Test}"></div>
	```

2. input placeholder

	```html
	<input placeholder="{Test}">
	```

3. input submit 

	```html
	<input type="submit" value="{Test}">
	```

4. 不需要翻譯的區塊

	```html
	<div notTranslate>
		<div>
	  <!--... -->
		</div>
	</div>
	```

5. Arguments

	```html
  <!--arg1 = true-->
  <div arg1="true">arg1 = {arg1}</div>
	```



## TranslateGO 功能：

[TranslateGO](src/translate-go/translate-go.ts)

1. __translate__

	直接翻譯語言包裡有的文字。
    
    ```JavaScript
    translateGO.translate('zh-TW');
    ```

2. __start__

	監聽所有DOM增加、減少和改變的事件，動態翻譯文字。  
    
    ```JavaScript
    translateGO.start();
    ```

3. __stop__

	停止監聽DOM insert、modify和remove事件。  
	
    ```JavaScript
    translateGO.stop();
    ```
		
4. __load__

	重新載入翻譯資料，如果沒有傳入翻譯資料，則自動載入當前 window.__translateGO_開頭的翻譯資料

    ```JavaScript
    translateGO.load("zh-TW",{"key":"text"});
    ```

5. __get__

	  取得當前語系的文字。  

    ```JavaScript
    translateGO.get('{Test}');//return '測試';
    ```

6. __getLanguage__

	  取得當前語系。  
 	
    ```JavaScript
    translateGO.getLanguage();//return 'zh-TW';
    ```

7. __addEventListener__

    監聽事件 [TranslateEvent](src/translate-go/translate.interface.ts)

  * __sourceLoaded__:

    在 __translateGO.load__ 時觸發。

  * __languageChanged__:
  
    在 __translateGO.translate__ 時，而且語系有改變，才觸發。

8. __setLanguageMapping__

    增加對應表，讓 __zh__ 也能使用 __zh-TW__ 的翻譯資源。

    ```JavaScript
    translateGO.setLanguageMapping({
      "zh":"zh-TW"
    });
    ```