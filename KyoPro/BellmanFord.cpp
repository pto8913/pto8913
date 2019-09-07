#include <iostream>
#include <vector>

using namespace std;

#define rep(i, a, n) for(int i = a; i < (n); ++i)
#define ll long long
#define Pid pair<int, double>
#define Pdi pair<double, int>
#define mkp(a, b) make_pair(a, b)
#define P pair<ll, ll>

const ll INF = 1LL << 60;

struct Graph {
  Graph(int size) : adj(size, vector<Pid>()) { this-> n = size; }

  void addEdge(int a, int b, double w) {
    adj[a].push_back(mkp(b, w));
  }

  void bellmanFord(int a) {
    d = vector<double>(n, INF);
    de = vector<double>(n);
    d[a] = 0;
    vector<pair<P, double>> edges;
    rep(i, 0, n) {
      for (auto x : adj[i]) {
        edges.push_back(mkp(P(i, x.first), x.second));
      }
    }
    int loopcnt = 0;
    while (true) {
      ++loopcnt;
      bool update = false;
      for (auto e : edges) {
        if (d[e.first.first] != INF && d[e.first.second] > d[e.first.first] + e.second) {
          if (loopcnt < n) {
            de[e.first.second] = d[e.first.first] + e.second;
          }
          d[e.first.second] = d[e.first.first] + e.second;
          update = true;
        }
      }
      if (!update) break;
      if (loopcnt == n) {
        negativeLoop = true;
        break;
      }
    }
  }

  bool hasNegativeLoop() {
    return negativeLoop;
  }na

  bool hasNegativeLoop(int a) {
    return d[a] != de[a];
  }

  double dist(int a) {
    return d[a];
  }

private:
  int n;
  vector<vector<Pid>> adj;
  vector<double> d;
  vector<double> de;
  bool negativeLoop = false;
};

int main(){
  int n, m;
  scanf("%d%d", &n, &m);

  Graph g(n);
  int a, b, c;
  rep(i, 0, m) {
    scanf("%d%d%d", &a, &b, &c);
    --a; --b;
    g.addEdge(a, b, -c);
  }
  g.bellmanFord(0);
  if (g.hasNegativeLoop(n - 1)) {
    cout << "inf" << endl;
  } else {
    cout << - long(g.dist(n - 1)) << endl;
  }
}