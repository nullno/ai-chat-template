// import OpenAI from 'openai';
import { fetchEventSource } from '@microsoft/fetch-event-source';

// 服务端封装后使用，不能像这样暴露出来，这里只是方便演示
const token = 'Bearer sk-sLS1wG4qUZWMJj9L3Q6JMsK2XKhwW8prordrqYxDyHSlsUtE';
const api = 'https://api.moonshot.cn/v1/chat/completions';

const ai = function(arg) {
  const params = {
    model: 'moonshot-v1-8k',
    messages: [
      {
        role: 'system',
        content:
          '你是一个人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视。'
      },
      { role: 'user', content: arg.prompt }
    ],
    stream: true

  };
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    try {
      const controller = new AbortController();
      controller.signal.addEventListener('abort', e => {
        resolve({ stop: true, msg: 'stop text' });
      });
      const Res = await fetchEventSource(api, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          Authorization: token
        },
        responseType: 'text/event-stream',
        body: JSON.stringify(params),
        openWhenHidden: true,
        signal: controller.signal,
        async onopen(response) {
          if (response.status != 200) {
            throw 'Error: ' + response.statusText;
          } else {
            arg.init && arg.init(controller);
          }
        }, 
        onmessage(msg) {
            try {
              const dataObj = JSON.parse(msg.data);
              if (dataObj) {
                arg.onMessage &&
                  arg.onMessage(dataObj.choices[0].delta.content || '');
              }
            } catch (e) {
              /* eslint-disable */
            }

        },
        onclose(e) {
          resolve({ over: true, msg: 'TextOver' });
          //正常结束的回调
          //在这里写一些GPT回答结束后的一些操作
        },
        onerror(err) {
          //连接出现异常回调
          throw err;
        }
      });
    } catch (e) {
      resolve({ error: true, msg: '出了点问题，请稍后再试！' });
    }
  });
};

export default ai;
