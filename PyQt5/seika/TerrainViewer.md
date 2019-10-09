[TOP]({{ site.reseturl }}) > PyQt5 TerrainViewer

# TerrainViewer(編集中)
最終更新: 2019/10/09/16:58 pto8913

## 説明
[国土地理院](https://www.gsi.go.jp/)の[基盤地図情報](https://www.gsi.go.jp/kiban/index.html)から3D地図を作成し、その地図を誰でも使えるようにしたものです。<br>

別に3D地図じゃなくてもいいよという人もとりあえず見ていってください<br>

__今は研究に使用しているためソースコードは載せられませんが、大学を卒業次第載せます__<br>
どうしても見たい人は、ツイッターのDMでもメールでも送ってください。用途を聞いて問題なければ見せるかもしれません。

## 対応
* GUI(PyQt5.13.1)版　配布中です (バグの修正、機能の追加中) <br>
* Unreal Engine4.19.2版　配布停止中です (バグ修正、機能の追加中)
の２つがあります。

(Unreal Engine 4 以下 UE4表記)

__現在(2019/10/09時点)ではGUI上UE4上どちらも動作を確認していますがGUI版のみ載せておきます__
__UE4版は完成し次第載せます__<br>
(配布時に動かない可能性や、バグの修正、機能の追加が残っているので。)

## 確認されているバグ

### GUI版
* ファイルの欠損がある場合、うまく地図が表示されないことがある。
* 

### UE4版
*

## 修正中、追加中

### GUI版
* `Water Area` <- 進行中、`Building`、`Road Way`の追加 
* 地図の表示

### UE4版
*

## 注意
バージョンの管理が下手なので今配布しているものがどういったバグがあったか忘れている場合があります。

__これは個人で使用することを想定したものです__。<br>
それ以外で使用する場合は[国土地理院](https://www.gsi.go.jp/)のほうで、使用上の注意、などをよく読んで使ってください

## 使用するデータ
> 地形図のみを見たい人
* [国土地理院 基盤地図情報 数値標高データ 5mメッシュ](https://fgd.gsi.go.jp/download/menu.php) <br>
> 川や湖、建物があったほうがいい人
* [国土地理院 基盤地図情報 基本項目](https://fgd.gsi.go.jp/download/menu.php) <br>

データは2次メッシュ区切りになっているので対応するものを選ぶようにしてください。
<details>
<summary> 2次メッシュとは </summary>

緯度を40分(2/3度), 経度を1度で区画したもの(1次メッシュ)を <br>
さらに、縦横 8 x 8 の64分割したものです。<br>
ちなみに、2次メッシュを更に 10 x 10 に分割したものを3次メッシュといいます。

</details>

## 使用するもの
> 共通
* [xmlToDB](https://drive.google.com/drive/folders/1EPOMkTa7HIAl18NlbDvFNC0UmdzbCIhz?usp=sharing)
> 3D地図を見たい人
* [Unreal Engine4](https://www.unrealengine.com/ja/features)
> そうでない人
* [Terrain Viewer](https://drive.google.com/drive/folders/1EPOMkTa7HIAl18NlbDvFNC0UmdzbCIhz?usp=sharing)<br>
こちらを使う場合リンク先のフォルダ全体をダウンロードしてください。

## ディレクトリ構成
![ディレクトリサンプル]({{ site.reseturl }}/image/terview/dir.png)<br>
こんな感じになっているはずです。<br>
DBViewerはなくても大丈夫です。<br>
使いたい人は[こちら]({{ site.PyQturl }}/seika/SQLiteViewer)<br>

## 以下編集中なのでとりあえず使い方を載せておきます

ここから[国土地理院 基盤地図情報 数値標高データ 5mメッシュ](https://fgd.gsi.go.jp/download/menu.php)好きなところのデータをダウンロードしてきます。<br>

![1]({{ site.reseturl }}/image/terview/download.png) <br>

![2]({{ site.reseturl }}/image/terview/download2.png) <br>

ダウンロードの仕方はまとめてでも個別でもどれでもいいです。<br>
ダウンロードの際に、ログインとアンケートが表示されるのでログインし、アンケートに答えてください<br>

![3]({{ site.reseturl }}/image/terview/zip.png) <br>

ダウンロードする場所は`ダウンロードフォルダ`のままでお願いします __バグります__<br>
`zipファイル`がダウンロードされたと思います。解凍する必要はありません。<br>

ダウンロードが完了したら[xmlToDB](https://drive.google.com/drive/folders/1EPOMkTa7HIAl18NlbDvFNC0UmdzbCIhz?usp=sharing)を開きます。<br>
このとき自動で解凍し移動してくれます。<br>

![4]({{ site.reseturl }}/image/terview/convert.png) <br>

`Addボタン`で`xmlファイル`を追加するかディレクトリごとドラッグアンドドロップしてもらっても構いません<br>

`Startボタン`を押すか`Enterキー`を押すと`xmlファイル`から必要な情報を`terrain.db`に入れてくれます。<br>

変換中に処理を止めたい場合は`Cancelボタン`を押してください。<br>

処理が終わると`Log`かウィンドウの下に`finished convert`の文字が表示されます<br>
処理が終わるまでコーヒーでも飲んでおいてください<br>

## GUIアプリ上で3D地図を見たい人はこちら

`xmlToDB`と同じフォルダに[Terrain Viewer](https://drive.google.com/drive/folders/1EPOMkTa7HIAl18NlbDvFNC0UmdzbCIhz?usp=sharing)があるはずです。
それを開いて<br>
`lc_lat`地図左下の緯度<br>
`lc_lon`地図左下の経度<br>
`uc_lat`地図右上の緯度<br>
`uc_lon`地図右上の経度<br>
を入力して`start`ボタンを押すだけです。<br>

なお、`xmlToDB`で`dbファイル`の名前を`terrain`から変更している場合はそのファイル名に変えてください。<br>

`Log`に表示されたものを`ダブルクリック`すると自動で緯度経度を入力してくれるので活用してください。<br>
`エラーメッセージ`が表示された場合[ここ](https://github.com/pto8913/pto8913/issues)にメッセージの内容と、状況を書いて教えてください、説明が難しい場合はスクリーンショットを貼ってください。<br>
`Log`に表示されたものは`Ctrl+C`でコピーすることができるので使ってください。<br>

## UE4 上で3D地図を見たい人
__UE4版は完成し次第載せます__

## 出発地点のバージョン

[ソースコード](https://github.com/pto8913/PyQt5-s-tools/tree/master/Topographic%20map)

これは古い試作のソースコードです。<br>
ここからかなり進化してるのでコードを見たい人はお楽しみに。

## 試作との違い

### 試作
* 決められた範囲をつなぎ合わせて地図を表示 <br>
* jsonとテキストにデータを保存してそこから呼び出す <br>

### 作成中 
* 範囲自由で地図を見られる(ただし形は四角固定) <br>
* DBにデータを保存してそこから呼び出す <br>

試作品のほうは速度は速いが自由度が低い。<br>
作成中のものは逆に速度は遅いが自由度は高め。 <br>

## 今後の構想
* UE4版の完成
* 呼び出せる範囲の解放 <br>
 -> 四角じゃなく自分で丸とか三角とか決められるようにしたい <br>
 　-> 構想としては、あらかじめ特定地域の地図を用意しておいて、<br>
      そこをユーザーがマウスや指で囲んで、なぞった場所から計算して描画 <br>
      ここまでやりたい。<br>
* 基本項目を用いてより実際の環境に近づける <- 進行中<br>
* 緯度経度を4つも入力するというのはかなり不便で、それらを改善する何かを探す<br>
地名から緯度経度を調べる方法があったりするので一段落したら試したい<br>
Googleマップとかなにかからスクレイピングしてるのかな?<br>
* データのよりよい受け取り方。呼び出し方の模索<br>
zipデータをダウンロードしてDBに移してという作業がめんどくさい。<br>
地理院タイルというものがあるが、UEC++から呼び出せるのか、呼び出せたとしても課題が山盛り。。。もっといい方法があるはず。<br>

## おわり
* 頭よわよわで、こういうの考えてるとすぐにバグって何すればいいかわかんなくなる。この不具合修正してほしい

[トップページに戻る]({{ site.reseturl }})