[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 素数判定 <br>
[トップページに戻る]({{ site.reseturl }})

# 素数判定
2019/09/28 pto8913

## 解説
素数判定

## 計算量
O(√n)

## 実装例
```python
def isprime(n):
  if n == 1:
    return False
  for i in range(2, int(n**0.5) + 1):
    if (n % i == 0):
      return False
  return True
```
<br>

[前に戻る]({{ site.KyoProurl }}/KyoPro)

[トップページに戻る]({{ site.reseturl }})
