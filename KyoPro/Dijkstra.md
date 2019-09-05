[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro ダイクストラ法(Dijkstra))<br>
[トップページに戻る]({{ site.reseturl }})<br>

# ダイクストラ法(Dijkstra)
2019/09/05/16:10 pto8913

## 説明
* 辺の長さが**非負**である有向(無向)グラフにおいて、 <br>
ある一つの始点から全頂点への最短経路の長さを求めることができる。<br><br>

* 探索候補の中で、暫定最短距離が最も小さい頂点を取り出す
* 頂点vから伸びる辺を用いて暫定最短距離を更新できる頂点がある場合、<br>
更新してその頂点を探索候補に加える。
を繰り返すアルゴリズム。

## 計算量
* O(ElogV)

## 実装例

<details>
<summary> コード </summary>

```python

```

</details>



[前のページに戻る]({{ site.KyoProurl }}/KyoPro)<br>

[トップページに戻る]({{ site.reseturl }})<br>