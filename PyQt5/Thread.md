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

        self.__initUI()

    def __initUI(self):
        startButton = QPushButton("start")
        startButton.clicked.connect(self.__onClicked)

        finishButton = QPushButton("finish")
        finishButton.clicked.connect(self.__finishClicked)

        layout = QVBoxLayout()
        layout.addWidget(startButton)
        layout.addWidget(finishButton)

        self.setLayout(layout)
  
    def __sub(self):
        self.isRunning = True
        while self.isRunning:
            time.sleep(2) 
            if not self.isRunning:
                break
            print("now running")

    def __onClicked(self):
        self.notifier = Notifier()
        self.thread = Thread(self.notifier, 'test')
        self.notifier.moveToThread(self.thread)
        self.notifier.notify.connect(self.__sub, type = Qt.DirectConnection)
        self.thread.started.connect(self.thread.onLoop)
        self.thread.start()

    def __finishClicked(self):
        self.thread.ofLoop()
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

[トップページに戻る]({{ site.reseturl }})