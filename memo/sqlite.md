[TOP]({{ site.reseturl }}) > SQLite

# SQLiteの知見
2019/10/08/23:47 pto8913

## 注意
基本的に`python`でコード例を示します。(見やすいので)<br>
[自作のSQLiteViewer]({{ site.PyQturl }}/SQLiteViewer)を使っているので見づらいかもしれません。ごめんなさい<br>

## 主キー

```python
import sqlite3

conn = sqlite3.connect("test.db")
cur = conn.cursor()

cur.execute("create table user(id integer primary key, name text)")

cur.execute("insert into user(name) values('yama')")
cur.execute("insert into user(name) values('kawa')")
conn.commit()
```

![1]({{ site.reseturl }}/image/sqlite3/primary.png)

こんな感じで`INTEGER型のカラム`に主キーを設定すると __連番を追加してくれる__<br>

## 複数の行を1行のINSERT文で追加

### SQLの場合
(SQLite3.7.11以降)

```SQL
insert into user(name)
values("huu"), ("rin"), ("ka"), ("zan"), ("rupan");
```

### pythonの場合

一つのカラムのものを追加するときはこんな風に書く

```python
dataset = [("huu",), ("rin",), ("ka",), ("zan",), ("rupan",)]
cur.executemany("insert into user(name) values(?);", dataset)
conn.commit()
```

![2]({{ site.reseturl }}/image/sqlite3/execmany.png)<br>

めんどくさい・・・<br>

二つ以上の場合<br>

```python
dataset = [item for item in zip(*nanika)]
cur.executemany("insert into hoge(a, b, c) values(?, ?, ?)", dataset)
conn.commit()
```

`zip`してやることでタプルで要素をくくってくれる<br>
例えば

```python
a = [[1, 2], ["inu", "neko"]]
for item in zip(*a):
  print(item)

# - output -
# (1, inu)
# (2, neko)
```

なお、 __配列の長さが違うときは短いほうと同じ長さになるので注意__

## ドロップテーブルをしてもファイルのサイズが変わらない

ドロップテーブル前<br>

![3]({{ site.reseturl }}/image/sqlite3/before.png)<br>

```python
cur.execute("drop table user;")
```

実行後<br>

![4]({{ site.reseturl }}/image/sqlite3/after.png)<br>

![5]({{ site.reseturl }}/image/sqlite3/pray.png)<br>

### 解決

```python
conn.execute("vacuum")
```
![5]({{ site.reseturl }}/image/sqlite3/fin.png)<br>

### SQLiteの中で起こっていること
ファイルの中を全探索して圧縮できる部分を探し圧縮している。<br>
なのでファイルが大きくなればなるほど、時間がかかる<br>
<br>

[トップページに戻る]({{ site.reseturl }})
