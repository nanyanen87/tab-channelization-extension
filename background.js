// shortcutが被ってたら使えないっぽい
chrome.commands.onCommand.addListener(function(command) {
  console.log(`Command: ${command}`);
});
