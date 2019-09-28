[前のページに戻る]({{ site.KyoProurl }}/KyoPro) > 競プロ用ライブラリ KyoPro 約数列挙 <br>
[トップページに戻る]({{ site.reseturl }})

# 約数列挙
2019/09/25 13:02

## 説明
約数を列挙する

## 計算量
O(√n)

## 実装

### python
```python
def divi(n):
  res = []
  for i in range(1, int(n**0.5)+1):
    if n % i == 0:
      res.append(i)
      if i != n // i:
        res.append(n // i)
  return res
```
### C++
```cpp
template<typename T>
vector<T> divi(T n) {
  vector<T> res;
  for (T i = 1; i * i <= n; ++i) {
    if (n % i == 0) {
      res.push_back(i);
      if (i * i != n) ret.push_back(n / i);
    }
  }
  sort(begin(res), end(res));
  return res;
}
```
<br>

[前に戻る]({{ site.KyoProurl }}/KyoPro)

[トップページに戻る]({{ site.reseturl }})
