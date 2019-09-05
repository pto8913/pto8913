[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro templates<br>

[トップページに戻る]({{ site.reseturl }})<br>

# memo

## 高速化

## python

### 入力受け取り

データ数が少ない時は`input`のほうが速くなることが多い

```python
import sys

stdin = sys.stdin.readline
na = lambda: map(int, stdin().split())
ns = lambda: stdin().rstrip()
ni = lambda: int(ns())
```

### 実行時

関数でくくってやるととても早くなる

```python
def main():
  # 処理

if __name__ == "__main__":
  main()
```

### 小技

```python
x = [1, 2, 3]
if 1 in x:
  print("Yes")

# リスト型よりタプル型のほうが処理が速くなる
x = (1, 2, 3)
if 1 in x:
  print("Yes")
```

```python
x = range(11)
# result : range(0, 11)
# これでforまわせる
```

```python
it = iter(list(range(1, 11)))
for i in it:
  if i == 3:
    next(it)
    continue
  print(i)

"""
1 2 4 5 6 7 8 9 10
"""
```


[前のに戻る]({{ site.KyoProurl }}/KyoPro)<br>

[トップページに戻る]({{ site.reseturl }})<br>