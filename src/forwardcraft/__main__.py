"""支持 `python -m forwardcraft` 方式运行。"""

from forwardcraft.cli import main

if __name__ == "__main__":
    raise SystemExit(main())
