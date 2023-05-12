import sys
from pathlib import Path
import os
from PyQt5.QtWidgets import (
  QApplication, QListWidget, QMessageBox, QTextEdit
)

from PyQt5.QtGui import QFont
from collections import deque

from Portfolio.PyQt5.Tools.img2pdf.img2pdfUI import MainUI, LayoutUI

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
    self.FileList = QListWidget()
    self.Extension = QTextEdit(".png")
    self.__que = deque()
    
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
      if x in self.ImagePathList:
        QMessageBox.information(self, 'Warning', 'This file already in.', QMessageBox.Ok)
        continue
      if len(tmp) != 1:
        if x.suffix == self.Extension.toPlainText():
            self.FileList.addItem(x.name)
            self.ImagePathList.append(x)
      else:
        print(tmp[0])
        self.__addDir(Path(tmp[0]))

  # def __addDir(self, item: str) -> None:
  #   print(item.glob(f"**/*.{self.Extension.toPlainText()}"))
  #   for f in list(item.glob(f"**/*.{self.Extension.toPlainText()}")):
  #     self.FileList.addItem(f.name)
  #     self.ImagePathList.append(f)

  def __addDir(self, item: str) -> None:
    for roots, dirs, files in os.walk(item):
      for f in files:
        if f'.{f.split(".")[-1]}' == self.Extension.toPlainText():
          self.FileList.addItem(os.path.basename(f))
          self.ImagePathList.append(os.path.basename(f))

      if len(dirs) != 0:
        for d in dirs:
          self.__que.append(f"{item}/{d}")
        return self.__addDir(self.__que.popleft())

    try:
      if len(self.__que) != 0:
        return self.__addDir(self.__que.popleft())
    except:
      return
    
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