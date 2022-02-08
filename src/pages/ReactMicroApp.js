import microApp from '@micro-zoe/micro-app';
import { useState } from 'react';

// 下面 3 行代码必须保留，用于添加 React 的自定义事件
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';

function ReactMicroApp() {
    const [microAppState, setMicroAppState] = useState(
        microApp.getData('react-app')
    );

    // 给子应用传递数据
    const sendReactAppData = () => {
        microApp.setData('react-app', {
            name: `react-app 随机数：${Math.random()}`,
        });
    };

    // 监听子应用数据
    const onDataChange = e => {
        console.log(`react-app onDataChange ${e}`);
        console.log(`react-app 数据 ${e.detail.data}`);
        setMicroAppState(e.detail.data);
    };

    return (
        <div>
            <h1>react-app</h1>
            <button onClick={sendReactAppData}>基座 =&gt; react-app</button>

            <p>子应用消息 {microAppState ? microAppState.msg : '无'}</p>

            <micro-app
                name='react-app'
                url='http://localhost:3001'
                baseroute='/react-app'
                onDataChange={onDataChange}
                onCreated={() => console.log('micro-app元素被创建')}
                onBeforemount={() => console.log('即将被渲染')}
                onMounted={() => console.log('已经渲染完成')}
                onUnmount={() => console.log('已经卸载')}
                onError={() => console.log('渲染出错')}
                onAfterhidden={() => console.log('已卸载，使用 keep-alive 之后触发')}
                onBeforeshow={() => console.log('即将重新渲染，初始化时不执行，使用 keep-alive 之后触发')}
                onAftershow={() => console.log('已经重新渲染，初始化时不执行，使用 keep-alive 之后触发')}
            ></micro-app>
        </div>
    );
}

export default ReactMicroApp;
