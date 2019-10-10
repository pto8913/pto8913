[TOP]({{ site.reseturl }}) > PyQt5 SQLiteViewer SQLiteViewerDetails

[前に戻る]({{ site.PyQturl }}/SQLiteViewer)

# SQLiteViewerの詳細です(編集中)

2019/09/05/11:57 pto8913 <br>

## 注意
* かなり雑に実装したためツッコミどころが多いです。<br>
* ゴミのようなコードを見たくない人はすぐにブラウザバックをすることをお勧めします。<br>
* 命名規則がぐちゃぐちゃ、無駄な処理などなど。<br>
* コードをコピペしてるせいでインデント崩れてるかも(チェックはしてます)<br>

## 経緯
研究で`SQLite`を使う機会が増えたため息抜きがてら作成した。<br>
完成してから`DB Viewer for SQLite`の存在を知った。<br>
(先に調べろよ・・・)<br>

# DBViewer.py部分

## クエリの判定

```python
def checkQueryType(self, item: str) -> int:
    words = item.split(" ")
    words = self.deleteSpa(words)
    funcType = words[0].lower()

    if funcType == ("select"):
        return 0

    if funcType in ("create", "drop"):
        if funcType == "create" and words[1].lower() == "database":
            self.CreateDB(words[-1].replace(";", ""))
            return 1

        res = self.CreatOrDropTable(funcType)
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
        return 1
    return -1
```

最初にクエリを単語に分解します `item.split(" ")` <br><br>

そうしてできた配列の先頭でクエリのタイプを分けます。<br><br>

* `select`なら`0`を返す。<br>
* `create`や、`drop`などの、スキーマを変えたり、`insert`や`update`などのDBの中身を書き換えるものは`1`を返す。<br>
* クエリの実行中に例外が発生した場合、`-2`を返す。<br>
* 上記3つのどれにも当てはまらない場合に`-1`を返す。<br>
`self.query = self.pre_query`の部分は、DBの中身を更新した際に、テーブルが自動的に更新されているように見せるため、更新前に行ったクエリがあればそれを実行している。<br>

## クエリの実行1

```python
def execQuery(self):
    if self.query == "select count(*) from table;":
        self.query = self.queryEdit.toPlainText().replace("\n", " ").split(" ")
        queries = self.__deleteSpa(self.query)
        self.query = " ".join(queries)

    if self.query.count(';') > 1:
        queries = self.queryEdit.toPlainText().replace("\n", " ").split(";")
        queries = self.__deleteSpa(queries)
        # print(queries)
        self.query = queries[-1]

    if self.query != "select count(*) from table;":
        self.__isQueryChanged = True

    # print(self.query)

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
そうでない場合は一番後ろに書かれているクエリをクエリとして扱う。<br>

* `select`はデータの呼び出しをする際に、結果を表示するためのモデルを構築または再構築する必要がある。<br><br>

* `create`や`drop`はモデルの再構築は必要ないがテーブルや中身の表示を変更する必要がある。<br>
`create`の次の単語が`database`なら新しくDBファイルを作成しDBリストの更新を行う。<br>
`table`や`drop`ならテーブルリストの更新を行う。<br><br>

* `update`や`insert`などは、DBの中身が変更されるため、モデルの再構築を行う。<br>
(なお、直前に実行したクエリが`select`以外ならモデルの再構築は行われない)<br>

## クエリの実行2

### VACUUM

SQLiteで`DROP TABLE`を実行した際、ファイルの大きさが変わらないため、`VACUUM`を実行してやる必要がある。

```python
def vacT(self, db_path: str):
    self.notifier = Notifier()
    self.thread = VacuumThread(self.notifier, "create image", db_path)
    self.notifier.moveToThread(self.thread)
    self.thread.started.connect(self.thread.onLoop)
    self.thread.start()
