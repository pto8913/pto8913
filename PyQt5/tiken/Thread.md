[TOP]({{ site.reseturl }}) > PyQt5 QThread

# QThread template
2019/09/05/12:44 pto8913 <br>

## 簡単な例

`__onClicked`関数内の<br>
`self.notifier.notify.connect(self.__sub, type = Qt.DirectConnection)`<br>
`self.__sub`の部分を別の関数に変えてやれば簡単にマルチスレッドにできます<br>

```python
import sys
from PyQt5.QtWidgets import QApplication, QPushButton, QWidget, QVBoxLayout
from PyQt5.QtCore import Qt, QObject, QThread, pyqtSignal
from PyQt5.QtGui import QFont

import time

class Notifier(QObject):
  notify = pyqtSignal()

class Thread(QThread):
    def __init__(self, notifier, name):
        super().__init__()
        
        self.notifier = notifier
        self.name = name
  
    def run(self):
        print('start thread :' + self.name)
        while self.isRunning:
            self.notifier.notify.emit()
            time.sleep(0.1)

    def onLoop(self):
        self.isRunning = True
  
    def offLoop(self):
        self.isRunning = False

class Main(QWidget):
    def __init__(self):
        super(Main, self).__init__()

        self.initUI()

    def initUI(self):
        startButton = QPushButton("start")
        startButton.clicked.connect(self.onClicked)

        finishButton = QPushButton("finish")
        finishButton.clicked.connect(self.finishClicked)

        layout = QVBoxLayout()
        layout.addWidget(startButton)
        layout.addWidget(finishButton)

        self.setLayout(layout)
  
    def sub(self):
        # なにか重い処理をここで回すとする
        while self.thread.isRunning:
            time.sleep(2) 
            if not self.thread.isRunning:
                break
            print("now running")


    def onClicked(self):
        self.notifier = Notifier()
        self.thread = Thread(self.notifier, 'test')
        self.notifier.moveToThread(self.thread)
        self.notifier.notify.connect(self.sub, type = Qt.DirectConnection)
        self.thread.started.connect(self.thread.onLoop)
        self.thread.start()

    def finishClicked(self):
        self.thread.offLoop()
        print("finished")

def main():
    app = QApplication(sys.argv)
    font = QFont("Meiryo")
    app.setFont(font)
    w = Main()
    w.setWindowTitle("title")
    w.show()
    w.raise_()
    app.exec_()

if __name__ == '__main__':
    main()
```
<br>

## QThreadを使用する際の注意点

以下はよくない例です

```python
import sys
import time

from PyQt5.QtWidgets import (
  QApplication, QWidget, QVBoxLayout, 
  QPushButton, QMessageBox
)
from PyQt5.QtGui import QFont
from PyQt5.QtCore import pyqtSignal, Qt, QThread, QObject

class Notifier(QObject):
  notify = pyqtSignal()

class Thread(QThread):
    def __init__(self, notifier, name):
        super().__init__()
        
        self.notifier = notifier
        self.name = name
  
    def run(self):
        print('start thread : ' + self.name)
        while self.isRunning:
            self.notifier.notify.emit()
            time.sleep(0.1)

    def onLoop(self):
        self.isRunning = True
  
    def offLoop(self):
        self.isRunning = False

class Main(QWidget):
    def __init__(self):
        super(Main, self).__init__()

        self.initUI()
    
    def initUI(self):
        startButton = QPushButton("start")
        startButton.clicked.connect(self.onClicked)

        finishButton = QPushButton("finish")
        finishButton.clicked.connect(self.finishClicked)

        layout = QVBoxLayout()
        layout.addWidget(startButton)
        layout.addWidget(finishButton)

        self.setLayout(layout)

    def onClicked(self):
        self.notifier = Notifier()
        self.thread = Thread(self.notifier, 'test')
        self.notifier.moveToThread(self.thread)
        self.notifier.notify.connect(self.sub, type = Qt.DirectConnection)
        self.thread.started.connect(self.thread.onLoop)
        self.thread.start()

    def sub(self):
        # なにか重い処理をここで回すとする
        while self.thread.isRunning:
            time.sleep(1)
            if not self.thread.isRunning:
                break
            print("now running")
        QMessageBox.information(self, "message", "finished", QMessageBox.Ok)

    def finishClicked(self):
        self.thread.offLoop()
        self.finished.emit()

def main():
    app = QApplication(sys.argv)
    app.setFont(QFont("Meiryo"))
    w = Main()
    w.setWindowTitle("title")
    w.show()
    w.raise_()
    app.exec_()

if __name__ == '__main__':
    main()
```
これを走らせるとわかる通り、`QMessageBox`を表示した瞬間エラーを吐く。<br>
理由は、`QThread`に`sub`関数を渡したことで`sub`関数の親が変わっているから。<br>

