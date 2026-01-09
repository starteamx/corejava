# Core Java 文档工程化系统（V1）

## 📖 项目概述

本项目为经典著作《Core Java》打造一个现代化的、可工程化维护的文档站。采用**"单体编辑态 -> 脚本转换态 -> 自动发布态"**的流式架构，实现从单一 Markdown 文件到结构化文档站的自动化转换。

### 核心价值

- ✅ **极简编辑体验**：维护人员只需编辑单一 Markdown 文件，支持全文搜索、批量替换、全局校对
- ✅ **自动化转换**：通过脚本自动将单体文件拆分为符合 VuePress 规范的文件夹树
- ✅ **结构即导航**：物理目录结构自动映射为侧边栏导航，无需手动维护 TOC
- ✅ **CI/CD 集成**：GitHub Actions 自动监听源码变动，触发构建并部署到 GitHub Pages

---

## 🏗️ 项目架构

### 核心工作流

```
┌─────────────────┐
│  编辑层 (source) │  维护人员编辑单体 Markdown 文件
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  转换层 (scripts)│  Node.js 脚本根据标题等级拆分文件
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  渲染层 (src)    │  VuePress Hope 读取文件夹树并渲染
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  分发层 (GitHub) │  GitHub Actions 自动构建并部署
└─────────────────┘
```

### 目录结构

```
doc/java/                    # Git 根目录
├── .gitignore              # Git 忽略规则
├── README.md               # 项目说明文档
│
└── java-docs/              # 工程目录（VuePress Hope 项目）
    ├── package.json        # 项目依赖和脚本
    ├── pnpm-lock.yaml      # pnpm 锁定文件
    ├── tsconfig.json       # TypeScript 配置
    │
    ├── src/                # VuePress 运行目录
    │   ├── README.md       # 根路径首页（重定向到 /zh/）
    │   ├── zh/             # 中文内容目录
    │   │   ├── README.md   # 中文首页 (/zh/)
    │   │   ├── guide/      # 指南目录
    │   │   └── demo/       # 演示目录
    │   └── en/             # 英文内容目录
    │       ├── README.md   # 英文首页 (/en/)
    │       ├── guide/      # Guide directory
    │       └── demo/       # Demo directory
    │
    └── src/.vuepress/      # VuePress 配置目录
        ├── config.ts       # VuePress 主配置（多语言配置）
        ├── theme.ts        # 主题配置
        ├── navbar/         # 导航栏配置
        ├── sidebar/        # 侧边栏配置
        └── public/         # 静态资源目录
```

---

## 📋 文件映射规则

### 标题层级映射

| Markdown 标题 | 映射目标 | 说明 |
|--------------|---------|------|
| `# 第 X 章` | `src/chapter-X/README.md` | 章目录 + README |
| `## X.Y` | `src/chapter-X/X.Y/README.md` | 节目录 + README |
| `### X.Y.Z` | `src/chapter-X/X.Y/X.Y.Z.md` | 小节文件（最小拆分单元） |
| `####` 及更深 | 保留在文件内部 | 不进行目录拆分 |

### 内容边界处理

- **章级别（`#`）**：章标题后的正文内容（在第一个 `##` 之前）写入 `chapter-X/README.md`
- **节级别（`##`）**：节标题后的正文内容（在第一个 `###` 之前）写入 `chapter-X/X.Y/README.md`
- **小节级别（`###`）**：小节标题及其后的所有内容写入独立的 `.md` 文件

### 标题格式规范

- ✅ **固定格式**：`# 第 X 章`（X 为数字，如：`# 第 1 章`、`# 第 10 章`）
- ✅ **自动编号**：`## X.Y` 中的 `X.Y` 由脚本自动识别和编号
- ✅ **最小单元**：`### X.Y.Z` 为物理文件的最小拆分单位

---

## 🚀 使用指南

### 环境要求

- Node.js >= 16.x
- pnpm >= 8.x（推荐）或 npm >= 8.x

### 安装依赖

```bash
# 进入工程目录
cd java-docs

# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 本地开发

```bash
# 进入工程目录
cd java-docs

# 启动开发服务器
pnpm docs:dev
# 或
npm run docs:dev
```

访问 `http://localhost:8080` 预览文档。

**多语言访问**：
- 中文（默认）：`http://localhost:8080/zh/`
- 英文：`http://localhost:8080/en/`
- 根路径会自动重定向到 `/zh/`

### 构建生产版本

```bash
# 进入工程目录
cd java-docs

# 构建静态站点
pnpm docs:build
# 或
npm run docs:build
```

构建产物位于 `java-docs/src/.vuepress/dist/`。

### 清理缓存并重新开发

如果遇到缓存问题：