```

`VACUUM`を実行する際、ファイルの容量が大きければ大きいほど処理に時間がかかり、ユーザにストレスを与えることになる。<br>
それを回避するため、別スレッドにて処理を行うことで、アプリの硬直を防ぎ、ユーザのストレスを軽減する。<br>
Logを表示しないせいで、今処理中なのか・・・？ってなるので後でLogを追加する必要がある。<br>
(なお処理中は、ファイルがロックされるため、そのファイルは使用できない。)<br>

`VACUUM`の処理内容はおそらく、ファイルの中を全探索して、詰められるところを詰めている。<br>
(多分、おそらく、きっと)<br>
`VacuumThread`はもう少し下に行ったところにあるのでそこを見てください。

### Create DB
これはSQLiteには必要のない機能。`sqlite3 〇〇.db`(pythonならconnect)をするだけでDBが作成されるため。<br>
しかし、それはコンソール(エディタ)上での話。<br>
この`SQLiteViewer`を使っているときに、あれ作りたい！ってなっていちいち移動するのはめんどくさい！<br>
なので作りました。

操作は簡単！`create database 〇〇`と書くだけ!後ろに`db`は書かなくてもOK!<br>

```python
def CreateDB(self, name: str) -> None:
    try:
        tmp = name.split(".")
        if len(tmp) == 1:
            name += ".db"
        elif tmp[1] != "db":
            name = tmp[0] + ".db"
    except:
        pass
    
    dbpath = self.db_dir.joinpath(name)
    conn = sqlite3.connect(str(dbpath))
    conn.close()
    self.DBList.addItem(name)
    self.DBPathList.append(dbpath)
    return None
```

### Create or Drop table

```python
def CreatOrDropTable(self, func_type: str):
    try:
        self.connectDB(self.db_path)

        self.cur.execute(self.query)
        if func_type == "drop":
            self.vacT(self.db_path)

        self.conn.commit()
        self.closeDB()
    except sqlite3.Error as e:
        self.exception(e)
        return False

    if self.tableList:
        self.tableList.clear()
    self.getTable()

    return True
```

* テーブルを消したいときや、新しく作りたいときに動く

## クエリの選択部分の取得

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

クエリが選択されていればその部分を返し、そうでなければ一番後ろのクエリを返す。

### deleteSeparate

```python
def deleteSpa(self, items):
    items = list(filter(lambda x: x != "" and x != " ", items))
    return items
```

* クエリから無駄な空白を消す

## モデルの構築

```python
def getHeader(self):
    self.connectDB(self.db_path)

    try:
        self.cur.execute(self.query)
    except sqlite3.Error as e:
        self.exception(e)
        self.closeDB()
        return False
    self.header = []

    for d in self.cur.description:
        self.header.append(d[0])
    
    self.closeDB()
    return True
  
def modelSetUp(self):
    if not self.query or not self.isQueryChanged:
        return False

    res = self.getHeader()
    if not res:
        return False

    self.model = QStandardItemModel(0, len(self.header))
    self.setHeader()
    return True

def setHeader(self):
    for index, h in enumerate(self.header):
        self.model.setHeaderData(index, Qt.Horizontal, h)
```

* `getHeader`でクエリの`select a, b, c`の`a, b, c`部分を取得
* `modelSetUp`でモデルを作る。この時点ではヘッダーしか表示されません

## テーブルリスト

```python
def getTable(self):
    if self.db_path is None:
        return
    self.connectDB(self.db_path)
    self.cur.execute("select * from sqlite_master where type = 'table'")
    self.tables = []
    while True:
        v = self.cur.fetchone()
        if v is None:
            break
        self.tables.append(v[1])
    self.tableList.addItems(self.tables)
    self.closeDB()
```

* DBファイルをダブルクリックしたり、テーブルの更新があった際に、DBファイルからテーブル名だけを受け取り、テーブルリストを更新する。

# DBViewerUI.py部分

### DnD

```python
def dragEnterEvent(self, event) -> None:
    if event.mimeData().hasUrls():
      event.accept()
    else:
      event.ignore()

def dropEvent(self, event) -> None:
    urls = event.mimeData().urls()
    for url in urls:
        path = url.toLocalFile()
        x = Path(path)
        tmp = path.split('.')
        if x in self.DBPathList:
            QMessageBox.information(self, 'Warning', 'This file already in.', QMessageBox.Ok)
            continue
        if len(tmp) != 1:
            if "db" in x.suffix:
                self.DBList.addItem(x.name)
                self.DBPathList.append(x)
        else:
            # print(tmp[0])
            self.addDir(Path(tmp[0]))

def addDir(self, item: str) -> None:
    for f in list(item.glob("**/*.db")):
        self.DBList.addItem(f.name)
        self.DBPathList.append(f)
```

* ドラッグアンドドロップでDBファイルを追加するときに動く

### keyPressEvent

```python
def keyPressEvent(self, event):
    if event.modifiers() & Qt.ControlModifier and event.key() == Qt.Key_Return:
        self.execQuery()
