[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 最大公約数(gcd)最小公倍数(lcm) <br>
[トップページに戻る]({{ site.reseturl }})

# 最大公約数最小公倍数
2019/09/29/10:20 pto8913

## 説明
最大公約数 gcdと最小公倍数 lcmを求める

## 計算量
O(logN))

## 実装例
```python
def gcd(n, m):
  while m:
    n, m = m, n%m
  return n

def lcm(n, m):
  return n * m // gcd(n, m)
```

[前に戻る]({{ site.KyoProurl }}/KyoPro)

[トップページに戻る]({{ site.reseturl }})
