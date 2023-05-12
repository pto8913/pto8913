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
    self.label.setText(str(event.key()))
    if event.modifiers() & Qt.ControlModifier and event.key() == Qt.Key_Q:
      self.label.setText("keyPressMulti!")
    elif event.key() == Qt.Key_Escape:
      exit()
    else:
      self.label.setText("keyPress")

  def keyReleaseEvent(self, event):
    self.label.setText("")

def main():
  app = QApplication(sys.argv)
  font = QFont("Meiryo")
  app.setFont(font)
  w = Main()
  w.setWindowTitle("keyPressMulti")
  w.show()
  w.raise_()
  app.exec_()

if __name__ == '__main__':
  main()