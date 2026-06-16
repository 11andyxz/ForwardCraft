"""ForwardCraft 命令行入口(脚手架)。

目前只提供基础骨架:版本信息和一个 `info` 占位子命令。
后续把 agents / workflows / integrations 的具体功能挂载到这里即可。
"""

from __future__ import annotations

import argparse
from typing import Optional, Sequence

from forwardcraft.__about__ import __version__
from forwardcraft.config import Config


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="forwardcraft",
        description="ForwardCraft — Custom AI Agents · Workflow Automation · Software Integration",
    )
    parser.add_argument(
        "-V",
        "--version",
        action="version",
        version=f"%(prog)s {__version__}",
    )
    subparsers = parser.add_subparsers(dest="command")

    # 占位子命令:打印当前配置,用于确认脚手架可正常运行。
    info = subparsers.add_parser("info", help="打印当前配置与版本信息")
    info.set_defaults(func=_cmd_info)

    return parser


def _cmd_info(args: argparse.Namespace) -> int:
    config = Config.from_env()
    print(f"forwardcraft {__version__}")
    print("modules: agents · workflows · integrations")
    print(config.describe())
    return 0


def main(argv: Optional[Sequence[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    if not getattr(args, "command", None):
        parser.print_help()
        return 0
    return args.func(args)
