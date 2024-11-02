// 원하는 키워드 설정
var keywords = ["테크놀로지", "AI", "경제"];

function searchGoogleNews() {
  var results = [];

  // 각 키워드에 대해 Google 뉴스 RSS 검색
  keywords.forEach(function(keyword) {
    var url = "https://news.google.com/rss/search?q=" + encodeURIComponent(keyword) + "&hl=ko";  // 한국어 뉴스만 검색
    var response = UrlFetchApp.fetch(url);
    var xml = response.getContentText();
    var document = XmlService.parse(xml);
    var root = document.getRootElement();
    var entries = root.getChild("channel").getChildren("item");

    // 최대 3건의 결과만 가져오기
    for (var i = 0; i < Math.min(entries.length, 3); i++) {
      var title = entries[i].getChild("title").getText();
      var link = entries[i].getChild("link").getText();
      results.push({title: title, link: link});
    }
  });

  // 결과 이메일 보내기
  sendEmail(results);
}

function sendEmail(results) {
  var recipient = "sample@gmail.com";  // 수신 이메일 주소
  var subject = "구글 뉴스 검색 결과";  // 이메일 제목
  var body = "";

  results.forEach(function(result) {
    body += result.title + "\n" + result.link + "\n\n";
  });

  // 이메일 전송
  MailApp.sendEmail(recipient, subject, body);
}
