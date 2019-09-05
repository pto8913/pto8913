[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 深さ優先探索(DFS)<br>
[トップページに戻る]({{ site.reseturl }})<br>

# 深さ優先探索(DFS)
2019/09/05/13:42 pto8913 <br>

## 計算量
頂点数 : N 辺数 : M として<br>
* 各頂点はそれぞれ一回取り出されるので O(N)
* 各辺は一回だけ探索されるので O(M) <br>
あわせて O(N + M) となる

## 実装例

[python](#python実装例) <br>
[C++](#C++実装例)

### python実装例

```python
import sys

sys.setrecursionlimit(10**6) # pythonなら必須

def dfs(x, y):
  if x < 0 or y < 0 or x >= w or y >= h or maze[y][x] == "#":
    return False
  if reach[y][x]:
    return False
  reach[y][x] = True
  if maze[y][x] == "g":
    return True
  return dfs(x+1, y) or dfs(x-1, y) or dfs(x, y+1) or dfs(x, y-1)
```

### C++実装例

```cpp
// 関数の前にmazeやreachを用意しておく必要がある
char maze[100][100];
bool reach[100][100] = { false };

bool dfs(int x, int y){
  if (x < 0 || y < 0 || x >= w || y >= h || maze[y][x] == '#') {
    return false;
  }
  if (reach[y][x]) return false;
  reach[y][x] = true;
  if (maze[y][x] == 'g') return true;
  return dfs(x+1, y) || dfs(x-1, y) || dfs(x, y+1) || dfs(x, y-1);
}
```

<details>
<summary> 例題 </summary>

* [ATC001 A-DFS](https://atcoder.jp/contests/atc001/tasks/dfs_a)
* [ARC031 B-埋め立て](https://atcoder.jp/contests/arc031/tasks/arc031_2)
* [ARC037 B-バウムテスト](https://atcoder.jp/contests/arc037/tasks/arc037_b)
* [AOJ1160 島はいくつある？](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1160&lang=jp)
* [POJ2386 Lake Counting](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1160&lang=jp)

</details>

[前のページに戻る]({{ site.KyoProurl }}/KyoPro)<br>

[トップページに戻る]({{ site.reseturl }})<br>