[TOP]({{ site.reseturl }}) > PyQt5 KeyPressEvent(Multi)

# PyQtGuiにおけるキーの同時入力の受け取り方

2019/09/05/11:41 pto8913 <br>

* PyQt5.12.1 <br>
* Python3.7.1 <br>

# 簡単な例

`modifier`で`Control`キーを修飾子として`Ctrl + xxx`を受け取ることができる<br>
`Shift`キーでもできる

<details>
<summary> 実装例 </summary>

```python
from PyQt5.QtWidgets import (
  QApplication, QWidget, QVBoxLayout, QLabel
)

from PyQt5.QtCore import Qt

from PyQt5.QtGui import QFont

import sys

class Main(QWidget):
    def __init__(self):
        super(Main, self).__init__()
        
        self.__initUI()
    
    def __initUI(self):
        self.label = QLabel("")
        layout = QVBoxLayout(self)
        layout.addWidget(self.label)
  
    def keyPressEvent(self, event):
        # modifier (修飾子)
        if event.modifiers() & Qt.ControlModifier and event.key() == Qt.Key_Return:
            self.label.setText("Press")
        elif event.key() == Qt.Key_Escape:
            exit()
  
  def keyReleaseEvent(self, event):
        self.label.setText("")

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
</details>

[トップページに戻る]({{ site.reseturl }})