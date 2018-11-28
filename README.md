# TranslateGO
## 純前端多語系輔助工具
### npm網址：https://www.npmjs.com/package/translate-go
### git網址：https://github.com/babyblue94520/translate-go
### 快速建立翻譯資源檔：https://babyblue94520.github.io/translate-go/dist/
#### 前言

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本身是Java後端開發工程師，碰過一些多語系的架構設計，老實說真的很麻煩，很多前後端程式都必須依賴原開發專案多語架構下去開發，就連原本沒有多語系的專案要導入多語系，也需要大改，於是開發這個純前端的多語套件，只要 TranslateGO.js加上自行翻譯的語言包，就可以讓專案有多語的功能，如果要做多語SEO的專案就不太適合喔！


#### 目的

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;利用TranslateGO快速搜尋需要被翻譯的文字，再利用[TranslateGO ToolBar](https://babyblue94520.github.io/translate-go/dist/)快速製作多語系JS檔、TS檔。  

## 一. 安裝
在自己的網站需要翻譯的頁面，增加以下程式碼：

### JavaScript

直接下載，放進專案目錄。

__一般使用__

	<script type="text/javascript" src="js/translate-go.min.js"></script>
	<script type="text/javascript">
		// 開發模式
		TranslateModule.TranslateConfig.dev = true;

		// 預設使用語系
		TranslateModule.TranslateConfig.defaultLanguage = 'zh_TW';
		var translateGO = TranslateModule.getTranslateGO();
		// 開始監聽
		translateGO.start();
	</script>

__開發模式__

	<script type="text/javascript" src="js/translate-toolbar.js"></script>
	<script type="text/javascript" src="js/translate-go.min.js"></script>
	<script type="text/javascript">
		// 開發模式
		TranslateModule.TranslateConfig.dev = true;
		// 預設使用語系
		TranslateModule.TranslateConfig.defaultLanguage = 'zh_TW';
		// 取得TranslateGO 
		var translateGO = TranslateModule.getTranslateGO();
		// 開始監聽
		translateGO.start();
		// 產生translate-toolbar element
		if(TranslateModule.TranslateConfig.dev){
			document.body.appendChild(docuemnt.createElement('translate-toolbar'));
		}
	</script>
    
### Angular TypeScript

安裝

	npm install translate-go@latest

__一般使用__

__任意開始 *.ts__ ex: app.module.ts

	import { getTranslateGO,TranslateConfig } from 'translate-go';

	// 預設使用語系
	TranslateConfig.defaultLanguage = 'zh_TW';
	let translateGO = getTranslateGO();
	// 開始監聽
	translateGO.start();

__開發模式__

__angular.json__

	"architect": {
        "build": {
            "scripts": [{
              "input": "node_modules/translate-go/lib/translate-toolbar.js"
            }]
          },

__任意開始 *.ts__ ex: app.module.ts

	import { getTranslateGO,TranslateConfig } from 'translate-go';

	// 開發模式
	TranslateConfig.dev = true;
	// 預設使用語系
	TranslateConfig.defaultLanguage = 'zh_TW';
	// 取得TranslateGO 
	let translateGO = getTranslateGO();
	// 開始監聽
	translateGO.start();
	// 產生translate-toolbar element
	if(TranslateModule.TranslateConfig.dev){
		document.body.appendChild(docuemnt.createElement('translate-toolbar'));
	}

## 二. 蒐集需要翻譯字串  

在開發模式下，左下角會出現工具列，利用該工具編輯翻譯檔

1. __語系下拉選單__:  
	* 列出目前有的翻譯資料語系，切換可轉換語系。


2. __Start__:  
	* 進入開發模式，開始蒐集無法翻譯的資料。
	* 開始監聽DOM insert、modify和remove事件並翻譯。


3. __Stop__:  
	* 關閉開發模式，停止蒐集無法翻譯的資料。
	* 停止監聽DOM insert、modify和remove事件。


4. __Refresh__:  
	* 載入window底下__translateGO_開頭的翻譯資料到 __Tool__。
	* 列出無法翻譯的資料到 __Tool__ 裡。
	* 將 __Tool__ 裡編輯好的翻譯資料載入到 __TranslateGO__。
	

5. __Tool__:  
	* 開啟編輯翻譯資料頁面。


## 三. 加載部分翻譯檔案

加載已產生的翻譯資料，反覆搜尋是否有遺漏的。

__JavaScript__

	<script type="text/javascript" src="js/translate-go.min.js"></script>
    <script type="text/javascript" src="js/TranslateSourceAll.js"></script>
	<script type="text/javascript">
		// 預設使用語系
		TranslateConfig.defaultLanguage = 'zh_TW';
		// 取得TranslateGO 
		var translateGO = TranslateModule.getTranslateGO();
		// 載入翻譯資料
    	translateGO.reload(TranslateSourceAll);
		// or
		// 將自動載入所有在window.__translateGO_開頭的翻譯資料
    	translateGO.reload();
        // 開始監聽
		translateGO.start();
	</script>
    
__TypeScript__

	import { getTranslateGO,TranslateConfig } from 'translate-go';
	import { TranslateSourceAll } from 'ts/translate/TranslateSourceAll';

	// 預設使用語系
	TranslateConfig.defaultLanguage = 'zh_TW';
	// 取得TranslateGO 
	let translateGO = getTranslateGO();
	// 載入翻譯資料
	translateGO.reload(TranslateSourceAll);
	// or
	// 將自動載入所有在window.__translateGO_開頭的翻譯資料
	translateGO.reload();
	// 開始監聽
	translateGO.start();
	
## 四. 開始使用:

__JavaScript__ 

	<script type="text/javascript" src="js/translate-go.min.js"></script>
    <script type="text/javascript" src="js/TranslateSourceAll.js"></script>
	<script type="text/javascript">
    	// 用英文語系最明顯，true:產生右下角的toolbar
		var translateGO = TranslateModule.getTranslateGO();
        // 加載翻譯資料
    	translateGO.reload();
		// 開始監聽
		translateGO.start();
        
		// 其他使用方式
        var testText = translateGO.getText('測試');// return 'test';
        // or
        var testText = translateGO.getTextByKey('testKey');// return 'test';
        // or
        var testText = TranslateSourceAll['testKey']['zh_TW'];
	</script>

__TypeScript__ 

	import {  getTranslateGO,TranslateConfig } from 'translate-go';
	import { TranslateSourceAll } from 'ts/translate/TranslateSourceAll';

	// 預設使用語系
	TranslateConfig.defaultLanguage = 'zh_TW';
	// 取得TranslateGO 
	let translateGO = getTranslateGO();
	// 加載翻譯資料
	translateGO.reload();
	// 開始監聽
	translateGO.start();

	// 其他使用方式
	let testText = translateGO.getText('測試');// return 'test';
    // or
    let testText = translateGO.getTextByKey('testKey');// return 'test';
    // or
    let testText = TranslateSourceByLang.testKey.zh_TW;


__JavaScript偷懶步驟__： 

	var source = document.createElement('script');
	source.src = 'https://babyblue94520.github.io/translate-go/lib/translate-toolbar.js';
	source.onload = function(){
		document.body.appendChild(document.createElement('translate-toolbar'));
	}
	document.head.appendChild(source);
    
	
## TranslateGO功能以下：

1. translate：  
  	直接翻譯語言包裡有的文字。
    
		translateGO.translate('zh_TW');

2. start  
  	監聽所有DOM增加、減少和改變的事件，動態翻譯文字。  
    
 		translateGO.start();

3. stop：  
  	停止監聽DOM insert、modify和remove事件。  
	
 		translateGO.stop();
		
4. reload  
 	
		translateGO.reload({key:{""zh-TW"":"text"}});

5. getText：  
	取得當前語系的文字。  

		translateGO.getText('Test');//return '測試';
    
6. getTextByKey：  
  	依Key取得當前語系的文字。  
 	
 		translateGO.getTextByKey('key');//return '測試';

7. getLanguage：  
  	取得當前語系。  
 	
 		translateGO.getLanguage();//return 'zh-TW';

8. getNonTranslateText：  
  	取得無法翻譯的資料，搭配[快速建立翻譯資源檔](https://babyblue94520.github.io/tratranslate-go/dist/)，快速建立翻譯檔。  
 	
 		translateGO.getNonTranslateText();//return {"zh-TW":{"key":"text"}};
    

## 相容性：
1. 目前支持到IE9

## 其他：
1. 設定不需要翻譯的區塊

	//不做翻譯區塊
	```
	<div notTranslate>
		<div>
			...
		</div>
	</div>
	```
	
2. 綁定翻譯Key

	```
	<div translateKey="test"></div>
	```

3. placeholder綁定翻譯Key

	```
	<input placeholderTranslateKey="test">
	```
