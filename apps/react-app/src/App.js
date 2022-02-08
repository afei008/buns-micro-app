import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import About from './pages/About';

function App() {
    const [mainAppData, setMainAppData] = useState(window.microApp.getData());

    // 监听基座数据
    useEffect(() => {
        if (window.microApp) {
            const dataListener = data => {
                console.log('主应用传的数据：', data);
                setMainAppData(data);
            };

            window.microApp.addDataListener(dataListener);
            return () => {
                window.microApp.clearDataListener();
            };
        }
    });

    // 发送数据给基座
    const sendToMain = () => {
        window.microApp.dispatch({
            msg: `我是 react-app 随机数 ${Math.random()}`,
        });
    };

    return (
        <div>
            <p>主应用的数据：{mainAppData ? mainAppData.name : '无'}</p>

            <button onClick={sendToMain}>给基座应用发送</button>

            <HashRouter>
                <div>
                    <header>
                        <Link to='/'>react-app Home</Link>
                        <Link to='/about'>react-app About</Link>
                    </header>

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                    </Routes>
                </div>
            </HashRouter>
        </div>
    );
}

export default App;
