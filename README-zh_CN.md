# ChatGPT Web NextJS

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/-4ukN3?referralCode=ZtthnC)

[English](./README.md) | 中文文档

## 介绍

[chatgpt-web-next](https://github.com/helianthuswhite/chatgpt-web-next) 使用 `NextJS` 和 `TailwindCSS` 完成开发，并且使用 `railway.app` 进行免费部署。具体的开发和部署教程可以查看文章[搭建个人专属 ChatGPT（零成本且不需要 🪜）](https://juejin.cn/post/7217057805781516345)。

你可以通过[chat.helianthuswhite.cn](https://chat.helianthuswhite.cn/)网站进行体验。考虑到安全问题，该项目不会在服务端存储任何数据，也不会要求用户在网站上填写自己的 **API KEY**。该项目的所有数据都是通过 localstorage 存储在用户浏览器本地。

**若用户有使用自己的 API KEY 的需求，可以通过 Railway 模板一键部署，或者 clone 本项目到本地并创建自己的环境变量文件。**

## 开发

该项目是一个标准的 `nextjs` 项目，将项目 clone 到本地之后使用如下命令来安装项目依赖：

    npm install --legacy-peer-deps

或者使用 `cnpm` 命令来安装:

    cnpm install

依赖安装完成之后，在项目的根目录创建一个 `.env.local` 文件用于填写项目的环境变量。

项目可以配置的环境如下所示：

```yml
# OpenAI官方的api key文件，可以在https://platform.openai.com/overview获取
OPENAI_API_KEY=

# 从https://chat.openai.com/api/auth/session接口获取的access_token
OPENAI_ACCESS_TOKEN=

# OpenAI的请求URL，默认为https://api.openai.com
OPENAI_API_BASE_URL=

# OpenAI的模型，默认为gpt3.5-turbo，其他模型可以在https://platform.openai.com/docs/models查询
OPENAI_API_MODEL=

# 使用 access_token 方式请求时使用的http代理地址
API_REVERSE_PROXY=

# 请求超时时间
TIMEOUT_MS=100000

# Socks的代理配置
SOCKS_PROXY_HOST=

# Socks的代理端口
SOCKS_PROXY_PORT=

# 一种简单的权限认证配置，多个token使用逗号分隔
LOCAL_ACCESS_TOKENS=
```

如果配置完本地的环境变量，可以通过 `dev` 命令来启动项目:

    npm run dev

## 构建与部署

### 作为 Node 服务部署

作为普通的 Node 服务部署，可以先通过 `build` 命令来构建项目。

    npm run build

`nextjs` 在项目构建完成之后，会在项目目录生成一个 `.next` 文件夹，里面存放了构建完成后的产物，之后我们通过 `start` 命令即可启动项目。

    npm run start

也可以使用 `pm2` 来管理我们的服务，`pm2` 的启动命令如下所示：

    pm2 start npm -- run start

### 使用 Docker 镜像部署

该项目也提供了使用 Docker 镜像部署的方式，安装完 Docker 并启动服务后，可以在项目的根目录执行如下命令来制作项目的镜像：

    docker build -t chatgpt-web-next .

具体的镜像制作过程可以查看[Dockerfile](./Dockerfile)文件。

当我们的镜像制作完成之后，我们可以通过以下命令来启动我们的镜像并设置项目所需要的环境变量。

    docker run --name chatgpt -d -p 3000:3000 --env OPENAI_API_KEY=sk-xxxx --env SOCKS_PROXY_HOST=127.0.0.1 --env SOCKS_PROXY_PORT=7890

### 使用云服务部署

**这里优先推荐大家使用云服务去进行部署，国外的云服务都有免费的额度且不需要我们再配置代理，自带 🪜，还是很好用的。**

可以使用 [railway.app](https://railway.app/)、[vercel](https://vercel.com/)、[zeabur](https://zeabur.com/) 等云服务，具体的部署方式可以查看对应云服务的文档，这里不再赘述。

## 环境变量

| 变量名称              | 必填                                          | 变量说明                                                                                                                 |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `TIMEOUT_MS`          | 可选                                          | 超时时间，单位为毫秒 ms                                                                                                  |
| `OPENAI_API_KEY`      | 可选                                          | 如果使用 API 方式调用必填，可以在[这里](https://platform.openai.com/overview)查看 API KEY                                |
| `OPENAI_ACCESS_TOKEN` | 可选                                          | 如果使用 Web API 的方式调用必填，`accessToken` 是通过[这个接口](https://chat.openai.com/api/auth/session)获取            |
| `OPENAI_API_BASE_URL` | 可选, 只有 `OPENAI_API_KEY` 不为空才有效      | API 方式调用的地址，默认为官方地址                                                                                       |
| `OPENAI_API_MODEL`    | 可选, 只有 `OPENAI_API_KEY` 不为空才有效      | API 方式调用的模型                                                                                                       |
| `API_REVERSE_PROXY`   | 可选, 只有 `OPENAI_ACCESS_TOKEN` 不为空才有效 | `Web API` 方式调用的反向代理地址，可以在[这里](https://github.com/transitive-bullshit/chatgpt-api#reverse-proxy)查看详情 |
| `SOCKS_PROXY_HOST`    | 可选，跟 `SOCKS_PROXY_PORT` 一起使用          | Socks 代理地址                                                                                                           |
| `SOCKS_PROXY_PORT`    | 可选, 跟 `SOCKS_PROXY_HOST` 一起使用          | Socks 代理端口                                                                                                           |
| `LOCAL_ACCESS_TOKENS` | 可选                                          | 简单权限认证的 token，需要前端请求携带，后端验证，多个 token 以逗号分隔                                                  |

> 注意：在 Railway 中更新环境变量会导致服务重新部署。
