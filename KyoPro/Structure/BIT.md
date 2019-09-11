[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro Binary Indexed Tree(BIT)<br>
[トップページに戻る]({{ site.reseturl }})<br>

# Binary Indexed Tree(BIT)
2019/09/11/1:21 pto8913 <br>

## 説明
数列に対し、
* ある要素に値を加える操作
* 区間和を求める操作 <br>
を行うことができる。<br>

## 計算量
* O(logN)

## 実装例

### python

<details>
<summary> コード </summary>

```python
class BIT:
  def __init__(self, size):
    self.tree = [0] * (size + 1)
  
  def sum(self, a):
    res = 0
    a += 1
    while a:
      res += self.tree[a]
      a -= a & -a
    return res
    
  def add(self, a, x):
    a += 1
    while a < len(self.tree):
      self.tree[a] += x
      a += a & -a
```

</details>
<br>

### C++

<details>
<summary> コード </summary>

```cpp
#include <iostream>
#include <vector>

using namespace std;

template<typename T>
struct BIT {
  vector<T> tree;

  BIT(int size) : tree(size + 1, 0) {};

  T sum(int a) {
    T res = 0;
    ++a;
    while (a) {
      res += tree[a];
      a -= a & -a;
    }
    return res;
  }

  T add(int a, int x) {
    ++a;
    while (a < tree.size()) {
      tree[a] += x;
      a += a & -a;
    }
  }
};
```

</details>

## 使用例

### 例題 
* [AOJ DSL 2 B Range Sum Query](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=DSL_2_B&lang=jp)
<br>

### python

<details>
<summary> コード </summary>

```python
class BIT:
  # 省略

import sys

stdin = sys.stdin
na = lambda: map(int, stdin.readline().split())
ns = lambda: stdin.readline().rstrip()
ni = lambda: int(ns())

def main():
  n, q = na()
  bit = BIT(n)
  for _ in range(q):
    t, x, y = na()
    if t == 0:
      bit.add(x - 1, y)
    else:
      print(bit.sum(y - 1) - bit.sum(x - 2))

main()
```
</details>
<br>

### C++

<details>
<summary> コード </summary>

```cpp
#include <iostream>
#include <vector>

using namespace std;

template<typename T>
struct BIT {
  // 省略
};

#define rep(i, a, n) for(int i = a; i < (n); ++i)

int main(){
  cin.tie(0);
  ios::sync_with_stdio(false);
  int n, q;
  cin >> n >> q;

  BIT<int> bit(n);

  int t, x, y;
  rep(i, 0, q) {
    cin >> t >> x >> y;
    if (t == 0) bit.add(x - 1, y);
    else cout << bit.sum(y - 1) - bit.sum(x - 2) << endl;
  }
}
```

</details>
<br>

[前のページに戻る]({{ site.KyoProurl }}/KyoPro)<br>

[トップページに戻る]({{ site.reseturl }})<br>