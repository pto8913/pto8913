[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 幅優先探索(BFS)<br>
[トップページに戻る]({{ site.reseturl }})<br>

# 幅優先探索(BFS)
2019/09/05/13:57 pto8913 <br>

## 説明
探索の始点からから、各地点への最短距離を求めることができる。

## 条件
基本的に無向グラフであって <br>
各辺の重みがすべて等しいグラフ <br>
重みがある場合には[ダイクストラ法]()など

## 計算量
頂点数 : N 辺数 : M として<br>
* 各頂点はキューに一回挿入され一回取り出されるので O(N)
* 各辺は一回だけ探索されるので O(M) <br>
あわせて O(N + M) となる

## 実装例

[python](#pythonグラフ例)
[C++](#C++グラフ例)

## グラフ上の探索

頂点0から各頂点への距離を求めることができる

### pythonグラフ例

<details>
<summary> コード </summary>

```python
# import sys
#sys.setrecursionlimit(10**6) # 問題によっては必要になるかも
from collections import deque

q = deque()

graph = [[1, 4, 2], [0, 4, 3, 8], [0, 5], [1, 8, 7], [1, 0, 8], [2, 8, 6], [7, 5], [3, 6], [1, 4, 3, 5]]
dist = [-1] * 9
dist[0] = 0
q.append(0)

def bfs():
  while q:
    vertex = q.popleft()
    for next_vertex in graph[vertex]:
      if dist[next_vertex] == -1:
        dist[next_vertex] = dist[vertex] + 1
        q.append(next_vertex)

bfs()

for v in range(9):
  print(v, ":", dist[v])
```

各頂点について頂点0からの距離を求められる。
```
output
0 : 0
1 : 1
2 : 1
3 : 2
4 : 1
5 : 2
6 : 3
7 : 3
8 : 2
```

</details>

### C++グラフ例

<details>
<summary> コード </summary>

```cpp
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

#define rep(i, n) for(int i = 0; i < (n); ++i)

int main(){
  vector<vector<int>> graph = { 
    {1, 4, 2}, {0, 4, 3, 8}, {0, 5}, {1, 8, 7}, {1, 0, 8},
    {2, 8, 6}, {7, 5}, {3, 6}, {1, 4, 3, 5} };

  vector<int> dist(9, -1);
  queue<int> q;
  dist[0] = 0;
  q.push(0);

  while (!q.empty()) {
    int vertex = q.front();
    q.pop();

    for (int next_vertex : graph[vertex]) {
      if (dist[next_vertex] == -1) {
        dist[next_vertex] = dist[vertex] + 1;
        q.push(next_vertex);
      }
    }
  }

  for (int v = 0; v < 9; ++v) {
    printf("%d : %d\n", v, dist[v]);
  }
}
```

各頂点について頂点0からの距離を求められる。
```
output
0 : 0
1 : 1
2 : 1
3 : 2
4 : 1
5 : 2
6 : 3
7 : 3
8 : 2
```

</details>

## グリッド上の探索例

<details>
<summary> 例題 </summary>

* [ABC007 C-幅優先探索](https://atcoder.jp/contests/abc007/tasks/abc007_3)

</details>

[python](#pythonグリッド例)
[C++](#C++グリッド例)

探索開始地点から目的地までの距離を求められる

### pythonグリッド例

<details>
<summary> コード </summary>

```python
import sys

sys.setrecursionlimit(10**6)

stdin = sys.stdin.readline
na = lambda: map(int, stdin().split())
ns = lambda: stdin().rstrip()
ni = lambda: int(ns())

r, c = na()
sy, sx = na()
gy, gx = na()
maze = [list(ns()) for _ in range(r)]
ans = [[-1 for _ in range(c)]for _ in range(r)]

from collections import deque
q = deque()
q.append((sx, sy))
ans[sy][sx] = 0

def bfs():
  while q:
    x, y = q.popleft()
    if x == gx and y == gy:
      return ans[gy][gx]
    for dx, dy in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
      nx = x + dx
      ny = y + dy
      if ans[ny][nx] == -1 and maze[ny][nx] != "#":
        q.append((nx, ny))
        ans[ny][nx] = ans[y][x] + 1

print(bfs())
```

</details>

### C++グリッド例

<details>
<summary> コード </summary>

```cpp
#include <iostream>
#include <queue>

using namespace std;

#define rep(i, n) for(int i = 0; i < (n); ++i)
#define mkp(a, b) make_pair(a, b)
#define P pair<int, int>

int dx[4] = { 0, 0, 1, -1 };
int dy[4] = { 1, -1, 0, 0 };

int main(){
  int r, c, sy, sx, gy, gx;
  cin >> r >> c >> sy >> sx >> gy >> gx;
  --sy; --sx; --gy; --gx;

  char graph[111][111];
  int dist[111][111]; 
  rep(y, r) {
    rep(x, c) {
       cin >> graph[y][x];
       dist[y][x] = -1;
    }
  }
  dist[sy][sx] = 0;

  queue<P> que;
  que.push(mkp(sx, sy));
  
  while (!que.empty()) {
    P p = que.front();
    que.pop();
    int x = p.first;
    int y = p.second;
    if (y == gy && x == gx) break;
    rep(i, 4) {
      int mx = dx[i] + x;
      int my = dy[i] + y;
      if (graph[my][mx] != '#' && dist[my][mx] == -1) {
        que.push(mkp(mx, my));
        dist[my][mx] = dist[y][x] + 1;
      }
    }
  }
  cout << dist[gy][gx] << endl;
}
```

</details>

[前のページに戻る]({{ site.KyoProurl }}/KyoPro)<br>

[トップページに戻る]({{ site.reseturl }})<br>