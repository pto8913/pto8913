import sys

from PyQt5.QtWidgets import (
  QApplication, QWidget, QListWidget, 
  QPushButton, QLineEdit, QTextEdit,
  QVBoxLayout, QHBoxLayout
)

from PyQt5.QtCore import Qt

from PyQt5.QtGui import QFont

class Main(QWidget):
  def __init__(self):
    super(Main, self).__init__()
    self.Log = QListWidget()
    self.inputEdit = QLineEdit("Enter here")
    self.initUI()

  def initUI(self):
    addItemButton = QPushButton("add")
    addItemButton.clicked.connect(self.add)

    Inputlayout = QVBoxLayout()
    Inputlayout.addWidget(self.Log)
    Inputlayout.addWidget(addItemButton)
    Inputlayout.addWidget(self.inputEdit)

    pasteEdit = QTextEdit()

    layout = QHBoxLayout()
    layout.addLayout(Inputlayout)
    layout.addWidget(pasteEdit)

    self.setLayout(layout)

  def add(self):
    self.Log.addItem(self.inputEdit.text())

  def keyPressEvent(self, event):
    if event.key() == Qt.Key_C and event.modifiers() & Qt.ControlModifier:
      try:
        cb = QApplication.clipboard()
        cb.clear(mode = cb.Clipboard)
        cb.setText(self.Log.selectedItems()[0].text(), mode = cb.Clipboard)
      except:
        return None

def main():
  app = QApplication(sys.argv)
  font = QFont("Meiryo")
  app.setFont(font)
  w = Main()
  w.setWindowTitle("Clipboard Template")
  w.show()
  w.raise_()
  app.exec_()

if __name__ == '__main__':
  main()