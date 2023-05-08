[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro単一始点最短路(BellmanFord) <br>
[トップページに戻る]({{ site.reseturl }})

# 単一始点最短路(BellmanFord)
2019/09/29 pto8913

## 説明
単一始点全点間最短路を求める。<br>
[Dijkstra]({{ site.KyoProurl }}/Search/Dijkstra)より遅いが、負辺があっても動作し、負閉路も検出できる。<br>

## 計算量
O(VE)

## 実装例
### python
```python
INF = int(1e18)

class BellmanFord:
  def __init__(self, N):
    self.N = N
    self.edge = []
  
  def addEdge(self, a, b, cost):
    self.edge.append((a, b, cost))
  
  def addBiEdge(self, a, b, cost):
    self.addEdge(a, b, cost)
    self.addEdge(b, a, cost)

  def calc(self, start):
    dist = [INF] * self.N
    dist[start] = 0
    update = True
    cnt = 0
    while update:
      update = False
      cnt += 1
      if cnt > self.N:
        return -INF
      for a, b, cost in self.edge:
        ncost = dist[a] + cost
        if dist[a] == INF or ncost >= dist[b]:
          continue
        dist[b] = ncost
        update = True
    return dist
```

### C++
```cpp
#include <vector>

const long long INF = 1LL << 60;

#define Pid pair<int, double>
#define Pdi pair<double, int>
#define mkp(a, b) make_pair(a, b)
#define ll long long
#define P pair<ll, ll>

struct Graph {
  Graph(int size) : edge(size, vector<Pid>()) { this->n = size; }

  void addEdge(int a, int b, double w) {
    edge[a].push_back(mkp(b, w));
  }

  void BellmanFord(int start) {
    dist = vector<double>(n, INF);
    dist[start] = 0;
    update = true;
    cnt = 0;
    while (update) {
      update = false;
      cnt += 1
      if (cnt > n) {
        return -INF;
      }
      for (auto e: edge)
    }
  }
};
```

## 使用例
* [AOJ GRL_1_B:Single_Source_Shortest_Path(NegativeEdges)](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=GRL_1_B)

### python
```python
import sys

stdin = sys.stdin

ns = lambda : stdin.readline().rstrip()
ni = lambda : int(ns())
na = lambda : list(map(int, stdin.readline().split()))

# BellmanFord 省略

def main():
  v, e, r = na()
  BF = BellmanFord(v)
  for _ in range(e):
    BF.addEdge(*na())

  ans = BF.calc(r)
  if ans == -INF:
    print("NEGATIVE CYCLE")
  else:
    for i in range(v):
      print('INF' if ans[i] == INF else ans[i])

main()
```
<br>

[前に戻る]({{ site.KyoProurl }}/KyoPro)

[トップページに戻る]({{ site.reseturl }})
