[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 累積和<br>
[トップページに戻る]({{ site.reseturl }})<br>

> ## 説明

単純な累積和<br>
前計算として事前に累積和を取ることで、区間の和をO(1)で求めることができる<br>

> ## 計算量

* 前計算(構築) O(n)

* クエリ(区間の和) O(1)

> ## 実装例

[C++](#C++) <br>
[python](#python) <br>

### python

```python
class CumulativeSum:
  def __init__(self, size):
    self.data = [0] * size
    self.size = size

  def build(self):
    for i in range(1, self.size):
      self.data[i] += data[i - 1]

  def add(self, key, value):
    self.data[key] += value
  
  def query(self, kukan):
    if k < 0:
      return 0
    return self.data[min(kukan, self.size - 1))]
```

> ## 使用例

```python
class CumulativeSum:
  def __init__(self, size):
    self.data = [0] * size
    self.size = size

  def add(self, key, value):
    self.data[key] += value

  def build(self):
    for i in range(1, self.size):
      self.data[i] += self.data[i - 1]
  
  def query(self, kukan):
    if kukan < 0:
      return 0
    return self.data[min(kukan, self.size - 1)]

import sys

stdin = sys.stdin
na = lambda: map(int, stdin.readline().split())
ns = lambda: stdin.readline().rstrip()
ni = lambda: int(ns())

def main():
  n, k = na()

  CS = CumulativeSum(n)
  for i in range(n):
    a = ni()
    CS.add(i, a)

  CS.build()

  ans = -int(1e9+7)
  for i in range(n-k+1):
    ans = max(ans, CS.query(k+i) - CS.query(i))
  print(ans)

main()
```

> ### C++

[前のに戻る]({{ site.KyoProurl }}/KyoPro)<br>

[トップページに戻る]({{ site.reseturl }})<br>