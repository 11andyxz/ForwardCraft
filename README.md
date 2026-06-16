# ForwardCraft

**Custom AI Agents · Workflow Automation · Software Integration**

ForwardCraft 是面向以上三块业务的 Python 项目骨架 —— **当前为脚手架**,已搭好可运行的项目结构,具体业务逻辑待按客户需求填充。

> 仓库:https://github.com/11andyxz/ForwardCraft

## 业务模块

| 模块 | 目录 | 职责 |
| --- | --- | --- |
| Custom AI Agents | `src/forwardcraft/agents/` | 定制化 AI 智能体(LLM 调用、工具编排、对话/任务执行) |
| Workflow Automation | `src/forwardcraft/workflows/` | 工作流自动化(多步骤编排、定时/触发执行) |
| Software Integration | `src/forwardcraft/integrations/` | 软件集成(对接第三方 API / SaaS / 内部系统) |

## 环境要求

- Python 3.9+

## 快速开始

```bash
# 1. 创建并激活虚拟环境
python3 -m venv .venv
source .venv/bin/activate

# 2. 安装项目(含开发依赖)
pip install -e ".[dev]"

# 3. 运行
forwardcraft --version
forwardcraft info
```

未安装包时,也可直接运行:

```bash
PYTHONPATH=src python3 -m forwardcraft info
```

## 配置

复制 `.env.example` 为 `.env` 并按需修改(`.env` 已被 `.gitignore` 忽略,不会提交):

```bash
cp .env.example .env
```

安装可选依赖 `python-dotenv` 后会自动加载 `.env`:

```bash
pip install -e ".[dotenv]"
```

## 项目结构

```
ForwardCraft/
├── pyproject.toml            # 打包与依赖配置
├── README.md
├── LICENSE
├── .env.example              # 环境变量示例
├── .gitignore
├── src/
│   └── forwardcraft/
│       ├── __init__.py
│       ├── __about__.py      # 版本号
│       ├── __main__.py       # python -m forwardcraft 入口
│       ├── cli.py            # 命令行入口
│       ├── config.py         # 配置加载
│       ├── agents/           # Custom AI Agents(待填充)
│       ├── workflows/        # Workflow Automation(待填充)
│       └── integrations/     # Software Integration(待填充)
└── tests/
    └── test_cli.py           # 冒烟测试
```

## 测试

```bash
# 使用 pytest
pytest

# 或使用标准库 unittest(无需额外安装)
PYTHONPATH=src python3 -m unittest discover -s tests
```

## 开发约定

- 代码风格检查:`ruff`
- 测试框架:`pytest` / `unittest`

## 路线图(待定)

- [ ] 选定 AI agent 框架(LangChain / LangGraph / CrewAI / 自研)
- [ ] 实现 `agents/`:LLM 接入与工具编排
- [ ] 实现 `workflows/`:多步骤工作流引擎
- [ ] 实现 `integrations/`:第三方系统对接适配器
- [ ] 接入凭据管理与密钥安全
