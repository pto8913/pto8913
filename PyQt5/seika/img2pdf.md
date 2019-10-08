[TOP]({{ site.reseturl }}) > img2pdf

# img2pdf

## 説明
`jpg`を`pdf`に変換する

`png`ファイルも大丈夫！みたいなこと書いてたけど、いざやろうと思ったら`png`は透過をサポートしてるから無理みたいなエラーを吐かれて削除しました。<br>

![1]({{ site.reseturl }}/image/img2pdf/img2pdf/png)

## コード

### Main

```python
import sys
import img2pdf
from pathlib import Path
from PIL import Image 
from PyQt5.QtWidgets import (
  QApplication, QListWidget, QMessageBox,
)

from PyQt5.QtGui import QFont

from img_to_pdfUI import MainUI, LayoutUI

class Main(MainUI):
    def __init__(self):
        super(Main, self).__init__()

        self.myLayout = Layout()
        self.setCentralWidget(self.myLayout)
        self.initUI()
    

class Layout(LayoutUI):
    def __init__(self, parent = None):
        super(Layout, self).__init__(parent)
        
        self.setAcceptDrops(True)
        self.ImagePathList = []
        self.SelectFileName = ""
        self.Extension = ".jpg"
        self.FileList = QListWidget()

        self.PathInit()
        self.initUI()

    def dragEnterEvent(self, event):
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
            if x in self.FileList:
                QMessageBox.information(self, 'Warning', 'This file already in.', QMessageBox.Ok)
                continue
            if len(tmp) != 1:
                if x.suffix == self.Extension:
                    self.FileList.addItem(x.name)
                    self.ImagePathList.append(x)
            else:
                print(tmp[0])
                self.__addDir(Path(tmp[0]))

    def __addDir(self, item: str) -> None:
        for f in list(item.glob("**/*.{}".format(self.Extension))):
            self.FileList.addItem(f.name)
            self.ImagePathList.append(f)

    def PathInit(self):
        self.current_dir = Path().resolve()

def main():
    app = QApplication(sys.argv)
    app.setFont(QFont('Meiryo'))
    w = Main()
    w.setWindowTitle('img2pdf')
    w.show()
    w.raise_()
    app.exec_()

if __name__ == '__main__':
    main()
```

### UI

```python
from PyQt5.QtWidgets import (
  QWidget, QPushButton, QGridLayout, QMainWindow, QAction,
  QVBoxLayout, QFileDialog, QMessageBox, QInputDialog, QLineEdit, 
)

from PyQt5.QtCore import Qt

from pathlib import Path
import img2pdf

class MainUI(QMainWindow):
    def initUI(self):
        menubar = self.menuBar()
        
        saveAct = QAction("Save", self)
        saveAct.setShortcut("Ctrl+S")
        saveAct.triggered.connect(self.myLayout.clickedSave)

        exitAct = QAction("Exit", self)
        exitAct.setShortcut("Ctrl+Q")
        exitAct.triggered.connect(self.myLayout.clickedExit)

        openAct = QAction("Open", self)
        openAct.setShortcut("Ctrl+O")
        openAct.triggered.connect(self.myLayout.clickedAdd)

        resetAct = QAction("Reset", self)
        resetAct.triggered.connect(self.myLayout.clickedClear)

        fileMenu = menubar.addMenu("&File")
        fileMenu.addAction(resetAct)
        fileMenu.addAction(saveAct)
        fileMenu.addAction(openAct)
        fileMenu.addAction(exitAct)

        self.setGeometry(100, 100, 300, 400)

class LayoutUI(QWidget):
    def initUI(self):
        saveButton = QPushButton("Save")
        saveButton.clicked.connect(self.clickedSave)

        exitButton = QPushButton("Exit")
        exitButton.clicked.connect(self.clickedExit)

        addButton = QPushButton("Add Item")
        addButton.clicked.connect(self.clickedAdd)

        clearButton = QPushButton("Clear Item")
        clearButton.clicked.connect(self.clickedClear)

        deleteButton = QPushButton("Delete Item")
        deleteButton.clicked.connect(self.clickedDelete)

        sortButton = QPushButton("Sort Item")
        sortButton.clicked.connect(self.clickedSort)

        buttonLayout = QGridLayout()
        buttonLayout.addWidget(saveButton, 0, 0)
        buttonLayout.addWidget(clearButton, 0, 1)
        buttonLayout.addWidget(exitButton, 0, 2)
        buttonLayout.addWidget(addButton, 1, 0)
        buttonLayout.addWidget(deleteButton, 1, 1)
        buttonLayout.addWidget(sortButton, 1, 2)

        entireLayout = QVBoxLayout()
        entireLayout.addWidget(self.FileList)
        entireLayout.addLayout(buttonLayout)

        self.setLayout(entireLayout)

        
    def clickedAdd(self):
        FileName, ok = QFileDialog.getOpenFileNames(self, "Open", str(self.current_dir))
        if not ok:
            return 
        
        for f in FileName:
            x = Path(f)
            if x.suffix == self.Extension:
                self.FileList.addItem(x.name)
                self.ImagePathList.append(x)

    def clickedSave(self):
        filename, _ = QInputDialog.getText(
            self, 
            "Enter Filename", 
            "filename: ", 
            QLineEdit.Normal, 
            ""
        )
        if filename:
            if ".pdf" not in Path(filename).suffix:
                filename += ".pdf"
            path = self.current_dir.joinpath(filename)
            try:
                if path.exists():
                    QMessageBox.information(
                            self,
                            "Filename Error",
                            "This filename is already exists <br>\
                            Please change.\
                            ",
                            QMessageBox.Ok
                    )
                    return self.clickedSave()
                with open(path , "wb") as f:
                    f.write(img2pdf.convert(list(map(str, self.ImagePathList))))
                f.close()
            except Exception as e:
                QMessageBox.critical(
                    self, 
                    "WARNING", 
                    str(e) + 
                    "<br> PLEASE CHECK YOUR FILE FORMAT <br>\
                    THIS IS VERY VERY STRANGE SITUATION. <br>\
                    ",
                    QMessageBox.Ok
                )


    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            self.clickedExit()

    def clickedExit(self):
        exit()

    def clickedSort(self):
        self.ImagePathList = sorted(self.ImagePathList, key =  lambda x: x.name)
        self.FileList.sortItems()

    def clickedClear(self):
        self.ImagePathList = []
        self.FileList.clear()

    def clickedDelete(self):
        try:
            row = self.FileList.row(self.FileList.selectedItems()[0])
            self.ImagePathList.pop(row)
            self.FileList.takeItem(row)
        except:
            QMessageBox.information(
                self, 
                "No Item Error", 
                "Select delete item", 
                QMessageBox.Ok
            )

```

[トップページに戻る]({{ site.reseturl }})
