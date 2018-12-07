# TranslateGO
## 純前端多語系輔助工具
### npm網址：https://www.npmjs.com/package/translate-go
### git網址：https://github.com/babyblue94520/translate-go
### DEMO：https://babyblue94520.github.io/translate-go/dist/

## 前言

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本身是Java後端開發工程師，碰過一些多語系的架構設計，老實說真的很麻煩，很多前後端程式都必須依賴原開發專案多語架構下去開發，就連原本沒有多語系的專案要導入多語系，也需要大改，於是開發這個純前端的多語套件，只要 TranslateGO.js加上自行翻譯的語言包，就可以讓專案有多語的功能，如果要做多語SEO的專案就不太適合喔！


## 目的

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;利用TranslateGO快速搜尋需要被翻譯的文字，再利用[TranslateGO ToolBar](https://babyblue94520.github.io/translate-go/dist/)快速製作多語系JS檔、TS檔。  

## 翻譯範圍

1. HTMLElement的innerText
2. Input placeholder
3. window.alert
4. window.confirm

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

直接打開Chrome DevTools 貼上下面程式碼

	var source = document.createElement('script');
	source.src = 'https://babyblue94520.github.io/translate-go/lib/translate-toolbar.js';
	source.onload = function(){
		document.body.appendChild(document.createElement('translate-toolbar'));
	}
	document.head.appendChild(source);
    
## 使用密技

1. 開啟要製作翻譯資料的網站，直接打開Chrome DevTools(F12)，貼上 __JavaScript偷懶步驟__ 執行。
2. 左下角工具列，點擊 __Start__ 開始蒐集需要翻譯文字
3. 點擊 __Tool__ ，將 __未處理__ 中要翻譯的文字，切換群組到 __All__
4. 新增所有需要的語系
5. 點擊有資料欄位上的 __列出__ ，將 __列出__ 上 __textarea__ 內的文字複製到 [Google翻譯](https://translate.google.com.tw/?hl=zh-TW) (__注__:每組文字都是換行隔開)
6. 翻譯成對象語系後，將翻譯後的資料直接複製到 __列出__ 上的 __textarea__ 並 __載入__
7. Key的部分必須為英文
8. 完成所有語系的文字翻譯後，點擊左下角工具列 __Refresh__ ,再點擊 __Tool__ 關閉視窗
9. 透過工具列上的 __語系下拉選單__ 切換當前語系
10. 翻譯資料製作完成後，透過 __Tool__ 內的下載功能，保存翻譯資料

## TranslateGO功能以下：

1. __translate__

	直接翻譯語言包裡有的文字。
    
		translateGO.translate('zh_TW');

2. __start__

	監聽所有DOM增加、減少和改變的事件，動態翻譯文字。  
    
 		translateGO.start();

3. __stop__

	停止監聽DOM insert、modify和remove事件。  
	
 		translateGO.stop();
		
4. __reload__

	重新載入翻譯資料，如果沒有傳入翻譯資料，則自動載入當前 window.__translateGO_開頭的翻譯資料

		translateGO.reload({key:{""zh-TW"":"text"}});

5. __getText__

	取得當前語系的文字。  

		translateGO.getText('Test');//return '測試';
    
6. __getTextByKey__

	依Key取得當前語系的文字。  
 	
 		translateGO.getTextByKey('key');//return '測試';

7. __getLanguage__

	取得當前語系。  
 	
 		translateGO.getLanguage();//return 'zh-TW';

8. __getNonTranslateText__

	取得無法翻譯的資料，搭配[快速建立翻譯資源檔](https://babyblue94520.github.io/tratranslate-go/dist/)，快速建立翻譯檔。  
 	
 		translateGO.getNonTranslateText();//return {"zh-TW":{"key":"text"}};
    

## Translate Toolbar功能介紹

1. __檔名&變數名稱前綴__

	__合併下載__ 的檔案名稱和變數名稱

2. __載入翻譯資源__

	點擊跳出視窗，貼上你下載的翻譯JS檔的內容並載入

3. __載入當前翻譯資源__

	自動載入當前 window.__translateGO_開頭的翻譯資料

4. __合併下載JS__

	將所有翻譯群組合併成一個 __*.js__ 檔案並下載

5. __合併下載TS__

	將所有翻譯群組合併成一個 __*.ts__ 檔案並下載

6. __檢查__

	檢查當前所有群組內是否有重複的Key

7. __新增語系__

	為目前所有群組的翻譯資料新增語系

8. __新增群組__

	將翻譯資料依類型設定群組，增加可維護性與檔案大小的切割

9. __切換群組__

	將該組翻譯資料設定到指定群組裡

10. __下載JS__

	將當前群組的翻譯資料，獨立下載成 __檔名&變數名稱前綴__ + __群組名稱.js__ 檔案

11. __下載TS__

	將當前群組的翻譯資料，獨立下載成 __檔名&變數名稱前綴__ + __群組名稱.ts__ 檔案

12. __刪除__

	刪除整個群組

13. __新增翻譯__

	在當前群組下，新增一組翻譯資料

14. __清除翻譯__

	清除當前群組所有翻譯資料

15. 表格欄位上的 __列出__

	將該欄的所以文字以 __換行__ 隔開，輸出在上面的 __textarea__

16. 表格欄位上的 __載入__

	將該欄的 __textarea__ 的內容，依順序更新到每個翻譯資料

## 相容性：
1. 目前translate-go支持到IE9
2. translate-toolbar只支持chrome

## 其他：
1. 就算是TS環境，也務必下載JS檔留存
2. 設定不需要翻譯的區塊

	//不做翻譯區塊
	```
	<div notTranslate>
		<div>
			...
		</div>
	</div>
	```
	
3. 指定翻譯Key

	```
	<div>TestKey</div>
	// or
	<div translateKey="TestKey"></div>

	```

4. placeholder指定翻譯Key

	```
	<input placeholder="TestKey">
	// or
	<input placeholderTranslateKey="TestKey">

	```