```bash
pnpm docs:clean-dev
# 或
npm run docs:clean-dev
```

---

## 🔧 技术栈

- **文档框架**：[VuePress 2.x](https://v2.vuepress.vuejs.org/) (v2.0.0-rc.26)
- **主题**：[VuePress Theme Hope](https://theme-hope.vuejs.press/) (v2.0.0-rc.102)
- **构建工具**：Vite
- **包管理器**：pnpm（推荐）
- **侧边栏模式**：`sidebar: "structure"`（物理目录即导航）
- **多语言支持**：中文（默认）和英文
- **CI/CD**：GitHub Actions
- **部署平台**：GitHub Pages

---

## 📝 编辑规范

### 多语言内容编辑

项目支持中文和英文两种语言，内容分别存放在：

- **中文内容**：`java-docs/src/zh/`
- **英文内容**：`java-docs/src/en/`

### 文件结构

每个语言目录下的结构应该保持一致，例如：

```
src/
├── zh/
│   ├── README.md          # 中文首页
│   ├── guide/             # 指南目录
│   │   ├── README.md      # 指南首页
│   │   └── ...
│   └── ...
└── en/
    ├── README.md          # 英文首页
    ├── guide/             # Guide directory
    │   ├── README.md      # Guide homepage
    │   └── ...
    └── ...
```

### 编辑建议

1. **保持结构一致**：中文和英文目录结构应该保持一致，便于维护
2. **使用 README.md**：每个目录下的 `README.md` 作为该目录的首页
3. **侧边栏自动生成**：使用 `sidebar: "structure"` 模式，会根据目录结构自动生成侧边栏
4. **图片资源**：图片放在 `java-docs/src/.vuepress/public/` 目录下，使用绝对路径引用

### 未来规划：拆分脚本

⚠️ **计划中**：未来将实现拆分脚本，支持从单体 Markdown 文件自动拆分为多语言目录结构。

---

## 🔄 CI/CD 流程

### GitHub Actions 工作流

1. **触发条件**：推送代码到 `main` 分支（或 `master`）
2. **执行步骤**：
   - 检出代码
   - 设置 Node.js 环境
   - 安装依赖（pnpm）
   - 构建 VuePress 站点
   - 部署到 `gh-pages` 分支

### 部署流程

```bash
# 1. 编辑文档内容（在 java-docs/src/zh/ 或 java-docs/src/en/）
# 2. 提交并推送到 main 分支
git add .
git commit -m "更新文档内容"
git push origin main

# 3. GitHub Actions 自动触发构建和部署
# 4. 访问 GitHub Pages 查看更新后的文档
```

### GitHub Pages 配置

1. 在仓库 Settings → Pages 中：
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Folder: `/ (root)`

2. 如果仓库不在根路径（如 `username/repo-name`），需要在 `java-docs/src/.vuepress/config.ts` 中设置：
   ```typescript
   base: "/repo-name/",
   ```

---

## 🎯 设计原则

### 1. 结构即导航

物理目录的嵌套关系与文档的逻辑层级（章 > 节 > 小节）完全对等，VuePress Hope 的 `structure` 模式会自动生成侧边栏导航。

### 2. 最小原子单元

规范定义「二级小节（`###`）」为物理文件的最小拆分单位，更深层级的标题作为文件内结构保留。

### 3. README 语义化

每一章（`#`）和每一节（`##`）的正文内容必须作为该目录下的 `README.md` 存在，以保证点击目录节点时有内容展示。

### 4. 自动化优先

建立无需人工干预目录索引（TOC）、仅需维护一份核心文稿即可实现高性能、多端适配、可持续迭代的知识库系统。

---

## 📚 相关文档

- [VuePress 2.x 官方文档](https://v2.vuepress.vuejs.org/)
- [VuePress Theme Hope 文档](https://theme-hope.vuejs.press/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

---

## 📄 许可证

MIT License

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 编辑文档内容（在 `java-docs/src/zh/` 或 `java-docs/src/en/`）
4. 本地预览：`cd java-docs && pnpm docs:dev`
5. 提交更改：`git commit -m "Add: 添加新内容"`
6. 推送到分支：`git push origin feature/your-feature`
7. 提交 Pull Request

## 🌐 多语言说明

### 默认语言

- **默认语言**：中文（`/zh/`）
- **根路径重定向**：访问 `/` 会自动重定向到 `/zh/`

### 语言切换

- 中文：`/zh/`
- 英文：`/en/`
- 导航栏提供语言切换链接

### 目录结构对应

- `/zh/` → `java-docs/src/zh/`
- `/en/` → `java-docs/src/en/`
- 每个语言路径下的侧边栏会根据目录结构自动生成

---

**最后更新**：2025年1月
