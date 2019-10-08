[TOP]({{ site.reseturl }}) > PyQt5 TerrainViewer

[ソースコード](https://github.com/pto8913/PyQt5-s-tools/tree/master/Topographic%20map)

これは古い試作のソースコードです。
一部、研究に使用しているので変更後のコードは後々載せます。

# TerrainViewer
2019/09/30/14:13 pto8913

## 説明
[国土地理院](https://www.gsi.go.jp/)の[基盤地図情報](https://www.gsi.go.jp/kiban/index.html)から3D地図を作成し、その地図を誰でも使えるようにしたものです。<br>
別に3D地図じゃなくてもいいよという人もとりあえず見ていってください

## 注意
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
* [Terrain Viewer](https://drive.google.com/drive/folders/1EPOMkTa7HIAl18NlbDvFNC0UmdzbCIhz?usp=sharing)

## ディレクトリ構成
![ディレクトリサンプル]()

[トップページに戻る]({{ site.reseturl }})