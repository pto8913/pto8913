#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

const long long INF = 1LL<<60;

#define Pdi pair<double, int>
#define Pid pair<int, double>
#define mkp(a, b) make_pair(a, b)
#define ll long long
#define rep(i, a, n) for(int i = a; i < (n); ++i)

struct Graph {
  Graph(int size) : adj(size, vector<Pid>()) { this-> n = size; }

  void addEdge(int a, int b, double w) {
    adj[a].push_back(mkp(b, w));
    adj[b].push_back(mkp(a, w));
  }

  void dijkstra(int a) {
    d = vector<double>(n, INF);
    d[a] = 0;
    priority_queue<Pdi, vector<Pdi>, greater<Pdi>> que;
    que.push(mkp(0, a));

    while (!que.empty()) {
      int u = que.top().second;
      que.pop();

      for (auto i: adj[u]) {
        if (d[i.first] > d[u] + i.second) {
          d[i.first] = d[u] + i.second;
          que.push(mkp(d[i.first], i.first));
        }
      }
    }
  }

  double dist(int a) {
    return d[a];
  }

private:
  int n;
  vector<vector<Pid>> adj;
  vector<double> d;
};

int main(){
  ll n, m, s, t;
  scanf("%lld%lld%lld%lld", &n, &m, &s, &t);
  --s; --t;
  Graph yen(n), snuke(n);
  rep(i, 0, m) {
    ll u, v, a, b;
    scanf("%lld%lld%lld%lld", &u, &v, &a, &b);
    --u; --v;
    yen.addEdge(u, v, a);
    snuke.addEdge(u, v, b);
  }
  yen.dijkstra(s);
  snuke.dijkstra(t);

  vector<ll> ans;
  rep(i, 0, n) {
    ll a = 1e15 - yen.dist(n - 1 - i) - snuke.dist(n - 1 - i);
    if (ans.empty() || a > ans.back()) {
      ans.push_back(a);
    } else {
      ans.push_back(ans.back());
    }
  }

  reverse(ans.begin(), ans.end());
  for (auto e : ans) {
    cout << e << endl;
  }
}