[TOP]({{ site.reseturl }}) > PyQt5 SQLiteViewer

# SQLiteViewer
2019/09/05/12:45 pto8913

[コードの詳細な説明]({{ site.PyQturl }}/SQLiteViewerDetails)

![SQLiteViewer]({{ site.reseturl }}/image/DBViewerQuery.png)

[ダウンロード(GoogleDriveに飛びます)](https://drive.google.com/open?id=1X_UPObRyp5KzBHq8z3nXidQAvBf2NNzB)
[ソースコード](https://github.com/pto8913/PyQt5-s-tools/tree/master/DBViewer)

## 対応

* SQLite3

## ディレクトリ構成

```PlainText
├── DB_dir
│   ├── database_file
│
└── DBViewer_dir
    ├── DBViewer.py
    └── DBViewer_dir
        ├── DBViewerUI.py
        ├── myfunc.py
        └── DBViewerThread.py
```

## 使い方

データベースファイル(画像一番左)をダブルクリックすると
そのデータベースのテーブルが(画像真ん中に)表示されます。

クエリの実行は画面右下の
* `Execute`ボタンか
* `Ctrl + Enter`で行えます。

クエリを選択して実行することもできます。
クエリを選択せずに実行すると一番下のクエリが実行されます。
<br>

# クエリの種類

SQLite3でできることはほぼすべてできるはずです<br>
追加で`create database name`でデータベースファイルを作れます。

<details>
<summary> クエリ例 </summary>

例
```SQL
pragma foreign_keys = 1;

create table user(id integer, name text);
// create table user(id integer default 1, name text default 'no value')

insert into user(id, name) values(1, pto);

alter table user add column mail text;
// alter table user rename to friends;

SELECT * FROM user;

update user set id = 2 where name = 'pto';

delete from user where id = 2;

drop table user;
```
</details>

## データベースファイルの追加

画像一番左の部分に
* ドラッグアンドドロップ
* `Add`ボタンをクリック
* `Ctrl + O`で行えます。
<br>

## データベースファイルの削除

すべて消したい場合は
* `Clear`ボタンか
* `Ctrl + W`で行えます。

任意の一つを消したい場合は消したいものを選択し
* `Delete`ボタンか
* `Delete`で行えます。

Deleteをする際にリストから消すかPC上から消すか聞かれます。
* `Yes`を押すと**リストから**
* `No`を押すと**PC上から消えます**
* `Cancel`を押すと**Deleteを取り消します**
<br>

## 終了

* `Exit`ボタンか
* `Escape`で行えます。
<br>


[トップページに戻る]({{ site.reseturl }})
