# GitHub Pages 部署说明

## 前置配置

### 1. GitHub Pages 设置

在仓库 Settings → Pages 中配置：

- **Source**: Deploy from a branch
- **Branch**: `gh-pages` / `root`
- **Folder**: `/ (root)`

### 2. Base 路径配置

由于仓库在子路径（非 `starteamx.github.io`），需要在 `java-docs/src/.vuepress/config.ts` 中设置正确的 base 路径：

```typescript
export default defineUserConfig({
  // 仓库名是 corejava，设置为：
  base: "/corejava/",
  
  // ... 其他配置
});
```

**重要**：base 路径必须与 GitHub 仓库名一致，否则资源路径会出错。

### 3. 环境权限

确保在仓库 Settings → Actions → General → Workflow permissions 中：

- **Read and write permissions** 已启用
- **Allow GitHub Actions to create and approve pull requests**（如果需要）

## 工作流说明

### 触发条件

- 推送到 `master` 分支时自动触发
- 也可以手动触发（Actions → Deploy to GitHub Pages → Run workflow）

### 执行步骤

1. **Checkout**: 检出代码
2. **Setup Node.js**: 设置 Node.js 20 环境，启用 pnpm 缓存
3. **Setup pnpm**: 安装 pnpm 8
4. **Install dependencies**: 在 `java-docs/` 目录下安装依赖
5. **Build**: 构建 VuePress 站点
6. **Deploy**: 部署到 GitHub Pages

### 构建输出

构建产物位于：`java-docs/src/.vuepress/dist/`

### 部署后访问

部署完成后，访问地址为：
- `https://starteamx.github.io/corejava/`（自动重定向到 `/corejava/zh/`）
- `https://starteamx.github.io/corejava/zh/`（中文）
- `https://starteamx.github.io/corejava/en/`（英文）

## 故障排查

### 1. 构建失败

- 检查 Node.js 和 pnpm 版本是否兼容
- 查看 Actions 日志中的错误信息
- 确保 `java-docs/pnpm-lock.yaml` 存在且正确

### 2. 页面空白或 404

- 检查 `config.ts` 中的 `base` 路径是否正确
- 确保 base 路径与仓库名一致（包含前导斜杠和尾随斜杠）

### 3. 资源加载失败

- 检查 base 路径配置
- 查看浏览器控制台的错误信息
- 确保静态资源路径正确

### 4. 多语言路由不工作

- 检查 `config.ts` 中的 `locales` 配置
- 确保 `src/zh/` 和 `src/en/` 目录存在
- 验证根路径重定向是否配置正确
