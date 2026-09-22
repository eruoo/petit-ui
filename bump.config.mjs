import { defineConfig } from 'bumpp'
import { runGitCliff } from 'git-cliff'

export default defineConfig({
  files: ['packages/petit-ui/package.json'],
  commit: false,
  tag: false,
  push: false,
  async execute({ options, state }) {
    const args = ['--config', 'cliff.toml', '--offline']
    const version = `petit-ui@${state.newVersion}`
    // 虚拟版本提交确保已打标签的 HEAD 也有独立的待发布分段。
    const { stdout } = await runGitCliff(
      [...args, '--context', '--with-commit', `chore(release): ${version}`],
      { cwd: options.cwd, stdio: ['ignore', 'pipe', 'inherit'] },
    )
    const releases = JSON.parse(stdout)
    if (releases[1]?.version === version && releases[0].commits.length === 1) {
      releases.shift()
    } else {
      releases[0].version = version
      releases[0].timestamp = Math.floor(Date.now() / 1000)
    }

    await runGitCliff(
      [...args, '--from-context', '-', '--output', 'packages/petit-ui/CHANGELOG.md'],
      { cwd: options.cwd, stdio: ['pipe', 'inherit', 'inherit'], input: JSON.stringify(releases) },
    )
  },
})
