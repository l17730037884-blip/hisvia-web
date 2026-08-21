#!/usr/bin/env bash
#
# scripts/auto-rollback.sh
#
# 上线前自动回滚：
#   1) 跑 auto-bug-check 查 bug（所有参数透传）
#   2) 若发现 bug：
#      - 把当前未提交改动 git stash 暂存（包括未跟踪的 -u）
#      - 再跑一次 check，验证"干净代码"下没问题
#      - 默认：把 stash pop 回来，方便用户接着修
#      - --no-restore：不 pop，保持回滚后的干净状态
#
# 用法：
#   bash scripts/auto-rollback.sh                        # 需要手动先启服务
#   bash scripts/auto-rollback.sh --start                # 自己启 next dev 后再扫
#   bash scripts/auto-rollback.sh --start --with-build   # 附带生产 build
#   bash scripts/auto-rollback.sh --no-restore           # 有 bug 时 stash 后不再 pop
#
# 退出码：
#   0 —— 初始 check 通过 / 或回滚后 clean check 通过
#   非 0 —— 初始 fail + 回滚后 clean 仍 fail（说明是已提交的代码有 bug）
set -eo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

NO_RESTORE=0
CHECK_ARGS=()
for a in "$@"; do
  case "$a" in
    --no-restore) NO_RESTORE=1 ;;
    *) CHECK_ARGS+=("$a") ;;
  esac
done

log() { printf '\033[1;34m[rollback]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[rollback::warn]\033[0m %s\n' "$*" >&2; }
err() { printf '\033[1;31m[rollback::error]\033[0m %s\n' "$*" >&2; }

if [ ! -d .git ]; then
  err "当前目录不是 git 仓库，无法自动回滚"
  exit 2
fi

log "1/4 跑 auto-bug-check ..."
if node scripts/auto-bug-check.mjs "${CHECK_ARGS[@]}"; then
  log "✅ 初始检查通过，无需回滚"
  exit 0
fi

warn "❌ 初始检查失败，开始自动回滚流程"

GIT_STATUS="$(git status --porcelain 2>/dev/null || true)"
if [ -z "$GIT_STATUS" ]; then
  warn "工作区没有任何未提交改动，说明 bug 来自已提交代码 / 依赖环境；无法再 stash 回滚"
  exit 3
fi

STASH_NAME="auto-rollback $(date '+%Y-%m-%d %H:%M:%S')"
log "2/4 git stash 暂存改动（包括未跟踪文件）：$STASH_NAME"
STASH_OUT="$(git stash push -u -m "$STASH_NAME" 2>&1 || true)"
printf '%s\n' "$STASH_OUT" | sed 's/^/   > /'

STASH_REF="$(git stash list --format='%gd %gs' | grep -F "$STASH_NAME" | head -1 | awk '{print $1}')"
if [ -z "$STASH_REF" ]; then
  # git 新版本有些情况下不会把空改动入 stash，重试一次带 --include-untracked
  STASH_REF="$(git stash list -n 1 --format='%gd' || true)"
fi

log "3/4 回滚后再次跑 check，验证 clean 状态下是否正常"
CLEAN_OK=0
if node scripts/auto-bug-check.mjs "${CHECK_ARGS[@]}"; then
  CLEAN_OK=1
  log "✅ 回滚后 clean 检查通过 → 本次 bug 来自暂存的未提交改动"
else
  warn "❌ 回滚后 clean 状态仍 fail → bug 来自已提交代码或依赖环境，不在工作区改动中"
fi

if [ "$NO_RESTORE" -eq 1 ]; then
  log "--no-restore 指定：暂保持回滚后的干净状态；要找回改动请执行：git stash pop ${STASH_REF}"
else
  log "4/4 还原用户改动（git stash pop）：改动保留在工作区方便修复"
  if git stash pop >/dev/null 2>&1; then
    log "✅ 改动已还原"
  else
    warn "git stash pop 失败，手动恢复：git stash pop ${STASH_REF}"
  fi
fi

if [ "$CLEAN_OK" -eq 1 ]; then
  exit 0
else
  exit 1
fi
