export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  complexity: string;
  code: string;
}

export const categories = [
  { key: "all", label: "全部" },
  { key: "math", label: "数学" },
  { key: "graph", label: "图论" },
  { key: "ds", label: "数据结构" },
  { key: "string", label: "字符串" },
  { key: "other", label: "其他" },
] as const;

export const templates: Template[] = [
  {
    id: "fastpower",
    title: "快速幂",
    description: "二分快速幂 O(log n)，支持取模",
    category: "math",
    complexity: "O(log n)",
    code: `long long binpow(long long a, long long b, long long p) {
    long long res = 1;
    while (b > 0) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}`,
  },
  {
    id: "prime-table",
    title: "质数与质因数分解",
    description: "线性筛 + 埃氏筛 + 质因数分解 + 约数个数/和 + 欧拉函数",
    category: "math",
    complexity: "O(n) 筛 / O(√n) 分解",
    code: `struct PrimeTable {
    int n;
    vector<int> primes, minp;
    vector<bool> isPrime;

    void init(int n_) {
        n = n_;
        minp.assign(n + 1, 0);
        isPrime.assign(n + 1, false);
        primes.clear();
    }

    // 线性筛 O(n)
    void eulerSieve() {
        fill(minp.begin(), minp.end(), 0);
        fill(isPrime.begin(), isPrime.end(), false);
        primes.clear();
        for (int i = 2; i <= n; i++) {
            if (minp[i] == 0) {
                minp[i] = i;
                primes.push_back(i);
                isPrime[i] = true;
            }
            for (auto p : primes) {
                if (1LL * i * p > n) break;
                minp[i * p] = p;
                if (i % p == 0) break;
            }
        }
    }

    // 埃氏筛 O(n log log n)
    void eratosthenes() {
        fill(isPrime.begin(), isPrime.end(), true);
        if (n >= 0) isPrime[0] = false;
        if (n >= 1) isPrime[1] = false;
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                primes.push_back(i);
                minp[i] = i;
                if (1LL * i * i <= n)
                    for (int j = i * i; j <= n; j += i) {
                        isPrime[j] = false;
                        if (minp[j] == 0) minp[j] = i;
                    }
            }
        }
    }

    // 质因数分解
    vector<pair<i64, int>> factorize(i64 x) const {
        vector<pair<i64, int>> res;
        if (x <= 1) return res;
        for (auto p : primes) {
            if (1LL * p * p > x) break;
            if (x % p == 0) {
                int cnt = 0;
                while (x % p == 0) x /= p, cnt++;
                res.push_back({p, cnt});
            }
        }
        if (x > 1) res.push_back({x, 1});
        return res;
    }
};

// 单个数分解（不依赖筛表）
struct Factorizer {
    static i64 divisorCount(i64 x) {
        auto fac = factorize(x);
        i64 ans = 1;
        for (auto [p, c] : fac) ans *= (c + 1);
        return ans;
    }
    static i64 divisorSum(i64 x) {
        auto fac = factorize(x);
        i64 ans = 1;
        for (auto [p, c] : fac) {
            i64 cur = 1, sum = 1;
            for (int i = 1; i <= c; i++)
                cur *= p, sum += cur;
            ans *= sum;
        }
        return ans;
    }
    static i64 phi(i64 x) {
        i64 ans = x;
        for (i64 p = 2; p * p <= x; p++)
            if (x % p == 0) {
                ans = ans / p * (p - 1);
                while (x % p == 0) x /= p;
            }
        if (x > 1) ans = ans / x * (x - 1);
        return ans;
    }
};`,
  },
  {
    id: "modint-comb",
    title: "取模类与组合数",
    description: "自动取模整数类 + 阶乘逆元组合数预处理",
    category: "math",
    complexity: "O(1) 查询 / O(n) 预处理",
    code: `const int MOD = 1e9+7;

struct Z {
    int x;
    Z(long long v = 0) {
        if (v < 0) v = v % MOD + MOD;
        if (v >= MOD) v %= MOD;
        x = v;
    }
    int val() const { return x; }

    Z &operator+=(const Z &rhs) { x += rhs.x; if (x >= MOD) x -= MOD; return *this; }
    Z &operator-=(const Z &rhs) { x -= rhs.x; if (x < 0) x += MOD; return *this; }
    Z &operator*=(const Z &rhs) { x = 1LL * x * rhs.x % MOD; return *this; }
    Z &operator/=(const Z &rhs) { return *this *= rhs.inv(); }

    Z pow(long long n) const {
        Z res = 1, a = *this;
        for (; n; n >>= 1, a *= a)
            if (n & 1) res *= a;
        return res;
    }
    Z inv() const { return pow(MOD - 2); }

    friend Z operator+(Z a, const Z &b) { return a += b; }
    friend Z operator-(Z a, const Z &b) { return a -= b; }
    friend Z operator*(Z a, const Z &b) { return a *= b; }
    friend Z operator/(Z a, const Z &b) { return a /= b; }
    friend bool operator==(const Z &a, const Z &b) { return a.x == b.x; }
    friend ostream &operator<<(ostream &os, const Z &a) { return os << a.x; }
};

struct Comb {
    int n;
    vector<Z> _fac, _inv;
    Comb() : _fac{1}, _inv{0} {}
    void init(int m) {
        if (m <= n) return;
        _fac.resize(m + 1); _inv.resize(m + 1);
        for (int i = n + 1; i <= m; i++) _fac[i] = _fac[i - 1] * i;
        _inv[m] = _fac[m].inv();
        for (int i = m; i > n; i--) _inv[i - 1] = _inv[i] * i;
        n = m;
    }
    Z fac(int x) { if (x > n) init(x); return _fac[x]; }
    Z inv(int x) { if (x > n) init(x); return _inv[x]; }
    Z C(int x, int y) {
        if (x < 0 || y < 0 || x < y) return 0;
        return fac(x) * inv(y) * inv(x - y);
    }
    Z P(int x, int y) {
        if (x < 0 || y < 0 || x < y) return 0;
        return fac(x) * inv(x - y);
    }
} comb(1 << 21);`,
  },
  {
    id: "dijkstra",
    title: "Dijkstra 最短路",
    description: "堆优化 Dijkstra，支持稀疏图",
    category: "graph",
    complexity: "O(m log n)",
    code: `vector<long long> dis(n, 1E18);
auto dijkstra = [&](int s = 0) -> void {
    using PII = pair<long long, int>;
    priority_queue<PII, vector<PII>, greater<PII>> q;
    q.emplace(0, s);
    dis[s] = 0;
    vector<int> vis(n, 0);
    while (!q.empty()) {
        int x = q.top().second;
        q.pop();
        if (vis[x]) continue;
        vis[x] = 1;
        for (auto [y, w] : ver[x]) {
            if (dis[y] > dis[x] + w) {
                dis[y] = dis[x] + w;
                q.emplace(dis[y], y);
            }
        }
    }
};`,
  },
  {
    id: "kruskal",
    title: "Kruskal 最小生成树",
    description: "并查集 + 优先队列实现 Kruskal，适合稠密图",
    category: "graph",
    complexity: "O(m log m)",
    code: `struct DSU {
    vector<int> fa;
    DSU(int n) : fa(n + 1) { iota(fa.begin(), fa.end(), 0); }
    int get(int x) { while (x != fa[x]) x = fa[x] = fa[fa[x]]; return x; }
    bool merge(int x, int y) {
        x = get(x), y = get(y);
        if (x == y) return false;
        fa[y] = x; return true;
    }
    bool same(int x, int y) { return get(x) == get(y); }
};

struct Tree {
    using TII = tuple<int, int, int>;
    int n;
    priority_queue<TII, vector<TII>, greater<TII>> ver;
    Tree(int n) : n(n) {}
    void add(int x, int y, int w) { ver.emplace(w, x, y); }

    int kruskal() {
        DSU dsu(n);
        int ans = 0, cnt = 0;
        while (ver.size()) {
            auto [w, x, y] = ver.top(); ver.pop();
            if (dsu.same(x, y)) continue;
            dsu.merge(x, y);
            ans += w;
            cnt++;
            if (cnt == n - 1) break;
        }
        if (cnt < n - 1) return -1; // 图不连通
        return ans;
    }
};`,
  },
  {
    id: "topo-sort",
    title: "DFS 拓扑排序",
    description: "基于 DFS 三色标记法的拓扑排序，可检测环",
    category: "graph",
    complexity: "O(V + E)",
    code: `using Graph = vector<vector<int>>;

struct TopoSort {
    enum class Status : uint8_t { to_visit, visiting, visited };
    const Graph& graph;
    const int n;
    vector<Status> status;
    vector<int> order;

    TopoSort(const Graph& graph)
        : graph(graph), n(graph.size()),
          status(n, Status::to_visit), order(n) {}

    bool sort() {
        auto it = order.rbegin();
        for (int i = 0; i < n; ++i)
            if (status[i] == Status::to_visit && !dfs(i, it))
                return false;
        return true;
    }

    bool dfs(const int u, vector<int>::reverse_iterator& it) {
        status[u] = Status::visiting;
        for (const int v : graph[u]) {
            if (status[v] == Status::visiting) return false;
            if (status[v] == Status::to_visit && !dfs(v, it))
                return false;
        }
        status[u] = Status::visited;
        *it++ = u;
        return true;
    }
};`,
  },
  {
    id: "segtree",
    title: "线段树（区间加/赋值/求和/最值）",
    description: "模板线段树，支持区间加法、区间赋值、区间求和、区间最值",
    category: "ds",
    complexity: "O(log n)",
    code: `template <class T>
struct Segt {
    struct node {
        int l, r;
        T w, rmq_min, rmq_max;
        T lazy_add, lazy_assign;
        bool has_assign;
    };
    vector<T> w;
    vector<node> t;

    Segt() {}
    Segt(int n) { init(n); }
    Segt(vector<T> in) {
        int n = in.size();
        w.assign(n + 1, 0);
        for (int i = 0; i < n; i++) w[i + 1] = in[i];
        init(n);
    }

    void init(int n) {
        t.resize(n * 4 + 1);
        auto build = [&](auto self, int l, int r, int k = 1) -> void {
            if (l == r) {
                t[k] = {l, r, w[l], w[l], w[l], 0, 0, false};
                return;
            }
            t[k] = {l, r, 0, 0, 0, 0, 0, false};
            int mid = l + (r - l) / 2;
            self(self, l, mid, k << 1);
            self(self, mid + 1, r, k << 1 | 1);
            pushup(k);
        };
        if (n > 0) build(build, 1, n);
    }

    void apply_assign(node &p, T val) {
        p.w = (T)(p.r - p.l + 1) * val;
        p.rmq_min = p.rmq_max = val;
        p.has_assign = true;
        p.lazy_assign = val;
        p.lazy_add = 0;
    }
    void apply_add(node &p, T val) {
        p.w += (T)(p.r - p.l + 1) * val;
        p.rmq_min += val; p.rmq_max += val;
        if (p.has_assign) p.lazy_assign += val;
        else p.lazy_add += val;
    }

    void pushdown(int k) {
        if (t[k].has_assign) {
            apply_assign(t[k<<1], t[k].lazy_assign);
            apply_assign(t[k<<1|1], t[k].lazy_assign);
            t[k].has_assign = false;
        }
        if (t[k].lazy_add != 0) {
            apply_add(t[k<<1], t[k].lazy_add);
            apply_add(t[k<<1|1], t[k].lazy_add);
            t[k].lazy_add = 0;
        }
    }
    void pushup(int k) {
        t[k].w = t[k<<1].w + t[k<<1|1].w;
        t[k].rmq_min = min(t[k<<1].rmq_min, t[k<<1|1].rmq_min);
        t[k].rmq_max = max(t[k<<1].rmq_max, t[k<<1|1].rmq_max);
    }

    void modify_add(int l, int r, T val, int k = 1) {
        if (l <= t[k].l && t[k].r <= r) { apply_add(t[k], val); return; }
        pushdown(k);
        int mid = t[k].l + (t[k].r - t[k].l) / 2;
        if (l <= mid) modify_add(l, r, val, k<<1);
        if (mid < r)  modify_add(l, r, val, k<<1|1);
        pushup(k);
    }
    void modify_assign(int l, int r, T val, int k = 1) {
        if (l <= t[k].l && t[k].r <= r) { apply_assign(t[k], val); return; }
        pushdown(k);
        int mid = t[k].l + (t[k].r - t[k].l) / 2;
        if (l <= mid) modify_assign(l, r, val, k<<1);
        if (mid < r)  modify_assign(l, r, val, k<<1|1);
        pushup(k);
    }
    T ask_min(int l, int r, int k = 1) {
        if (l <= t[k].l && t[k].r <= r) return t[k].rmq_min;
        pushdown(k);
        int mid = t[k].l + (t[k].r - t[k].l) / 2;
        T ans = numeric_limits<T>::max();
        if (l <= mid) ans = min(ans, ask_min(l, r, k<<1));
        if (mid < r)  ans = min(ans, ask_min(l, r, k<<1|1));
        return ans;
    }
    T ask_max(int l, int r, int k = 1) {
        if (l <= t[k].l && t[k].r <= r) return t[k].rmq_max;
        pushdown(k);
        int mid = t[k].l + (t[k].r - t[k].l) / 2;
        T ans = numeric_limits<T>::lowest();
        if (l <= mid) ans = max(ans, ask_max(l, r, k<<1));
        if (mid < r)  ans = max(ans, ask_max(l, r, k<<1|1));
        return ans;
    }
    T ask_sum(int l, int r, int k = 1) {
        if (l <= t[k].l && t[k].r <= r) return t[k].w;
        pushdown(k);
        int mid = t[k].l + (t[k].r - t[k].l) / 2;
        T ans = 0;
        if (l <= mid) ans += ask_sum(l, r, k<<1);
        if (mid < r)  ans += ask_sum(l, r, k<<1|1);
        return ans;
    }
};`,
  },
  {
    id: "trie",
    title: "字典树 / 01 Trie / 可持久化01 Trie",
    description: "三种 Trie 模板：普通字典树、01 Trie 最大异或、可持久化 01 Trie",
    category: "string",
    complexity: "O(len) / O(bit) 插入查询",
    code: `// 普通字典树
struct Trie {
    static const int charsize = 26;
    vector<array<int, charsize>> tr;
    vector<int> isend;
    int cnt;
    Trie(int n) { init(n); }
    void init(int n) { tr.assign(n + 1, {}); isend.assign(n + 1, 0); cnt = 0; }

    void insert(const string& s) {
        int cur = 0;
        for (auto c : s) {
            int x = c - 'a';
            if (!tr[cur][x]) tr[cur][x] = ++cnt;
            cur = tr[cur][x];
        }
        isend[cur] = 1;
    }
    bool search(const string& s) {
        int cur = 0;
        for (auto c : s) {
            int x = c - 'a';
            if (!tr[cur][x]) return false;
            cur = tr[cur][x];
        }
        return isend[cur];
    }
    bool startsWith(const string& s) {
        int cur = 0;
        for (auto c : s) {
            int x = c - 'a';
            if (!tr[cur][x]) return false;
            cur = tr[cur][x];
        }
        return true;
    }
};

// 01 Trie (最大/最小异或)
struct BinaryTrie {
    vector<array<int, 2>> tr;
    int cnt;
    BinaryTrie(int n) { init(n); }
    void init(int n) { tr.assign(n * 32 + 10, {}); cnt = 0; }

    void insert(int x) {
        int cur = 0;
        for (int i = 30; i >= 0; i--) {
            int j = (x >> i) & 1;
            if (!tr[cur][j]) tr[cur][j] = ++cnt;
            cur = tr[cur][j];
        }
    }
    int queryMaxXor(int x) {
        int cur = 0, res = 0;
        for (int i = 30; i >= 0; i--) {
            int j = (x >> i) & 1;
            if (tr[cur][!j]) { res |= (1 << i); cur = tr[cur][!j]; }
            else cur = tr[cur][j];
        }
        return res;
    }
    int queryMinXor(int x) {
        int cur = 0, res = 0;
        for (int i = 30; i >= 0; i--) {
            int j = (x >> i) & 1;
            if (tr[cur][j]) cur = tr[cur][j];
            else { res |= (1 << i); cur = tr[cur][!j]; }
        }
        return res;
    }
};

// 可持久化 01 Trie (区间最大异或)
struct PersistentBinaryTrie {
    vector<array<int, 2>> tr;
    vector<int> root, sz;
    int cnt, idx;
    void init(int n) {
        tr.assign(n * 32 + 10, {});
        root.assign(n + 1, 0);
        sz.assign(n * 32 + 10, 0);
        cnt = idx = 0;
    }
    void insert(int x) {
        root[++idx] = ++cnt;
        int pre = root[idx - 1], cur = root[idx];
        for (int i = 30; i >= 0; i--) {
            int j = (x >> i) & 1;
            tr[cur] = tr[pre];
            tr[cur][j] = ++cnt;
            pre = tr[pre][j]; cur = tr[cur][j];
            sz[cur] = sz[pre] + 1;
        }
    }
    int queryMaxXor(int l, int r, int x) {
        int lRoot = root[l - 1], rRoot = root[r], res = 0;
        for (int i = 30; i >= 0; i--) {
            int j = (x >> i) & 1;
            if (sz[tr[rRoot][!j]] > sz[tr[lRoot][!j]]) {
                lRoot = tr[lRoot][!j]; rRoot = tr[rRoot][!j];
                res |= (1 << i);
            } else {
                lRoot = tr[lRoot][j]; rRoot = tr[rRoot][j];
            }
        }
        return res;
    }
};`,
  },
];
