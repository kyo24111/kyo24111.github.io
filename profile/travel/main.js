var element = document.getElementById('target'); // 移動させたい位置の要素を取得
var rect = element.getBoundingClientRect();
    var position = rect.top;    // 一番上からの位置を取得


//ボタン
const scroll_to_top_btn = document.querySelector('#btn_scroll_to_top');

//クリックイベントを追加
scroll_to_top_btn.addEventListener('click', function(){
    window.scrollTo({
        top: 10000,
        left: 300,
        behavior: 'smooth',
        position
    });
});


