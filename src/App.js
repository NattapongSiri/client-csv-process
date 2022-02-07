import papa from 'papaparse'
import './App.css';
import { useCallback, useState } from 'react';

function App() {
  let [file, setFile] = useState()
  let [content, setContent] = useState()
  const showTableHandler = useCallback(() => {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = e => {
      let csv = e.target.result
      setContent(
        papa.parse(csv, {
          header: true
        }).data
      )
    }
  }, [file, setContent])
  return (
    <div className="App">
      <input type="file" accept="text/csv" onChange={({target}) => setFile(target.files[0])}/>
      <input type="button" onClick={showTableHandler} value="show table"/>
      <table>
        <thead>
          <tr>{content?.length > 0 && Object.keys(content[0]).map(name => (
            <td key={name}>{name}</td>
          ))
          }</tr>
        </thead>
        <tbody>
          {content?.length > 0 && content.map((row, index) => {
            return <tr key={index}>{Object.values(row).map((v, index) => (
              <td key={index}>{v}</td>
            ))}</tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
