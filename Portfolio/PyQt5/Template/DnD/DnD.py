import os
import sys
from PyQt5.QtWidgets import (
  QApplication, QListWidget, QWidget, QVBoxLayout
)
from PyQt5.QtGui import QFont
from collections import deque

class Main(QWidget):
  def __init__(self):
    super(Main, self).__init__()

    self.setAcceptDrops(True)
    self.__que = deque()
    self.__FileList = QListWidget()
    self.__initUI()
      
  def __initUI(self):
    layout = QVBoxLayout()
    layout.addWidget(self.__FileList)

    self.setLayout(layout)

    self.setGeometry(1000, 500, 800, 500)

  def dragEnterEvent(self, event):
    if event.mimeData().hasUrls():
      event.accept()
    else:
      event.ignore()

  def dropEvent(self, event):
    urls = event.mimeData().urls()
    for url in urls:
      path = url.toLocalFile()
      tmp = path.split('.')
      if len(tmp) != 1:
        self.__FileList.addItem(os.path.basename(path))
      else:
        self.__addDir(tmp[0])
  
  def __addDir(self, item):
    for roots, dirs, files in os.walk(item):
      for f in files:
        self.__FileList.addItem(os.path.basename(f))

      if len(dirs) != 0:
        for d in dirs:
          self.__que.append(f"{item}/{d}")
        return self.__addDir(self.__que.popleft())

    try:
      if len(self.__que) != 0:
        return self.__addDir(self.__que.popleft())
    except:
      return
    
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

# use pathlib
"""
from pathlib import Path

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
    if x in self.__xmlPathList:
      QMessageBox.information(self, 'Warning', 'This file already in.', QMessageBox.Ok)
      continue
    if len(tmp) != 1:
      if inExtension(x, "db"):
        self.xmlList.addItem(x.name)
        self.__xmlPathList.append(x)
    else:
      print(tmp[0])
      self.__addDir(Path(tmp[0]))

def __addDir(self, item: str) -> None:
  for f in list(item.glob("**/*.db")):
    self.xmlList.addItem(f.name)
    self.__xmlPathList.append(f)
"""