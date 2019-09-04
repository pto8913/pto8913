[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 素集合データ構造(Union-Find)<br>
[トップページに戻る]({{ site.reseturl }})<br>

# 素集合データ構造(Union-Find)

> ## 説明

* 集合を併合する操作(unite) <br>
* ある要素がどの集合に属しているか(find) <br>
* 同じ集合に属するか(same) <br>
を問い合わせる操作を行うことができる。<br>

[わかりやすいスライド](slideshare.net/chokudai/union-find-49066733)

> ## 計算量

* O(α(n)) <br>
α(n)は[アッカーマン関数](https://mathtrain.jp/ackermann) A(n,n)の逆関数 <br>
めちゃくちゃ小さい計算量になる

> ## 種類

[通常UnionFind](#通常UnionFind) <br>
[重み付きUnionFind](#重み付きUnionFind) <br>

> # UnionFind実装例
<!---------------------- UnionFind実装例 --------------------->

[python](#python)<br>
[C++](#C++)<br>

### python
<details>
  <summary> python実装例 </summary>

  ```python
  class UnionFind:
    def __init__(self, n):
      self.tree = [-1] * n
    
    # xとyの属する集合を併合
    def unite(self, a, b):
      a = self.root(a)
      b = self.root(b)
      if(a == b):
        return
      self.tree[b] = a
    
    # 木の根を求める
    def root(self, a):
      if(self.tree[a] < 0):
        return a
      else:
        self.tree[a] = self.root(self.tree[a])
        return self.tree[a]

    # xとyが同じ集合に属するか否か
    def same(self, a, b):
      return self.root(a) == self.root(b)
  ```
</details>

### C++

<details>
  <summary> C++実装例 </summary>

  ```cpp
  struct UnionFind {
    std::vector<int> tree;

    UnionFind(int size) : tree(size, -1) {};

    bool unite(int a, int b) {
      a = root(a);
      b = root(b);
      if (a == b) return false;
      tree[b] = a;
      return true;
    }

    int root(int a) {
      if (tree[a] < 0) return a;
      return tree[a] = root(tree[a]);
    }

    bool same(int a, int b) {
      return root(a) == root(b);
    }
  };
  ```
</details>

<!---------------------- UnionFind使用例 --------------------->
> ## 使用例

<details>
  <summary> 例題 </summary>

  * [ATC 001 B-Union Find](https://atcoder.jp/contests/atc001/tasks/unionfind_a)<br>
  * [ABC 049 D-連結](https://atcoder.jp/contests/abc049/tasks/arc065_b)<br>
  * [ARC 097 D-Equals](https://atcoder.jp/contests/arc097/tasks/arc097_b)<br>
  * [ARC 036 D-偶数メートル](https://atcoder.jp/contests/arc036/tasks/arc036_d)<br>
  * [JOI 2011 本選 E-JOI国お祭り事情](https://atcoder.jp/contests/joi2012ho/tasks/joi2012ho5)<br>
</details>

[python](#python例) <br>
[C++](#C++例) <br>

### python例
<details>
  <summary> python使用例 </summary>

  ```python
  class UnionFind:
    # 省略

  import sys

  stdin = sys.stdin
  na = lambda: map(int, stdin.readline().split())
  ns = lambda: stdin.readline().rstrip()
  ni = lambda: int(ns())

  def main():
    n, q = na()

    uf = UnionFind(n)

    ans = ["No", "Yes"]
    for _ in range(q):
      p, a, b = na()
      if p == 0:
        uf.unite(a, b)
      else:
        print(ans[uf.same(a, b)])

  main()
  ```
</details>

### C++例
<details>
  <summary> C++使用例 </summary>

  ```cpp
  #include <iostream>
  #include <vector>

  using namespace std;

  struct UnionFind {
    // 省略
  };

  int main() {
    int n, q;
    cin >> n >> q;

    UnionFind uf(n);
    for(int i = 0; i < q; ++i) {
      int p, a, b;
      cin >> p >> a >> b;
      if (p == 0) {
        uf.unite(a, b);
      } else {
        if (uf.same(a, b)) {
          cout << "Yes" << endl;
        } else {
          cout << "No" << endl;
        }
      }
    }
  }
  ```
</details>

> # 重み付きUnionFind

<!---------------------- 重み付きUnionFind実装例 --------------------->

[python](#python重み実装例) <br>
[C++](#C++重み実装例) <br>

### python重み実装例
<details>
  <summary> python実装例 </summary>

  ```python
  class WeightUnionFind:
    def __init__(self, n):
      self.tree = [-1] * n
      self.rank = [0] * n
      self.diff_weight = [0] * n
    
    def unite(self, a, b, w):
      w += self.weight(a)
      w -= self.weight(b)
      a = self.root(a)
      b = self.root(b)
      if a == b:
        return
      if self.rank[a] < self.rank[b]:
        a, b = b, a
        w *= -1
      if self.rank[a] == self.rank[b]:
        self.rank[a] += 1
      self.tree[b] = a
      self.diff_weight[b] = w
      
    def root(self, a):
      if(self.tree[a] < 0):
        return a
      else:
        res = self.root(self.tree[a])
        self.diff_weight[a] += self.diff_weight[self.tree[a]]
        self.tree[a] = res
        return self.tree[a]

    def same(self, a, b):
      return self.root(a) == self.root(b)

    def weight(self, a):
      self.root(a)
      return self.diff_weight[a]

    def diff(self, a, b):
      return self.weight(b) - self.weight(a)
  ```
</details>

### C++重み実装例
<details>
  <summary> C++実装例 </summary>

  ```cpp
  template<class T>
  struct WeightUnionFind {
    vector<int> tree;
    vector<int> rank;
    vector<T> diff_weight;

    WeightUnionFind (int size) : tree(size, -1), rank(size, 0), diff_weight(size, 0) {} ;

    int root(int a) {
      if (tree[a] < 0) return a;
      int res = root(tree[a]);
      diff_weight[a] += diff_weight[tree[a]];
      return tree[a] = res;
    }

    bool same(int a, int b) {
      return root(a) == root(b);
    }

    bool unite(int a, int b, T w) {
      w += weight(a); w -= weight(b);
      a = root(a); b = root(b);
      if (a == b) return false;
      if (rank[a] < rank[b]) {
        swap(a, b);
        w *= -1;
      }
      if (rank[a] == rank[b]) ++rank[a];
      tree[b] = a;
      diff_weight[b] = w;
      return true;
    }

    T weight(int a) {
      root(a);
      return diff_weight[a];
    }

    T diff(int a, int b) {
      return weight(b) - weight(a);
    }
  };
  ```
</details>

<!---------------------- 重み付きUnionFind使用例 --------------------->

> ## 使用例

<details>
  <summary> 例題 </summary>

  * [AOJ WeightUnionFind](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=DSL_1_B)<br>
  * [ABC087 D-People on a line](https://beta.atcoder.jp/contests/abc087/tasks/arc090_b)<br>
  * [AOJ 1330 Never Wait for Weights](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=1330)<br>
  * [AOJ 2207 無矛盾な単位系](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=2207)<br>
  * [AOJ 2427 細長いところ](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=2427)<br>

</details>

[python](#python重み使用例) <br>
[C++](#C++重み使用例) <br>

### python重み使用例
<details>
  <summary> python使用例 </summary>

  ```python
  class WeightUnionFind:
    # 省略

  import sys

  stdin = sys.stdin
  na = lambda: map(int, stdin.readline().split())
  ns = lambda: stdin.readline().rstrip()
  ni = lambda: int(ns())

  def main():
    n, m = na()
    wuf = WeightUnionFind(n)
    for _ in range(m):
      t = list(na())
      a, b, c = t[0], t[1], t[2]
      if a == 0:
        d = t[3]
        wuf.unite(b, c, d)
      else:
        if wuf.same(b, c):
          print(wuf.diff(b, c))
        else:
          print("?")

  main()
  ```
</details>

### C++重み使用例
<details>
  <summary> C++使用例 </summary>

  ```cpp
  #include <iostream>
  #include <vector>

  using namespace std;

  template<class T>
  struct WeightUnionFind {
    // 省略
  };

  #define rep(i, a, n) for(int i = a; i < (n); ++i)

  int main(){
    int n, m;
    cin >> n >> m;
    
    WeightUnionFind<int> wuf(n);
    rep(i, 0, m) {
      int a, b, c, d;
      cin >> a >> b >> c;
      if (a == 0) {
        cin >> d;
        wuf.unite(b, c, d);
      } else {
        if (wuf.same(b, c)) {
          cout << wuf.diff(b, c) << endl;
        } else {
          cout << "?" << endl;
        }
      }
    }
  }
  ```
</details>

[上部に戻る](#Union-Find)

[前のに戻る]({{ site.KyoProurl }}/KyoPro)<br>

[トップページに戻る]({{ site.reseturl }})<br>