これを解消するには、`pyqtSignal`を使ってシグナルを発してやって、<br>
そのシグナルを`Main`クラス内で受け取る必要がある。<br>

```python
import sys
import time

from PyQt5.QtWidgets import (
  QApplication, QWidget, QVBoxLayout, 
  QPushButton, QMessageBox
)
from PyQt5.QtGui import QFont
from PyQt5.QtCore import pyqtSignal, Qt, QThread, QObject

class Notifier(QObject):
  notify = pyqtSignal()

class Thread(QThread):
    def __init__(self, notifier, name):
        super().__init__()
        
        self.notifier = notifier
        self.name = name
  
    def run(self):
        print('start thread : ' + self.name)
        while self.isRunning:
            self.notifier.notify.emit()
            time.sleep(0.1)

    def onLoop(self):
        self.isRunning = True
  
    def offLoop(self):
        self.isRunning = False

class Main(QWidget):
    finished = pyqtSignal()
    def __init__(self):
        super(Main, self).__init__()

        self.finished.connect(self.fin)

        self.initUI()
    
    def initUI(self):
        startButton = QPushButton("start")
        startButton.clicked.connect(self.onClicked)

        finishButton = QPushButton("finish")
        finishButton.clicked.connect(self.finishClicked)

        layout = QVBoxLayout()
        layout.addWidget(startButton)
        layout.addWidget(finishButton)

        self.setLayout(layout)

    def fin(self):
        QMessageBox.information(self, "message", "fin", QMessageBox.Ok)

    def onClicked(self):
        self.notifier = Notifier()
        self.thread = Thread(self.notifier, 'test')
        self.notifier.moveToThread(self.thread)
        self.notifier.notify.connect(self.sub, type = Qt.DirectConnection)
        self.thread.started.connect(self.thread.onLoop)
        self.thread.start()

    def sub(self):
        # なにか重い処理をここで回すとする
        while self.thread.isRunning:
            time.sleep(1)
            if not self.thread.isRunning:
                break
            print("now running")
        self.finished.emit()

    def finishClicked(self):
        self.thread.offLoop()
        print("finished")

def main():
    app = QApplication(sys.argv)
    app.setFont(QFont("Meiryo"))
    w = Main()
    w.setWindowTitle("title")
    w.show()
    w.raise_()
    app.exec_()

if __name__ == '__main__':
    main()
```

こんな感じ。<br>
`pyqtSignal`を`pyqtSignal(str)`とすることで例外を受け取ってそれを表示、なんてこともできる。
```python
def work(self) -> None:
    try:
        a = []
        a[1] = 1
    except as e:
        self.exception_sig.emit(str(e))

def message(self, exception_msg: str) -> None:
    QMessageBox.critical(self, "Warning", exception_msg, QMessageBox.Ok)
```
`IndexError: list assignment index out of range`こんなのが出るはず。

## Threadの終了?

はっきり言ってよくわからん。<br>

### terminate()
`terminate()`は、あまりよくない方法で<br>
強制的に終了する。処理の途中で終わった場合困る<br>
実際使うとエラーを吐いたりして本当に使えるんかこいつってなる<br>
使い方が悪いだけだろうけど<br>

### quit()

`quit()`を使うと次の処理を見てくれるらしい。<br>
つまり`isRunning`が`False`になると`quit()`が次の処理を見て処理を終わってくれるらしい？<br>
何を言っているのかわからねぇと思うが、俺も何を言ってるのかわからねぇ、スタンド攻撃だとかちゃちなもんじゃあ断じてない。<br>
<br>

### exit()
`exit()`はどこから来たのか、`exit()`は何者か、`exit()`はどこへ行くのか。

<br>

[トップページに戻る]({{ site.reseturl }})