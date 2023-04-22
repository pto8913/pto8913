[TOP]({{ site.reseturl }}) > PyQt5 Divide UI

# UIの継承？

2019/09/05/11:44 pto8913 <br>

* PyQt5.12.1
* python3.7.1

## 説明

`class sub`を`UIファイル`として<br>
(同じディレクトリ or モジュール用ディレクトリに)保存しておきそれを`import`する<br>

関数や変数はどちらからでも参照できる。<br>

しかし、宣言は`class Main`でやったほうが分かりやすい。<br>
(そうすることでコード補完も出るから)<br>

例に書いてあるような`Exit`ボタンで`Main`のほうで使うことがなかったりするなら`Sub`のままでいい(と思ってる。)<br>

## 実装例

```python
""" ------------------------- main -------------------------------------"""
from PyQt5.QtWidgets import QApplication

from PyQt5.QtGui import QFont

import sys

from myui import UI

class Main(UI):
    def __init__(self):
        super(Main, self).__init__()
        self.initUI()
    
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
 
""" -------------------------------- main -----------------------------"""

""" ------------------------------- sub --------------------------------"""
from PyQt5.QtWidgets import (
  QWidget,
  QPushButton, QGridLayout,
)

class UI(QWidget):
    def initUI(self):
        exitButton = QPushButton('Exit')
        exitButton.clicked.connect(self.clickedExit)

        buttonLayout = QGridLayout()
        buttonLayout.addWidget(exitButton, 1, 1)
        
        self.setLayout(buttonLayout)
    
    # clickedExitはmainのほうにあっても動く。
    def clickedExit(self):
        exit()
""" -------------------------------- sub -------------------------------"""
```
<br>

[トップページに戻る]({{ site.reseturl }})