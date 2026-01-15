# 快速上手

按照以下步骤使用此模板启动您的新文档项目：

## 1. 修改基础配置

打开 `docs/.vitepress/config.mts`，修改以下信息：

- `title`: 你的站点标题。
- `description`: 站点描述。
- `repoURL`: 你的 GitHub 仓库地址（用于显示 Git 日志）。
- `socialLinks`: 你的社交链接。
- `editLink`: 页面底部的编辑链接。

## 2. 开始编写

在 `docs/` 目录下创建 `.md` 文件。
也可以创建 `docs/guide/` 等子目录，用于组织不同的文档内容。
如果你需要修改侧边栏，请编辑 `config.mts` 中的 `sidebar` 部分。

## 3. 预览与发布

```bash
# 本地开发预览
npm run docs:dev

# 构建静态站点
npm run docs:build
```
