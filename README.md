# TranslateGO
## 純前端多語系輔助工具
### npm網址：https://www.npmjs.com/package/translate-go
### git網址：https://github.com/babyblue94520/translate-go
### 快速建立翻譯資源檔：https://babyblue94520.github.io/translate-go-tool/dist/#/Index
#### 前言

#### (TranslateGO 舊前言)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本身是Java後端開發工程師，碰過一些多語系的架構設計，老實說真的很麻煩，很多前後端程式都必須依賴原開發專案多語架構下去開發，就連原本沒有多語系的專案要導入多語系，也需要大改，於是開發這個純前端的多語套件，只要 TranslateGO.js加上自行翻譯的語言包，就可以讓專案有多語的功能，如果要做多語SEO的專案就不太適合喔！

#### (TranslateGO 前言)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;這陣子開發Angular專案架構，我被Angular擊敗了，原本TranslateGO為了能達到即時翻譯Text物件，監聽DOMNodeInserted跟DOMSubtreeModified等事件，由於Angular渲染畫面時，先appendChild element，然後再給資料綁定的值，則會觸發了DOMNodeInserted、DOMSubtreeModified，想像*ngFor和資料綁定，TranslateGO就炸開了，於是將TranslateGO退為翻譯文字搜集器，協助翻譯資源的產生。  

#### 目的

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;利用TranslateGO快速搜尋需要被翻譯的文字，再利用[TranslateGO Tool](https://babyblue94520.github.io/translate-go-tool/dist/#/Index)快速製作多語系JS檔、TS檔。  

#### TranslateGO功能以下：

1. #### translate：

  	直接翻譯語言包裡有的文字。
 	
	translateGO.translate('en');

2. #### wacth：

  	監聽所有DOM增加、減少和改變的事件，動態翻譯文字。  

 	translateGO.watch();

3. #### stop：

  	停止wacth。  
 	
 	translateGO.stop();
		
4. #### loadLanguageData：  
 	
	translateGO.loadLanguageData({"zh-TW":{"key":"text"}});

5. #### getText：

  	取得當前語系的文字。  
 	
 	translateGO.getText('Test');//return '測試';
    
6. #### getTextByKey：

  	依Key取得當前語系的文字。  
 	
 	translateGO.getTextByKey('key');//return '測試';

7. #### getLanguage：

  	取得當前語系。  
 	
 	translateGO.getLanguage();//return 'zh-TW';

8. #### getNonTranslateText：

  	取得無法翻譯的資料，搭配[快速建立翻譯資源檔](https://babyblue94520.github.io/translate-go-tool/dist/#/Index)，快速建立翻譯檔。  
 	
 	translateGO.getNonTranslateText();//return {"zh-TW":{"key":"text"}};
    

#### 使用方式：

##### 步驟一 蒐集需要翻譯的文字：  
在自己的網站需要翻譯的頁面，增加以下程式碼：

	<script type="text/javascript" src="https://babyblue94520.github.io/translate-go/lib/translate-go.min.js">	</script>
	<script type="text/javascript">
    	// 用英文語系最明顯，true:產生右下角的toolbar
		var translateGO = new TranslateModule.TranslateGO('en',true);
        // 開始監聽
		translateGO.watch();
	</script>

##### 步驟二 左下角則會出現Toolbar：  
 
##### 1.下拉選單:  
列出目前有的翻譯資料語系，切換可轉換語系。

##### 2.start button:  
開始監聽DOM insert、modify和remove事件並翻譯。

##### 3.stop button:  
停止監聽DOM insert、modify和remove事件。

##### 4.open button:  
開啟TranslateTool視窗，第一次開啟回延遲2秒傳送無法翻譯的資料到翻譯資料欄位，以便開始製作翻譯資料。
	
##### 5.post button:  
傳送無法翻譯的資料到TranslateTool翻譯資料欄位，以便開始製作翻譯資料。


##### 步驟三 加載部分翻譯檔案：  

加載已產生的翻譯資料，反覆搜尋是否有遺漏的。

	<script type="text/javascript" src="https://babyblue94520.github.io/translate-go/lib/translate-go.min.js">	</script>
    <script type="text/javascript" src="http://selfhost/TranslateSource.js">	</script>
	<script type="text/javascript">
    	// 用英文語系最明顯，true:產生右下角的toolbar
		var translateGO = new TranslateModule.TranslateGO('en',true);
        // 加載翻譯資料
    	translateGO.loadLanguageData(TranslateSourceByLang);
        // 開始監聽
		translateGO.watch();
	</script>

##### 步驟四 開始使用:

JS使用範例：  

	<script type="text/javascript" src="https://babyblue94520.github.io/translate-go/lib/translate-go.min.js">	</script>
    <script type="text/javascript" src="http://selfhost/TranslateSource.js">	</script>
	<script type="text/javascript">
    	// 用英文語系最明顯，true:產生右下角的toolbar
		var translateGO = new TranslateModule.TranslateGO('en',true);
        // 加載翻譯資料
    	translateGO.loadLanguageData(TranslateSourceByLang);
        
        var testText = translateGO.getText('測試');// return 'test';
        // or
        var testText = translateGO.getTextByKey('testKey');// return 'test';
        // or
        var testText = TranslateSourceByLang['en']['testKey'];
	</script>

Angular TS使用範例：  

	import { TranslateGO } from 'translate-go';
	import { TranslateGoSourceWebByLang } from 'ts/translate/TranslateGoSourceWeb';


	if (environment.production) {
		enableProdMode();
	}

	if (!environment.production) {
		let translateGO = new TranslateGO('en', true);
		translateGO.loadLanguageData(TranslateGoSourceWebByLang);
		translateGO.watch();
	}


##### 偷懶步驟： 

	var source = document.createElement('script');
    source.src = 'https://babyblue94520.github.io/translate-go/lib/translate-go.min.js';
    source.onload = function(){
    	// 用英文語系最明顯，true:產生右下角的toolbar
		window.translateGO = new TranslateModule.TranslateGO('en',true);
        // 開始監聽
		window.translateGO.watch();
    }
    document.head.appendChild(source);
    
#### 其他：

1. #### 我是使用MUI - Material Design CSS Framework 設計畫面的。
	#### 網址：https://www.muicss.com/
	
2. #### 一般網站還是可以直接使用TranslateGO，效能還滿不錯的，第一次翻譯都會比較慢，可以開Console觀察就知道囉！
3. #### 大型框架(React、Vue、Angular)不能直接使用TranslateGO，遇到framework畫面渲染處理for loop就會有效能上的問題，除非自行for loop+createElement渲染畫面。(我處理過XD)
