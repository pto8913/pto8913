#include <iostream>
#include <vector>

using namespace std;

x

#define rep(i, a, n) for(int i = a; i < (n); ++i)

int main(){
  cin.tie(0);
  ios::sync_with_stdio(false);
  int n, q;
  cin >> n >> q;

  BIT<int> bit(n);

  int t, x, y;
  rep(i, 0, q) {
    cin >> t >> x >> y;
    if (t == 0) bit.add(x - 1, y);
    else cout << bit.sum(y - 1) - bit.sum(x - 2) << endl;
  }
}