// 特定のページ対しておこわなわれるjs
// 主にユーザーインターフェースの変更や特定の要素の監視、ページ内の特定の操作の自動化などに使用される

let videos = document.getElementsByTagName('video');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.volume) {
    console.log(request.volume)
    switch (request.volume) {
      case 'up':
        volumeUp()
        break
      case 'down':
        volumeDown()
        break
    }
  }
});


function volumeUp() {
  if (videos[0].volume > 0.95) return
  videos[0].volume += 0.05;
}
function volumeDown() {
  if (videos[0].volume < 0.05) return
  videos[0].volume -= 0.05;
}
