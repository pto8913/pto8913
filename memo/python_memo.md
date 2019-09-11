[TOP]({{ site.reseturl }}) > memo python memo

# python memomemoemoemomeomeoemmeomeoemoemoemeom

## 目次
* [path](#path)


## path

* python3.4以降なら、`pathlib`を使え。とても便利だから。<br>
なお、pathlibを知る前に書いたコードが多いので制作物の中にはたくさん`os`が出てきます。<br>
### pathlibチートシート

```PlainText
os.path.abspath() -> Path.resolve()
os.chmod() -> Path.chmod()
os.mkdir() -> Path.mkdir()
os.rename() -> Path.rename()
os.replace() --> Path.replace()
os.rmdir() -> Path.rmdir()
os.remove(),os.unlink() -> Path.unlink()
os.getcwd() -> Path.cwd()
os.path.exists() -> Path.exists()
os.path.expanduser() -> Path.expanduser(), Path.home()
os.path.isdir() -> Path.is_dir()
os.path.isfile() -> Path.is_file()
os.path.islink() -> Path.is_symlink()
os.stat() -> Path.stat(), Path.owner(), Path.group()
os.path.isabs() -> PurePath.is_absolute()
os.path.join() -> PurePath.joinpath()
os.path.basename() -> PurePath.name()
os.path.dirname() -> PurePath.parent
os.path.samefile() -> Path.samefile()
os.path.splitext() -> Path.suffix
os.walk() -> Path().glob(pattern)
```

```python
# ------ 実行ファイルのディレクトリ取得 ------
current_dir = Path(__file__).parent.resolve()
# 動かなかったら"__file__"

# ------ よく使うos.walk ------
for f in list(map(str, current_dir.glob("**/*.extension"))):
  print(f)

# ------ 親要素の配列 ------
# current : c:/study/test
current_dir.parents[0]
# -> c:/study
current_dir.parents[1]
# -> c:/
```

[トップページに戻る]({{ site.reseturl }})