import sys
from PyQt5.QtWidgets import QApplication, QPushButton, QWidget, QVBoxLayout, QHBoxLayout, QListWidget, QLabel
from PyQt5.QtCore import Qt, QObject, QThread, pyqtSignal
from PyQt5.QtGui import QFont

import os
from collections import deque

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
    self.setAcceptDrops(True)
    self.initUI()
    self.count = 0
    self.__que = deque()

  def initUI(self):
    startButton = QPushButton("Start thread")
    startButton.clicked.connect(self.onClicked)

    finishButton = QPushButton("Finish thread")
    finishButton.clicked.connect(self.finishClicked)

    self.threadStateLabel = QLabel("Thread is not running")

    buttonLayout = QVBoxLayout()
    buttonLayout.addWidget(startButton)
    buttonLayout.addWidget(finishButton)
    buttonLayout.addWidget(self.threadStateLabel)
    
    layout = QHBoxLayout()
    layout.addLayout(buttonLayout)

    self.__FileList = QListWidget()
    layout.addWidget(self.__FileList)

    self.setLayout(layout)

    self.setGeometry(500, 500, 800, 500)

    self.setLayout(layout)

  def work(self):
    # なにか重い処理をここで回すとする
    while self.thread.isRunning:
      time.sleep(2)
      if not self.thread.isRunning:
        break
      self.threadStateLabel.setText(f"Thread is running {self.count}")
      self.count += 1

  def onClicked(self):
    self.notifier = Notifier()
    self.thread = Thread(self.notifier, 'test')
    self.notifier.moveToThread(self.thread)
    self.notifier.notify.connect(self.work, type = Qt.DirectConnection)
    self.thread.started.connect(self.thread.onLoop)
    self.thread.start()

  def finishClicked(self):
    self.thread.offLoop()
    self.threadStateLabel.setText("Thread is not running")
    self.count = 0

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