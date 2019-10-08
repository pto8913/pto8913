[TOP]({{ site.reseturl }}) > PyQt5 TextEdit

# TextEdit
2019/10/06/2:46 pto8913

## 基本的な使い方

```python
import sys

from PyQt5.QtWidgets import (
    QApplication, QWidget, 
    QTextEdit, QHBoxLayout
)

from PyQt5.QtGui import QFont

class Main(QWidget):
    def __init__(self):
        super(Main, self).__init__()

        self.initUI()
    
    def initUI(self) -> None:
        self.inputEdit = QTextEdit()
        
        layout = QHBoxLayout()
        layout.addWidget(self.inputEdit)

        self.setLayout(layout)
    
def main() -> None:
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

以下、`Main`クラスに関数等を追加していく<br>

## 選択範囲内のテキスト取得

```python
class Main(QWidget):
    def __init__(self):
        super(Main, self).__init__()

        self.initUI()
    
    def initUI(self) -> None:
        self.inputEdit = QTextEdit()
        self.inputEdit.selectionChanged.connect(self.updateText)

        self.outputEdit = QTextEdit()
        # 読み取り専用にもできる
        self.outputEdit.setReadOnly(True)

        layout = QHBoxLayout()
        layout.addWidget(self.inputEdit)
        layout.addWidget(self.outputEdit)

        self.setLayout(layout)

    def updateText(self) -> None:
        cursor = self.inputEdit.textCursor()
        self.outputEdit.setText(cursor.selectedText())
```

## テキストの内容が変わったら取得

```python
class Main(QWidget):
    def __init__(self):
        super(Main, self).__init__()

        self.initUI()
    
    def initUI(self) -> None:
        self.inputEdit = QTextEdit()
        self.inputEdit.textChanged.connect(self.updateText)

        self.outputEdit = QTextEdit()

        layout = QHBoxLayout()
        layout.addWidget(self.inputEdit)
        layout.addWidget(self.outputEdit)

        self.setLayout(layout)

    def updateText(self) -> None:
        self.outputEdit.setPlainText(self.inputEdit.toPlainText())
```


[トップページに戻る]({{ site.reseturl }})