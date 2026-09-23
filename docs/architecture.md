# 项目架构

petit-ui 提供可覆盖的 CSS design tokens，并提供 Tailwind CSS 4 适配入口。默认主题转译星布谷地公开界面的纸色、深褐、青灰和金黄关系，深色是网页扩展设计。包提供共用颜色、圆角、边框宽度、字重与字号；组件轮廓组合、实际字体加载、内边距、素材、交互行为和主题偏好的存储由使用方负责。

## 工作区边界

| 路径                     | 职责                                                      |
| ------------------------ | --------------------------------------------------------- |
| 根包 `petit-ui-monorepo` | 私有 pnpm workspace，维护公共检查、Git hooks 和版本工具。 |
| `packages/petit-ui/`     | 可发布的 token 包，维护 CSS 源码、包说明及消费测试。      |
| `docs/`                  | 项目规范、开发和发布说明。                                |
| `site/`                  | 未来的 VitePress 文档站；当前不创建。                     |

根包依赖 Oxlint、Oxfmt、commitlint、simple-git-hooks、bumpp 和 git-cliff。Tailwind CSS、Tailwind CLI、PostCSS 属于 token 子包的开发依赖。具体版本由各自的 `package.json` 和锁文件维护。

## 样式结构

```text
普通 CSS 使用方 ──────────────→ 语义变量及主题默认值
Tailwind CSS 4 使用方 → 适配映射 → 语义变量及主题默认值
```

- 普通 CSS 入口独立于 Tailwind、Vue 和 Reka UI。
- Tailwind 入口复用同一套语义变量，通过 `@theme inline` 生成按需使用的工具类。
- 默认值直接以 CSS 源码发布，不增加构建、生成器、JavaScript 运行时或远程资源。
- 使用方通过 CSS 层叠和继承覆盖 token；主题切换通过 `data-theme` 表达。
- 当前 Tailwind 可选 peer dependency 的配置保持不变。只有消费适配入口时才需要 Tailwind CSS 4。

公共变量、主题行为、导出路径、默认值和验收标准以 [token 第一版规范](specs/tokens-v1.md) 为单一事实来源。

## 示例与后续扩展

第一版复用现有 Node.js、Tailwind CLI 和 PostCSS 测试，浏览器消费验收保持临时。用户认可的视觉基线、独立示例素材及来源保存在 `docs/assets/s03/`，组合样式维护在 `docs/recipes/s03-controls.md`，供后续站点复用；这些资源不进入 token 包或公共组件 API。

未来 `site/` 可以使用 Vue 和 Reka UI 演示组合方式，这些依赖留在站点。Reka UI 的状态通过组件提供的属性交给样例样式处理，token 包不封装组件或注入全局组件样式。

组件专用 token、完整基础色阶、字体文件、间距尺度、阴影和动效尚不属于第一版。新增公共 token 前，应先说明实际使用场景，并更新对应规范及消费验证。

安装与检查见[开发指南](development.md)，版本及发布流程见[版本与更新日志](release.md)。
