<script setup lang="ts">
import phosphorLicense from '../docs/assets/s03/phosphor-LICENSE?url'
import lucideLicense from '../docs/assets/s03/lucide-LICENSE?url'
import nunitoLicense from './.vitepress/theme/assets/Nunito-OFL.txt?url'
import sources from '../docs/assets/s03/sources.json?url'
</script>

# 设计来源与许可

Petit UI 是独立的 CSS token 项目，不是星布谷地的官方组件库。默认浅色参考了公开界面中的颜色关系。

## 视觉依据

研究来源为 [HoYoLAB Final Beta 公告](https://www.hoyolab.com/article/46776026)中的公开界面，主要依据第 4 张烹饪图（项目编号 S03）。公开截图不是官方 design tokens，也不代表授予资产使用权。本站不分发该官方截图。

三控件的组合记录维护在仓库的 [S03 配方](https://github.com/eruoo/petit-ui/blob/main/docs/recipes/s03-controls.md)，默认值与语义以 [Token 规范](https://github.com/eruoo/petit-ui/blob/main/docs/specs/tokens-v1.md)为准。

## 独立生成素材

茶杯插画与 Cook 的三齿叉圆环 mask 均由 image_gen 独立生成，属于消费示例，不是官方源素材，也不是把完整界面截图贴进网页。

Cook mask 仅用于 Cook，保留三齿叉柄连接外围圆环的轮廓。图片尺寸、校验值、来源与完整生成提示词保存在仓库，并由本站提供同一份<a :href="sources" download>来源记录 sources.json</a>。

项目软件采用 [MIT 许可证](https://github.com/eruoo/petit-ui/blob/main/LICENSE)。下列第三方图标与字体继续遵循各自的许可。

## 图标

- 卡片的厨师帽轮廓来自 [Lucide](https://lucide.dev)，保持原始路径。<a :href="lucideLicense" download="lucide-LICENSE.txt">下载随站点保留的 Lucide 许可</a>（ISC 与部分 Feather 衍生内容的 MIT 声明）。
- 卡片装饰弧的 leaf、spiral、flower、sun 来自 [Phosphor](https://phosphoricons.com)，采用 MIT 许可。<a :href="phosphorLicense" download="phosphor-LICENSE.txt">下载随站点保留的 Phosphor 许可</a>。

装饰不承担状态语义；它们不进入 npm token 包。

## 字体

英文品牌与控件使用 [Nunito](https://github.com/google/fonts/tree/main/ofl/nunito)可变字体。本站自托管的文件与 S03 来源记录的 SHA-256 一致，使用 SIL Open Font License 1.1，<a :href="nunitoLicense">许可文本随字体保留</a>。正文中的中文使用系统字体，不额外下载完整中文字体。

所有字体与加载声明归本站管理；`petit-ui` 包不包含字体文件，也不请求外部字体服务。

## 技术资料

- [VitePress 默认主题扩展](https://vitepress.dev/guide/extending-default-theme)：本站保留原有导航、侧栏、搜索与代码块。
- [Reka UI 样式与状态](https://reka-ui.com/docs/guides/styling)：示例通过组件提供的属性表达交互状态。
- [Tailwind CSS Preflight](https://tailwindcss.com/docs/preflight#disabling-preflight)：与既有文档样式共存时只引入所需部分。
