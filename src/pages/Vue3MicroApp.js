import microApp from '@micro-zoe/micro-app';
import { useState } from 'react';

/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';

function Vue3MicroApp() {
    const [microAppState, setMicroAppState] = useState(
        microApp.getData('react-app')
    );

    let sendVue3AppData = () => {
        microApp.setData('vue3-app', {
            name: `vue3-app 随机数：${Math.random()}`,
        });
    };

    const onDataChange = e => {
        console.log(`vue3-app 数据：${e.detail.data}`);
        setMicroAppState(e.detail.data);
    };

    return (
        <div>
            <h1>vue3-app</h1>
            <button onClick={sendVue3AppData}>基座 =&gt; vue3-app</button>

            <p>子应用消息 {microAppState ? microAppState.msg : '无'}</p>

            <p>vue3 子应用使用了 keep-alive，声明周期有所不同</p>
            <micro-app
                name='vue3-app'
                url='http://localhost:3002'
                keep-alive
                onDataChange={onDataChange}
                onCreated={() => console.log('micro-app元素被创建')}
                onBeforemount={() =>
                    console.log('即将被渲染，只在初始化时执行一次')
                }
                onMounted={() =>
                    console.log('已经渲染完成，只在初始化时执行一次')
                }
                onAfterhidden={() => console.log('已卸载')}
                onBeforeshow={() => console.log('即将重新渲染，初始化时不执行')}
                onAftershow={() => console.log('已经重新渲染，初始化时不执行')}
                onError={() => console.log('渲染出错')}
            ></micro-app>
        </div>
    );
}

export default Vue3MicroApp;
