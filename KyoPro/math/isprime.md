[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 素数判定(isprime) <br>
[トップページに戻る]({{ site.reseturl }})

# 素数判定
2019/09/28 pto8913

## 解説
素数判定

## 計算量
O(√n)

## 実装例

### python

```python
def isprime(n):
  if n == 1:
    return False
  for i in range(2, int(n**0.5) + 1):
    if (n % i == 0):
      return False
  return True
```

### C++
```cpp
template<typename T>
bool isprime(T n) {
  if (n == 1) return false;
  for (int i = 2;  i * i <= n; ++i) {
    if (n % i == 0) return false;
  }
  return true;
}
```
## 使用例
* [ABC142_D-Disjoint_Set_of_Common_Divisors](https://atcoder.jp/contests/abc142/tasks/abc142_d)<br>
<br>

[前に戻る]({{ site.KyoProurl }}/KyoPro)

[トップページに戻る]({{ site.reseturl }})
