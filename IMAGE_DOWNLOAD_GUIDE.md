# 画像ダウンロード・命名ガイド

Figma から画像をダウンロードし、適切な命名規則でリネームする手順です。

## 前提条件

- Figma MCP が接続されていること
- Figma で対象のノードが選択されていること

## 手順

### 1. Figma から画像をダウンロード

Figma で対象のノードを選択し、MCP 経由で画像をダウンロードします。

```bash
# MCPツールを使用（自動実行）
# get_design_context または get_screenshot を使用
# dirForAssetWrites に src/images を指定
```

**注意**: 画像は `src/images/` ディレクトリに保存されます。

### 2. ダウンロードされたファイルを確認

```bash
ls -1 src/images/ | tail -20
```

ダウンロードされたファイルはハッシュ名（例: `d9cb69a8d33580a8d1783d2d4d80016a70c8eae8.png`）になっています。

### 3. 命名規則に従ってリネーム

画像ファイルは以下の命名規則に従ってリネームします：

```
{セクション名}_{連番}.{拡張子}
```

#### 命名例

- **Header**: `header_01.png`, `header_02.png`, `header_03.svg`, `header_04.svg`
- **FV**: `fv_01.png`, `fv_02.svg`, `fv_03.png`, `fv_04.png`, `fv_05.png`, `fv_06.png`
- **Search**: `search_01.svg`, `search_02.png`, ..., `search_10.png`
- **News**: `news_01.svg`
- **Pickup**: `pickup_01.png`, `pickup_02.png`, `pickup_03.png`
- **Map**: `map_01.png`
- **Slider**: `slider_01.png`, `slider_02.png`, `slider_03.png`, `slider_04.png`
- **Photo Town**: `photo-town_01.png`, `photo-town_02.png`, `photo-town_03.png`, `photo-town_04.png`
- **Useful Info**: `useful-info_01.svg`, `useful-info_02.png`, ..., `useful-info_05.png`
- **YouTube**: `youtube_01.png`, `youtube_02.png`
- **Related Links**: `related-links_01.png`, `related-links_02.png`, `related-links_03.png`
- **Footer**: `footer_01.svg`, `footer_02.svg`
- **Common**: `common_logo.png`, `common_arrow.svg`

#### リネームコマンド例

```bash
# 例: FVセクションの背景画像をリネーム
cp src/images/{ハッシュ名}.png src/images/fv_01.png

# 例: ロゴ画像をリネーム
cp src/images/{ハッシュ名}.png src/images/common_logo.png

# 例: 矢印アイコンをリネーム
cp src/images/{ハッシュ名}.svg src/images/common_arrow.svg
```

**注意**: `cp` コマンドを使用することで、元のハッシュ名ファイルも残ります（後で削除可能）。

### 4. HTML のパスを更新

`index.html` で画像パスを確認し、必要に応じて更新します。

```bash
# HTML内の画像パスを確認
grep -n "src=\"./images/" index.html | grep "{セクション名}"
```

パスは `./images/{ファイル名}` の形式で統一されています。

### 6. gulp のビルド結果を確認

```bash
# 画像が正しく配置されているか確認
ls -1 images/ | grep "{セクション名}"

# 特定のファイルの存在確認
test -f images/{ファイル名} && echo "✓ {ファイル名}" || echo "✗ {ファイル名}"
```

## よくある画像の対応表

**注意**: ハッシュ名は Figma から取得するたびに変わる可能性があるため、都度確認が必要です。Figma から取得したファイルのハッシュ名を確認し、適切な名前にリネームしてください。

## トラブルシューティング

### 画像が表示されない場合

1. **ファイルの存在確認**

   ```bash
   test -f images/{ファイル名} && echo "存在" || echo "不存在"
   ```

2. **HTML のパス確認**

   ```bash
   grep "src=\"./images/{ファイル名}\"" index.html
   ```

3. **Gulp のビルド確認**
   ```bash
   npx gulp imgImagemin gulpWebp
   ```

### 不要なハッシュ名ファイルの削除

リネーム後、元のハッシュ名ファイルを削除する場合：

```bash
# 特定のファイルを削除
rm src/images/{ハッシュ名}.{拡張子}

# または、gulpのcleanOrphanタスクを使用
npx gulp cleanOrphan
```

## 補足

- 画像は `src/images/` に保存し、gulp で `images/` にコピーされます
- WebP 形式も自動生成されます（`{ファイル名}.webp`）
- 画像の最適化（圧縮）も自動で行われます
