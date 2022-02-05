# spreadsheetAPI
Jsonをpostし､指定したスプレッドシートに書き込んだり読み込んだり出来ます｡</br>
</br>
詳しい情報はこちらから</br>
https://qr.ae/pGEVqB</br>
</br>
</br>
# インストール
1. GoogleAppsScriptに保存し､Webアプリとしてデプロイします｡</br>URLは控えておいてください｡</br>
2. GoogleDriveにフォルダ"spreadsheetApi"を作成します｡
3. 作成したフォルダに任意のスプレッドシートファイルを保存しておきます

</br>

# 使い方
デプロイしたURLにJsonでポストします｡</br>

### [書き込みの場合]</br>

1. "fileName"にspreadsheetApiフォルダ下の任意のスプレッドシート名を入れます｡
2. "command"に"write"を指定します｡
3. "data"に書き込みたい値を入れます｡
</br>
</br>
実行例
</br>

```
 {"fileName" : "spreadsheet1",
    "command" : "write",
    "data":[
        {"data1": "value00", "data2": "value01" },
        {"data1": "value10"},
        {"data2": "value31", "data3": "value32", "data1": "value30"}]}
```

</br>
結果

```
	{ result: 'sucess',
  url: 'https://docs.google.com/spreadsheets/d/1fSPRAUEtgPrTpdXWLk-dtkU39HYqIgees4QjRrkECXM/edit?usp=drivesdk',
  data: [ '[["value00","value01","",""],["value10","","","value13"],["value30","value31","value32",""]]' ] }
```

![image](https://user-images.githubusercontent.com/97940779/152639271-6b1f09fa-1616-4f3a-a39a-04a6dc45e38f.png)

        
</br>
</br>

### [読み込みの場合]</br>

読み込みの場合は"command"に"read"を入れてください｡</br>
</br>
</br>
実行例
</br>

```
{"fileName" : "spreadsheet1",
    "command" : "read"}
```

</br>
結果

```
	{ result: 'sucess',
  url: 'https://docs.google.com/spreadsheets/d/1fSPRAUEtgPrTpdXWLk-dtkU39HYqIgees4QjRrkECXM/edit?usp=drivesdk',
  data: [ '[{"data1":"value00","data2":"value01","data3":"","data4":""},{"data1":"value10","data2":"","data3":"","data4":"value13"},{"data1":"value30","data2":"value31","data3":"value32","data4":""}]' ] }
```

</br>
</br>

### [ファイル一覧を取得する場合]</br>

spredsheetApiフォルダ内のスプレッドシート一覧を取得する場合は"fileName"を空にします｡</br>
</br>
</br>
実行例
</br>

```
 {"fileName" : "",
    "command" : ""};
```

</br>
結果

```
	{ result: 'fileName error, no exist this file. fileName :',
  url: 'error',
  data: [ '[{"spredsheet2 のコピー":"https://docs.google.com/spreadsheets/d/1MjtWrOcpxhafZZhI4KWAlTppVPoZrKUbHDkD3YSU-bE/edit?usp=drivesdk"},{"spredsheet2":"https://docs.google.com/spreadsheets/d/1NOppUmiUL0jClENvjR5684C8BZ2K8GTJ_K5zgsdfH5k/edit?usp=drivesdk"},{"spreadsheet1":"https://docs.google.com/spreadsheets/d/1fSPRAUEtgPrTpdXWLk-dtkU39HYqIgees4QjRrkECXM/edit?usp=drivesdk"}]' ] }
```
