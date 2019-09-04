[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 累積和(Cumulative-Sum)<br>
[トップページに戻る]({{ site.reseturl }})<br>

# 累積和(Cumulative-Sum)
2019/09/04/17:53

> ## 説明

単純な累積和<br>
前計算として事前に累積和を取ることで、区間の和をO(1)で求めることができる<br>

> ## 計算量

* 前計算(構築) O(n)
* クエリ(区間の和) O(1)

> ## 実装例

[python](#python実装例 ) <br>
[C++](#Cpp実装例) <br>

### python実装例 

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

```

### Cpp実装例

```cpp
template<class T>
struct CumulativeSum {
  vector< T > data;

  CumulativeSum(int size) : data(size, 0) {};

  void add(int key, T value) {
    data[key] += value;
  }

  void build(){
    rep(i, 1, data.size()) {
      data[i] += data[i - 1];
    }
  }

  T query(int kukan) {
    if (kukan < 0) {
      return 0;
    }
    return data[min(kukan, (int)data.size() - 1)];
  }
};
```

> ## 使用例

### 例題
* [AOJ0516 JOI2006 本選A 最大の和](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=0516) <br>


 [python](#python使用例) <br>
 [C++](#Cpp使用例) <br>

### python使用例

```python
class CumulativeSum:
  # 省略

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

### Cpp使用例

```cpp
#include <iostream>
#include <vector>

using namespace std;

#define rep(i, a, n) for(int i = a; i < (n); ++i)
#define INF 1000000007

template<class T>
struct CumulativeSum {
  // 省略
};

int main() {
  int n, k;
  cin >> n >> k;

  CumulativeSum<int> CS(n);
  rep(i, 0, n) {
    int a;
    cin >> a;
    CS.add(i, a);
  }

  CS.build();

  int ans = -INF;
  rep(i, 0, n - k + 1) {
    ans = max(ans, CS.query(k + i - 1) - CS.query(i - 1));
  }

  cout << ans << endl;
}
```

[前に戻る]({{ site.KyoProurl }}/KyoPro)<br>

[トップページに戻る]({{ site.reseturl }})<br>