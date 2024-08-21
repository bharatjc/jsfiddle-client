import React, { useEffect, useRef, useState } from 'react';
import Header from '../Components/Header';
import { RxSwitch } from "react-icons/rx";
import { CiPlay1 } from "react-icons/ci";
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import { useSelector} from 'react-redux'

function Home() {  

  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  const pageTheme = useSelector(store=>{
    return store.theme.dark
  })

  const iframeRef = useRef(null);

  useEffect(() => {
    const savedHtml = localStorage.getItem('htmlCode');
    const savedCss = localStorage.getItem('cssCode');
    const savedJs = localStorage.getItem('jsCode');

    if (savedHtml)
      { 
        setHtml(savedHtml);
      }
    if (savedCss) 
      {
        setCss(savedCss);
      }
    if (savedJs)
       {
        setJs(savedJs);
      }
  }, []);

  useEffect(() => {
    localStorage.setItem('htmlCode', html);
    localStorage.setItem('cssCode', css);
    localStorage.setItem('jsCode', js);
  }, [html, css, js]);

  function updateOutput (){
    const iframe = iframeRef.current;
    if (iframe) {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(`
        <html>
          <head>
            <style>
            body {
              color: white;
            }
            ${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
      iframeDoc.close();
    }
  };

  return (
    <>
    <Header updateOutput={updateOutput} />
    <div className='h-full w-full'>
    <div className={`h-full ${pageTheme == "light" ? "bg-white text-black" : "bg-[#1B1C1E] text-white"}`}>
      <div className="flex flex-col md:flex-row h-full container mx-auto text-sm md:text-base">
        <div className="w-full md:w-1/6 p-2 border-b md:border-b-0 md:border-r border-[#323334]">
          <h2 className="font-bold my-3">Fiddle meta</h2>
          <textarea placeholder="Untitled fiddle" className={`p-2 w-full mb-2 outline-blue-600 h-8 rounded text-sm ${pageTheme == "light" ? "bg-[#8E8E8F] text-[black]" : "bg-[#1B1C1E] text-[#8E8E8F]"}`}></textarea>
          <textarea placeholder="No description" className={`p-2 w-full mb-2 outline-blue-600 h-14 rounded text-sm ${pageTheme == "light" ? "bg-[#8E8E8F] text-[black]" : "bg-[#1B1C1E] text-[#8E8E8F]"}`}></textarea>
          <div className="flex items-center my-5 gap-2 text-sm">
            <RxSwitch className="text-lg" />
            <p className="font-semibold">Private fiddle</p>
            <button className="text-xs px-2 bg-yellow-500 text-black rounded font-semibold">PRO</button>
          </div>
          <h2 className="font-semibold">Groups</h2>
          <div className="my-3 flex gap-2">
            <p className="font-semibold">Resources</p>
            <button className={`bg-[#373839] px-2 rounded text-xs font-semibold ${pageTheme == "light" ? "text-white" :""}`}>URL</button>
            <button className={`bg-[#373839] px-2 rounded text-xs font-semibold ${pageTheme == "light" ? "text-white" :""}`}>cdnjs</button>
          </div>
          <h2 className="font-semibold">Async requests</h2>
          <h2 className="my-3 font-semibold">Other (links, license)</h2>
        </div>

        <div className="w-full md:w-5/6 flex flex-col pb-6">
          <div className="flex flex-col md:flex-row h-[50%] border-b border-[#323334] pb-9">
            <div className="w-full md:w-1/2 p-2 border-b md:border-b-0 md:border-r border-[#323334] h-[250px] pb-8 md:pb-2">
              <h3>HTML</h3>
              <CodeMirror
                value={html}
                options={{
                  mode: 'xml',
                  theme: pageTheme === "light" ? 'default' : 'dracula',
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => setHtml(value)}
                className="CodeMirror"
              />
            </div>
            <div className="w-full md:w-1/2 p-2 h-[250px]">
              <h3>CSS</h3>
              <CodeMirror
                value={css}
                options={{
                  mode: 'css',
                  theme: pageTheme === "light" ? 'default' : 'dracula',
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => setCss(value)}
                className="CodeMirror"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-[50%]">
            <div className="w-full md:w-1/2 p-2 border-b md:border-b-0 md:border-r border-[#323334] h-[272px] pb-8 md:pb-2">
              <h3>JavaScript</h3>
              <CodeMirror
                value={js}
                options={{
                  mode: 'javascript',
                  theme: pageTheme === "light" ? 'default' : 'dracula',
                  lineNumbers: true,
                }}
                onBeforeChange={(editor, data, value) => setJs(value)}
                className="CodeMirror"
              />
            </div>
            <div className="w-full md:w-1/2 p-2 flex">
              <h3>Output</h3>
              <iframe ref={iframeRef} title="output" className="h-full w-[70%] py-5">
              </iframe>
              <button onClick={updateOutput} className="flex gap-1 px-2">
            <CiPlay1 className="text-lg" />
            Run
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </>
  );
}

export default Home;
