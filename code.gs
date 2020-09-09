function registerAnswer(e){
  var postRecord = {};
  var title;
  var content = '';
  
  var items = e.response.getItemResponses();
  for (var index = 0; index < items.length; index++) {
    var item = items[index];
    var question = item.getItem().getTitle();
    var answer = item.getResponse();

    if (question == "タイトル") {
      postRecord["title"] = {"value" : answer};
      title = answer;
    } else if (question == "商品名") {
      postRecord["body"] = {"value" : answer};
      content += '商品名' + answer + "\n";
    } else if (question == "値段") {
      postRecord["body"] = {"value" : answer};
      content += '値段' + answer + "\n";
    } else if (question == "本文") {
      postRecord["body"] = {"value" : answer};
      content += '説明' + answer + "\n";
    } else {
      postRecord[question] = {"value" : answer};
    }
  }
  
  // 送信先URL
  var urlPost = "<<URL>>/wp-json/wp/v2/posts";
  // トークン
  var apiToken = "<<TOKEN>>";
  var headers = {
    'Authorization': 'Bearer '+ apiToken
  };

  var postData = {
    "title": postRecord["title"],
    "content": postRecord["body"]
  };
  
  var options = {
    'method': "POST",
    'headers': headers,
    'payload': {'title':title,'content':content},
    'muteHttpExceptions': true
  };

  var response = UrlFetchApp.fetch(urlPost, options);
}
