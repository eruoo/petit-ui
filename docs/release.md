# 版本与发布

版本号由 `packages/petit-ui/package.json` 维护。根包 `petit-ui-monorepo` 为私有工作区，不设置发布版本。

## 当前发布状态

`petit-ui@0.0.0-alpha` 已由维护者手动发布，用于建立 npm 包。这个版本尚未提供正式 token API，不能作为 token 功能完成的标志。已发布的版本号不能再次用于发布不同内容。

[`petit-ui@0.0.1`](https://www.npmjs.com/package/petit-ui/v/0.0.1) 已于 2026-09-24 发布到 npm，`latest` 指向该版本。它包含 CSS tokens 与 Tailwind CSS 4 适配入口，使用 MIT 许可证。

首次真实 OIDC 发布由 [`petit-ui@0.0.1` 标签](https://github.com/eruoo/petit-ui/tree/petit-ui%400.0.1)触发，[Publish 工作流](https://github.com/eruoo/petit-ui/actions/runs/36019359747)已成功。npm Trusted Publisher 与 `eruoo/petit-ui` 的 `publish.yml` 绑定；registry 安装、CSS 导出、Tailwind 编译和随包 LICENSE 均已验证。正式 token 的内容与打包要求见 [token 第一版规范](specs/tokens-v1.md)。

功能版本发布前，应完成规范中的消费验收，并确认新版本号尚未被使用。更新版本、提交及合并、打发布标签和 npm 发布分别按当次授权执行；`release:bump` 不代替这些动作。

## 项目许可证

根目录 [LICENSE](../LICENSE) 原样取自 [LoTwT/ts-starter 的 LICENSE](https://github.com/LoTwT/ts-starter/blob/abf6c39e7bccd41e3d937cc5a75dba8febdd4b3b/LICENSE)，保留 `2026 LoTwT <https://github.com/LoTwT>` 的版权署名。根目录文件是项目软件许可的权威文本。

`packages/petit-ui/package.json` 声明 `"license": "MIT"`；[子包 LICENSE](../packages/petit-ui/LICENSE) 保持与根目录逐字一致，随 npm tarball 分发。文档站使用的第三方图标和字体继续保留各自许可，见[设计来源与许可](../site/credits.md)。

## CI 与发布边界

`.github/workflows/ci.yml` 在面向 `main` 的 PR 和 `main` 推送时执行冻结锁文件安装及 `pnpm check`。检查内容见[开发指南](development.md#安装与检查)。

`.github/workflows/publish.yml` 仅由 `petit-ui@*` 标签推送触发，使用 GitHub 托管的 Ubuntu runner。发布前确认标签提交已进入 `main`、标签与子包版本完全一致，再重新运行完整检查。从 `packages/petit-ui/` 打包后，将生成的同一份 tarball 发布到 npm；根包和 `site/` 不参与发布。

Node.js 使用 24，pnpm 读取根包的 `packageManager`，发布 runner 的 npm 固定为 11.16.0。工作流中的 Actions 固定到完整提交 SHA。发布 job 只申请 `contents: read` 与 `id-token: write`，不需要配置 `NPM_TOKEN` 或 `NODE_AUTH_TOKEN` secret。

允许的版本格式和 npm dist-tag 由 `.github/scripts/release-metadata.mjs` 校验：

| 版本示例                       | npm dist-tag |
| ------------------------------ | ------------ |
| `0.1.0-alpha.0`、`0.1.0-alpha` | `alpha`      |
| `0.1.0-beta.0`                 | `beta`       |
| `0.1.0-rc.0`                   | `rc`         |
| `0.1.0`                        | `latest`     |

预发布只接受 `alpha`、`beta`、`rc`，可附加一个不带前导零的数字段；暂不接受其他渠道或 build metadata。预发布不会更新 `latest`。已存在的 npm 版本不可覆盖，失败时先查看 Actions 日志和 registry 状态，不移动已发布的 Git 标签来重试。

## npm Trusted Publisher 一次性配置

发布工作流合入 `main` 后，由包维护者登录 npm，在 [`petit-ui` 包设置](https://www.npmjs.com/package/petit-ui/access)中添加 GitHub Actions Trusted Publisher：

| 字段                 | 值                                       |
| -------------------- | ---------------------------------------- |
| Organization or user | `eruoo`                                  |
| Repository           | `petit-ui`                               |
| Workflow filename    | `publish.yml`                            |
| Environment          | 留空，当前 job 未绑定 GitHub Environment |
| 允许的发布方式       | 启用 `npm publish`                       |

文件名只填写 `publish.yml`，不包含 `.github/workflows/` 路径。npm 新建的 Trusted Publisher 默认允许 staged publishing；本项目采用直接发布，必须额外允许 `npm publish`。已有绑定先核对内容，避免重复创建或移除其他仍在使用的绑定。

也可使用 npm 11.16.0 CLI 配置，登录和 2FA 由维护者完成：

```sh
npm login --registry=https://registry.npmjs.org
npm trust list petit-ui
npm trust github petit-ui --file publish.yml --repo eruoo/petit-ui --allow-publish
```

仓库现已公开。工作流根据仓库可见性设置 npm provenance：公开仓库启用，私有仓库关闭。下一次真实发布时，应核对 npm 上生成的 provenance；首次 OIDC 发布成功的记录不代表公开仓库的 provenance 已验证。具体支持条件和配置方式以 [npm Trusted Publishing 文档](https://docs.npmjs.com/trusted-publishers/)及 [npm trust 命令文档](https://docs.npmjs.com/cli/v11/commands/npm-trust/)为准。

## 文档站部署

文档站部署到 Cloudflare Workers Static Assets，配置由 `site/wrangler.jsonc` 维护。Wrangler 只上传 VitePress 生成的 `site/.vitepress/dist/`，没有 Worker 脚本、数据绑定或额外的服务端运行逻辑。Wrangler 作为开发依赖归私有子包 `petit-ui-site` 管理。

VitePress 使用域名根路径 `/`。静态托管采用 `auto-trailing-slash` 处理 HTML 路径，支持现有的无 `.html` 内页链接；未知路径返回 VitePress 的 `404.html` 和 HTTP 404。

文档站已于 2026-09-25 上线，地址为 [petit-ui-site.l709937065.workers.dev](https://petit-ui-site.l709937065.workers.dev)，尚未绑定自定义域名。

日常发布使用 Cloudflare Workers Builds 的 Git 集成。`petit-ui-site` 已连接 `eruoo/petit-ui`，监听 `main` 的更新，检查和构建通过后自动部署。分支预览关闭，PR 继续运行现有的 GitHub CI。

Cloudflare 控制台 **Settings → Builds → Production** 的配置如下：

| 设置                        | 值                                                   |
| --------------------------- | ---------------------------------------------------- |
| Production branch           | `main`                                               |
| Root directory              | `/`（仓库根目录）                                    |
| Build command               | `pnpm -w install --frozen-lockfile && pnpm -w check` |
| Deploy command              | `pnpm --filter petit-ui-site run deploy`             |
| Build variable              | `SKIP_DEPENDENCY_INSTALL=1`                          |
| Builds for Preview branches | 关闭                                                 |

`SKIP_DEPENDENCY_INSTALL` 关闭平台默认的依赖安装，由构建命令执行冻结锁文件安装。Node.js 使用 Cloudflare 构建镜像的默认版本，pnpm 按根目录 `package.json` 的 `packageManager` 选择版本；当前没有额外设置 `NODE_VERSION` 或 `PNPM_VERSION`。首次自动构建及工具链变更后，检查日志中的实际版本符合[开发环境要求](development.md#安装与检查)。

手动发布作为备用入口，从仓库根目录执行：

```sh
# 构建并验证 Cloudflare 配置，不上传。
pnpm site:build
pnpm --filter petit-ui-site exec wrangler deploy --dry-run

# 检查当前 Cloudflare 登录身份及可访问的账号。
pnpm --filter petit-ui-site exec wrangler whoami

# 完整检查通过后，将生成的站点部署至 Cloudflare。
pnpm site:deploy
```

手动部署前确认目标 Cloudflare 账号及 `petit-ui-site` 名称，缺少登录时使用 `pnpm --filter petit-ui-site exec wrangler login`。存在多个账号时，在本次部署进程中通过 `CLOUDFLARE_ACCOUNT_ID` 指定目标。认证凭据不写入仓库。

部署后检查首页、内页直接访问、静态资源、本地搜索、交互示例和 404；若站点地址变更，同步更新此处、根目录 README 及 GitHub 仓库主页的文档入口。

GitHub Actions 继续负责代码检查与 npm 发布，Cloudflare Workers Builds 负责文档站自动部署。文档站上线不发布 npm 包，也不创建版本标签。配置依据 [Workers Builds 文档](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)、[构建环境说明](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/)、[Static Assets 文档](https://developers.cloudflare.com/workers/static-assets/)和 [HTML 路径处理文档](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)。

## 发布一个新版本

1. 完成消费验收、确认未使用的新版本号，通过 `pnpm release:bump` 更新子包版本和 changelog，检查打包范围及 LICENSE。
2. 将发布改动提交并合入 `main`，确认 CI 通过。发布标签必须指向已进入 `main` 的对应提交。
3. 获得本次发版授权后，创建并推送与子包版本完全一致的标签，例如：

   ```sh
   git tag petit-ui@0.1.0-alpha.0 <已合入-main-的发布提交>
   git push origin refs/tags/petit-ui@0.1.0-alpha.0
   ```

4. 检查 Publish workflow 的打包内容和发布结果，再用 `npm view petit-ui@0.1.0-alpha.0 version dist --json` 及 `npm view petit-ui dist-tags --json` 核对 registry；安装 registry 中的该版本验证 CSS 导出。

`npm publish --dry-run` 可以检查待发布内容，但不会验证真实 OIDC 交换或 Trusted Publisher 绑定。只有首次真实发布成功后，才能确认完整认证链路可用。如果 npm 已发布而后续步骤失败，先核对该版本，不重新使用同一版本号发布其他内容。

## 命令

在仓库根目录执行：

| 命令                                        | 行为                                                       |
| ------------------------------------------- | ---------------------------------------------------------- |
| `pnpm changelog`                            | 根据已有提交和标签预览更新日志，输出到终端。               |
| `pnpm changelog --unreleased`               | 仅预览最近一个匹配标签之后的变更。                         |
| `pnpm release:bump`                         | 先运行项目检查，再交互选择版本，更新子包版本与 changelog。 |
| `pnpm release:bump --release 0.1.0-alpha.0` | 指定版本，确认后更新文件。                                 |

日常检查命令见[开发指南](development.md)。

## bumpp

根目录 `bump.config.mjs` 将版本更新范围限定为 `packages/petit-ui/package.json`。更新后读取 git-cliff 的 JSON 上下文，设置待发布分段的版本与日期，再按 `cliff.toml` 渲染到 `packages/petit-ui/CHANGELOG.md`。

即使 HEAD 已有预发布标签且没有新增提交，也会生成正式版的独立记录，标注“无新增变更”，并保留预发布历史。例如从 `0.1.0-alpha.0` 更新为 `0.1.0` 时，不会把预发布记录改名或重复收录其中的变更。

自动提交、打标签和推送均关闭；该命令准备可供检查的本地文件变更，不执行 npm 发布。

## git-cliff

根目录 `cliff.toml` 规定：

- 只收录改动 `packages/petit-ui/` 的提交；仅修改根目录或文档站的提交不会进入包的更新日志。
- 按 Conventional Commits 分类，保留破坏性变更标记。普通的 `chore(release): ...` 版本提交用于保留版本分段，其条目不显示在日志中。
- 只识别 `petit-ui@版本号` 形式的标签，例如 `petit-ui@0.1.0-alpha.0` 和 `petit-ui@0.1.0`。
- 输出中文分组和提交链接，通过本地 Git 历史生成内容，无需请求远程 API。

bumpp 在生成上下文时加入虚拟的版本提交，确保待发布分段始终存在；这不会创建真实 Git 提交或标签。后续发布时需在对应发布提交上创建匹配标签，供下一次生成日志划分版本范围。建议版本提交信息使用 `chore(release): petit-ui@版本号`。

更新日志按 Git 中已有的提交生成，不包含未提交的代码变更。应先提交待发布改动，再更新版本并检查生成结果。当前源码已配置正式 CSS 导出入口；导出和发布文件范围按 [token 第一版规范](specs/tokens-v1.md#包元信息与发布范围) 验收。
