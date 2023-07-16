const title = document.getElementById("pageTitle");
const url = document.getElementById("pageURL");
const titles = document.querySelectorAll('.swtich_tabs')
// title.value = document.title;// タイトルを代入
// url.value = location.href;  //URLを代入

chrome.tabs.query({ 'currentWindow': true, 'lastFocusedWindow': true }, tabs => {

  document.querySelector(".switch_tab1").addEventListener("click",()=>{
    showCheck()
  }, false);
  tabs.forEach((tab, index) => {
    console.log(tab.url)
  })
  // title.value = tabs[0].title;
  // url.value = tabs[0].url;
});



function showCheck() {
  const switchBtns = document.getElementsByClassName('switch_tab1');
  const btn1 = switchBtns[0]
  btn1.setAttribute('style', 'background-color: yellow;')
}
