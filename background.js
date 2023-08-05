// shortcutが被ってたら使えないっぽい
// キーイベントを監視する
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if (message.type === 'keydown') {
//     const keyCode = message.key;
//     console.log('入力されたキー番号: ', keyCode);
//   }
// });

chrome.commands.onCommand.addListener(function(command) {
  console.log(`Command: ${command}`);
  // アクティブなウィンドウのすべてのタブを取得
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    // 現在アクティブなタブのインデックスを取得
    let activeIndex = tabs.findIndex(tab => tab.active);
    // 次のタブのインデックスを計算（最後のタブの場合は最初のタブに戻る）
    let nextIndex = (activeIndex + 1) % tabs.length;
    // 前のタブのインデックスを計算（最初のタブの場合は最後のタブに戻る）
    let previousIndex = (activeIndex - 1 + tabs.length) % tabs.length;

    // 次のタブをアクティブにする
    switch (command) {
      case 'next-ch':
        muteAllExcept(tabs[nextIndex].id);
        activateTab(tabs[nextIndex].id);
        break;
      case 'previous-ch':
        muteAllExcept(tabs[nextIndex].id);
        activateTab(tabs[nextIndex].id);
        break;
      case 'volume-up':
        chrome.tabs.sendMessage(tabs[activeIndex].id, {volume: 'up'});
        // volumeUp(tabs[activeIndex].id);
        break;
      case 'volume-down':
        chrome.tabs.sendMessage(tabs[activeIndex].id, {volume: 'down'});
        // volumeDown(tabs[activeIndex].id);
        break;
    }
  });
});

function muteTab(tabId) {
  chrome.tabs.update(tabId, {muted: true});
}

function unmuteTab(tabId) {
  chrome.tabs.update(tabId, {muted: false});
}

function muteAllExcept(tabIdToExclude) {
  unmuteTab(tabIdToExclude)
  // アクティブなウィンドウのすべてのタブを取得
  chrome.tabs.query({}, function(tabs) {
    // 各タブに対して
    tabs.forEach(function(tab) {
      // 指定のタブ以外をミュートにする
      if (tab.id !== tabIdToExclude) {
        muteTab(tab.id);
      }
    });
  });
}

function activateTab(tabId) {
  chrome.tabs.update(tabId, {active: true});
}

// content-script.jsからvideoタグを取得して音量を変更する
function volumeUp(tabId) {
  chrome.tabs.sendMessage(tabId, {volume: 'up'});
  // 特定のタブに対してコンテンツスクリプトを実行
}
function volumeDown(tabId) {
  chrome.tabs.sendMessage(tabId, {volume: 'down'});
  // 特定のタブに対してコンテンツスクリプトを実行
}