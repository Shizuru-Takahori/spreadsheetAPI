# spreadsheetAPI
Jsonをpostし､指定したスプレッドシートに書き込んだり読み込んだり出来ます｡
</br>
</br>
# インストール
1. GoogleAppsScriptに保存し､Webアプリとしてデプロイします｡</br>URLは控えておいてください｡</br>
2. GoogleDriveにフォルダ"spreadsheetApi"を作成します｡
3. 作成したフォルダに任意のスプレッドシートファイルを保存しておきます

</br>

# 使い方
デプロイしたURLにJsonでポストします｡
書き込みの場合
1. "fileName"にspreadsheetApiフォルダ下の任意のスプレッドシート名を入れます｡
2. "command"に"write"を指定します｡
3. "data"に書き込みたい値を入れます｡
</br>

```
{"fileName" : "spreadsheet1",
    "command" : "write",
    "data":[
        {"data1": "value00", "data2": "value01" },
        {"data1": "value10", "data2": "value11", "data3": "value12"}
```
        
        
        

        
</br>
読み込みの場合
読み込みの場合は"command"に"read"を入れてください｡
</br>

```
{"fileName" : "spreadsheet1",
    "command" : "read",}
```