```
* クエリの実行の際に`Ctrl + Enter`を押すと実行できる！

### selectTableItem

```python
def selectTableItem(self):
    try:
        self.db_name = self.tableList.selectedItems()[0].text()
        self.query = "select count(*) from {};".format(self.db_name)
    except:
        self.query = "select count(*) from table;"
        self.isQueryChanged = False
    self.queryEdit.setText(self.query)
    return True
```

* 選択テーブルを切り替えたときにデフォルトでクエリをいれてくれる。<br>
この部分はユーザによっては不便になるので、ユーザにデフォルトを決められるようにするか、削除するか。

# DBViewerThread.py部分

### MyTreeクラス

モデルを入れるための箱。実際ユーザの前に表示されているのはこのクラス

```python
class MyTree(QTreeView):
    def __init__(self, path = None, header = None, query = None):
        super(MyTree, self).__init__()
        
        if path is None or header is None or query is None:
            return

        self.setSortingEnabled(True)

    def setup(self, path, header, query):
        self.DBLister = DBLister(path, header, query)
        self.DBLister.addIntObject.connect(self.addItem)
        self.DBLister.addStrObject.connect(self.addItem)
        self.DBLister.addDoubleObject.connect(self.addItem)
        self.DBLister.addBoolObject.connect(self.addItem)
        
        self.DBLister.setup()
        self.DBLister.start()
        
    def addItem(self, cnt, index, val):
        item = QStandardItem(str(val))
        model = self.model()
        model.setItem(cnt, index, item)
```

### DBListerクラス

実際にクエリを実行し、データを受け取り`MyTree`クラスに返す部分<br>
受け取ったデータの型によって、処理を変えているが、全部`str`型に変えて返せば問題ないのではという気がしている。<br>

```python

class DBLister(QThread):
    addIntObject = pyqtSignal(int, int, int)
    addStrObject = pyqtSignal(int, int, str)
    addDoubleObject = pyqtSignal(int, int, float)
    addBoolObject = pyqtSignal(int, int, bool)

    def __init__(self, path, header, query):
        super(DBLister, self).__init__()

        self.db_path = path
        self.header = header
        self.query = query

        self.mutex = QMutex()

    def setup(self):
        self.stoped = False
    
    def stop(self):
        with QMutexLocker(self.mutex):
            self.stoped = True
  
    def run(self):
        conn = sqlite3.connect(str(self.db_path))
        cur = conn.cursor()
        try:
            cur.execute(self.query)
        except sqlite3.Error:
            self.finished.emit()
            return 

        cnt = 0
        while True:
            values = cur.fetchone()
            if values is None:
                break
            for index, v in enumerate(values):
                t = type(v)
                if t == int:
                    self.addIntObject.emit(cnt, index, v)
                elif t == str:
                    self.addStrObject.emit(cnt, index, v)
                elif t == float:
                    self.addDoubleObject.emit(cnt, index, v)
                elif t == bool:
                    self.addBoolObject.emit(cnt, index, v)
        cnt += 1

    cur.close()
    conn.close()
    self.stop()
```

### VacuumThreadクラス

このページの上のほうで書いた`VACUUM`の処理をしてくれるスレッド。<br>

```python
class VacuumThread(QThread):
    off_loop_sig = pyqtSignal()
    def __init__(self, notifier, name, db_path):
        super().__init__()
        
        self.notifier = notifier
        self.name = name
  
    def run(self):
        print('start thread :' + self.name)
        while self.isRunning:
            self.notifier.notify.emit()
            time.sleep(0.1)
            try:
                conn = sqlite3.connect(self.db_path)
                conn.execute("VACUUM")
                conn.close()
            except Exception as e:
                try:
                    conn.close()
                except:
                    pass
                self.except_sig.emit(str(e))

    def onLoop(self):
        self.isRunning = True
  
    def offLoop(self):
        self.isRunning = False
        self.off_loop_sig.emit()
```

実装にあたって、ちょっと困った部分は、`sqlite3.Connection`を引数にしてやればいいだろう。と思っていたら、<br>
メインスレッドからこのスレッドに移動したことで、このスレッド上では`python`と`SQLite`が接続されていない。という部分を見落としていたこと。<br>
(関係を考えずに書くからこうなる。)<br>



[上部に戻る](#SQLiteViewerの詳細です)

[前に戻る]({{ site.PyQturl }}/SQLiteViewer)

[トップページに戻る]({{ site.reseturl }})
