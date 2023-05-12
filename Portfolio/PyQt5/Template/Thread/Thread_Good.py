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