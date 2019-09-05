[TOP]({{ site.reseturl }}) > PyQt5 SQLiteViewer SQLiteViewerDetails

[前に戻る]({{ site.PyQturl }}/SQLiteViewer)

# SQLiteViewerの詳細です

2019/09/05/11:57 pto8913 <br>

見ればわかるものは省略します<br>

# DBViewer.py部分

### クエリの判定

<details>
<summary> checkQueryType </summary>

```python
def checkQueryType(self, item):
  words = item.split(" ")
  words = self.__deleteSpa(words)
  print(words)
  funcType = words[0].lower()

  if funcType == ("select"):
    return 0

  if funcType in ("create", "drop"):
    if funcType == "create" and words[1].lower() == "database":
      self.CreateDB(words[-1].replace(";", ""))
      return 1

    res = self.CreatOrDropTable()
    if res:
      return 1
    return -2

  if funcType in ("pragma", "insert", "update", "delete", "alter"):
    res = self.UpdateList()
    if not res:
      return -2
    if not self.pre_query:
      return 1

    self.query = self.pre_query
  return -1
```

最初にクエリを単語に分解します `item.split(" ")` <br><br>

そうしてできた配列の先頭でクエリのタイプを分けます。<br><br>

* `select`なら`0`
* `create`, `drop`なら`1`、例外が発生した際は`-2`
* `update`, `insert`なら`1`、例外が発生した際は`-2`
* それ以外は`-1`
を返す。

</details>

## クエリの実行

<details>
<summary> execQuery </summary>

```python
def execQuery(self):
  if self.query == "select count(*) from table;":
    self.query = self.queryEdit.toPlainText().replace("\n", " ").split(" ")
    queries = self.__deleteSpa(self.query)
    self.query = " ".join(queries)

  if self.query.count(';') > 1:
    queries = self.queryEdit.toPlainText().replace("\n", " ").split(";")
    queries = self.__deleteSpa(queries)
    print(queries)
    self.query = queries[-1]

  if self.query != "select count(*) from table;":
    self.__isQueryChanged = True

  print(self.query)

  check = self.checkQueryType(self.query)
  # 0 : select ~
  if check == 0:
    res = self.modelSetUp()
    if not res:
      return False

    self.pre_query = self.query
    self.tree._MyTree__setup(self.__db_path, self.__header, self.query)

    if self.model:
      self.model.clear()
    self.modelSetUp()
    self.tree.setModel(self.model)

  # 1 : create, drop, pragma, delete, update, alter
  elif check == 1:
    QMessageBox.information(self, "Complete", "Finished change", QMessageBox.Ok)

  elif check == -1:
    print(self.query)
    QMessageBox.critical(
      self, 
      "Warning", 
      """Please check your query and send a pull request or issue to my repository <br>
          <a href="https://github.com/pto8913/PyQt5-s-tools"> pto8913/PyQt5-s-tools </a><br>
      """, 
      QMessageBox.Ok)
```

* クエリを受け取り、クエリがデフォルトから一度も変更されていなければ実行されない。<br><br>

* クエリの実行の際にクエリが二つ以上書かれているとクラッシュしてしまうため<br>
クエリが範囲選択で実行されていればその部分をクエリとして扱い、<br>
そうでない場合は一番後ろに書かれているクエリをクエリとして扱う。<br><br>

* `select`はデータの呼び出しをする際に、結果を表示するためのモデルを構築または再構築する必要がある。<br><br>

* `create`や`drop`はモデルの再構築は必要ないがテーブルやデータベースファイルの表示を変更する必要がある。<br>
`create`の次の単語が`database`なら新しくDBファイルを作成しDBリストの更新を行う。<br>
`table`や`drop`ならテーブルリストの更新を行う。<br><br>

* `update`や`insert`などは、モデルの再構築は必要だがモデルの見た目を変える必要がないためモデルの再構築のみを行う。<br>
DBファイルを更新したのちにモデルを再構築する。<br>
(なお、直前に実行したクエリが`select`以外ならモデルの再構築は行われない)<br><br>

</details>

## クエリの選択部分の取得

<details>
<summary> updateQuery </summary>

```python
def updateQuery(self):
  cursor = self.queryEdit.textCursor()
  if not cursor.hasSelection():
    self.query = "select count(*) from table;"
    return
  self.query = cursor.selectedText().replace("\u2029", "")
  if self.query.count(';') > 1:
    queries = self.query.split(";")
    queries = self.__deleteSpa(queries)
    self.query = queries[-1]
    self.query = self.query
```
</details>

## モデルの構築

<details>
<summary> モデルの構築 </summary>

```python
def __getHeader(self):
  self.connectDB(self.__db_path)

  try:
    self.cur.execute(self.query)
  except Error as e:
    QMessageBox.critical(self, "error", "{}".format(e), QMessageBox.Ok)
    self.closeDB()
    return False
  self.__header = []

  for d in self.cur.description:
    self.__header.append(d[0])
  
  self.closeDB()
  return True
  
def modelSetUp(self):
  if not self.query or not self.__isQueryChanged:
    return False

  res = self.__getHeader()
  if not res:
    return False

  self.model = QStandardItemModel(0, len(self.__header))
  self.__setHeader()
  return True

def __setHeader(self):
  for index, h in enumerate(self.__header):
    self.model.setHeaderData(index, Qt.Horizontal, h)
```

</details>

## テーブルリスト

<details>
<summary> getTables </summary>

```python
def __getTable(self):
  if self.__db_path is None:
    return
  self.connectDB(self.__db_path)
  self.cur.execute("select * from sqlite_master where type = 'table'")
  self.__tables = []
  while True:
    v = self.cur.fetchone()
    if v is None:
      break
    self.__tables.append(v[1])
  self.tableList.addItems(self.__tables)
  self.closeDB()
```
</details>

# DBViewerUI.py部分

## ドラッグアンドドロップ

<details>
<summary> DnD </summary>

```python
def dragEnterEvent(self, event):
  if event.mimeData().hasUrls():
    event.accept()
  else:
    event.ignore()

def dropEvent(self, event):
  urls = event.mimeData().urls()
  for url in urls:
    path = adjustSep(url.toLocalFile())
    tmp = path.split(".")
    if path in self.DBPathList:
      QMessageBox.warning(self, "Warning", "This file already in.", QMessageBox.Ok)
      continue
    if len(tmp) != 1:
      if inExtension(path, "db"):
        self.DBList.addItem(basename(path))
        self.DBPathList.append(path)
    else:
      self.__addDir(tmp[0])
```

</details>

## DBリストにファイルを入れる

<details>
<summary> addDir </summary>

```python
def __addDir(self, item):
  for roots, dirs, files in os.walk(item):
    for f in files:
      if inExtension(f, "db"):
        self.DBList.addItem(basename(f))
        self.DBPathList.append(adjustSep(roots + '/' + f))

    if len(dirs) != 0:
      for d in dirs:
        self.__que.append(d)
      return self.__addDir(self.__que.popleft())
  try:
    if len(self.__que) != 0:
      return self.__addDir(self.__que.popleft())
  except:
    return
```

DnDで入れられたディレクトリ(またはファイル)の中にあるDBファイルを再帰的に見つけ出す<br>

</details>

[上部に戻る](#SQLiteViewerの詳細です)

[前に戻る]({{ site.PyQturl }}/SQLiteViewer)

[トップページに戻る]({{ site.reseturl }})