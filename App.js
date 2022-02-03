//Jsonを受け取る関数
//参考 https://qiita.com/aromanokarisu/items/ff3076a78335163d2f12
function doPost(e){
  console.log('--start doPost--')
  const json = JSON.parse(e.postData.contents);

  console.log(json)
  const command = json.command;
  const fileName = json.fileName;

  //シート指定
  const url = GetSheet(fileName)

  //シートエラーの処理
  if(url == 'error'){
    var status = 'fileName error no exist ' + fileName;
    var data = GetAllSheets();
  }else{

    const spreadsheet = SpreadsheetApp.openByUrl(url);
    const sheet = spreadsheet.getSheets()[0];

    if(command == 'read'){

      var data = ReadSpreadsheet(json, sheet);
      var status = 'sucess'
    }else if(command == 'write'){
      var status = 'sucess'
      var data = WriteSpreadsheet(json, sheet);

    }else{
      var data = 'commands are [read] or [write]';
      var status = 'command error';
    }

  }


  //返信用Jsonを変換
  const payload = JSON.stringify(ReplyJson(data, status, url), null, '\t');

  console.log(payload)

  const ccOutput = ContentService.createTextOutput();
  ccOutput.setMimeType(ContentService.MimeType.Json)
  ccOutput.setContent(payload);

  console.log(ccOutput)

  return ccOutput
  

}

//スプレッドシートのURLを取得する関数
function GetSheet(fileName){

  console.log('シート名: ', fileName)

  const folderName = 'spreadsheetApi';
  const folderId = DriveApp.getRootFolder().getFoldersByName(folderName).next().getId();
  try{
    const file = DriveApp.getFolderById(folderId).getFilesByName(fileName).next();
    var url = file.getUrl();
  }
  catch(e){
    var url = 'error';
  }

  console.log('URL: ',url)

  return url
    
}

//スプレッドシートの一覧を取得する関数
function GetAllSheets(){
  const folderName = 'spreadsheetApi';
  const folderId = DriveApp.getRootFolder().getFoldersByName(folderName).next().getId();
  
  const mimeType = 'application/vnd.google-apps.spreadsheet';
  const files =DriveApp.getFolderById(folderId).getFilesByType(mimeType);

  const sheetFiles = [];

  while(files.hasNext()){
    let sheetFilesArray = {};

    let file = files.next();
    let fileName = file.getName();
    let sheetUrls = file.getUrl();
    
    sheetFilesArray[fileName] = sheetUrls;
    sheetFiles.push(sheetFilesArray)
  }

  return(sheetFiles)

}

//シートに書き込む関数
function WriteSpreadsheet(json, sheet){
  //jsonを配列に変換
  var data = json.data;
  var dataLength = 0;

  //dataを二次元配列に変換
  var dataArray = [];
  for(let i = 0; i<data.length; i++){
      dataArray[i] = Object.values(data[i]);
      
      //データの最大列を取得
      if (dataLength < dataArray[i].length){
      var dataLength = dataArray[i].length;
      }
      
  }

  //データの最大列に合わせて空データを追加
  for(let i = 0; i<dataArray.length; i++){
      if(dataArray[i].length < dataLength){
          for(let k = dataArray[i].length; k < dataLength; k++){
              dataArray[i].push("")
          }
      }
  }  

  console.log('データ列の長さ: ', dataLength)
  console.log('データ行の長さ: ', dataArray.length)

  //シート全体の最終行を取得
  const lastRow = sheet.getLastRow();
  console.log('シートの最終行: ', lastRow)

  //書き込み
  sheet.getRange(lastRow + 1, 1, dataArray.length, dataLength).setValues(dataArray)

  return dataArray

}

//シートを読み込む関数
//参考 https://qiita.com/void_vtuber/items/a0c81392ce57b49dbb61
function ReadSpreadsheet(json, sheet){

  const maxRow = sheet.getLastRow() - 1;
  const maxColumn = sheet.getLastColumn();

  //1行目からヘッダーを取得
  const keys = sheet.getRange(1, 1, 1, maxColumn).getValues();

  //シートから全データを取得
  const allData = sheet.getRange(2, 1, maxRow, maxColumn).getValues();

  const data = [];

  for(let r = 0; r < allData.length; r++){
      let rowData = {};

      for(let c = 0; c < maxColumn; c++){
      rowData[keys[0][c]] = allData[r][c];
      }

      data.push(rowData);
  }

  return data

}

//返信用Jsonを作る関数
function ReplyJson(data, status, url){

  const payload = {
      "result": status,
      "url": url,
      "data":  [JSON.stringify(data)]
    }

  return payload

}