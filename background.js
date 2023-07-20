// shortcutが被ってたら使えないっぽい
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
    if (command === "channel1") {
      chrome.tabs.update(tabs[0].id, {active: true});
    } else if (command === "next-ch") {
      chrome.tabs.update(tabs[nextIndex].id, {active: true});
      muteAllExcept(tabs[nextIndex].id);
    } else if (command === "previous-ch") {
      chrome.tabs.update(tabs[previousIndex].id, {active: true});
      muteAllExcept(tabs[previousIndex].id)
    } else if (command === "volume-up") {
      volumeUp(tabs[activeIndex].id);
    } else if (command === "volume-down") {
      // volumeDown(tabs[activeIndex].id);
    }
  });
});
// content-script.jsからのメッセージを受信
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message.video);  // "Hello, world!"
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
  // 特定のタブに対してコンテンツスクリプトを実行
  chrome.scripting.executeScript({
    target: {tabId: tabId},
    files: ['volume-up.js'],
  })
}
