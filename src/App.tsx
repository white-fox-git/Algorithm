import './App.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';


function App() {

  const [array, setArray] = useState<string>('');
  const [algorithm, setAlgorithm] = useState<string>('');
  const [result, setResult] = useState<string[]>([]);
  const[arrayAlert, setArrayAlert] = useState<boolean>(false);
  const[algorithmAlert, setAlgorithmAlert] = useState<boolean>(false);

  function resultAlgorithm(array:string, algorithm:string):void{


    let newArray:string[] = array.split(',');
    let numArray:number[];
    let copy:string[] = [];
    let check:boolean = true;

    numArray = newArray.map((item) => {
      return parseInt(item);
    });

    for(let i = 0; i < numArray.length; i++){
      if(isNaN(numArray[i]) == true)
      {
        setArrayAlert(true);
        setArray('');
        check = false;
        i = numArray.length;
      }
    }

    if(algorithm == "select")
    {
      /** 선택 정렬*/
      for(let i = 0; i < numArray.length; i++){
        let minIndex = i;
        for(let j = i + 1; j < numArray.length; j++){
          if(numArray[minIndex] > numArray[j]){
            minIndex = j;
          }
        }
        if(minIndex !== i){
          let temp = numArray[minIndex];
          numArray[minIndex] = numArray[i];
          numArray[i] = temp;
        }

        copy.push(`정렬 ${i+1} : ` + numArray);
      }
      copy.push('정렬 완료!');
    }
    else if(algorithm == "insert")
    {
      /** 삽입 정렬*/
      for(let i = 1; i < numArray.length; i++){
        let cur = numArray[i];
        let left = i - 1;

        while(left >= 0 && numArray[left] > cur){
          numArray[left + 1] = numArray[left];
          numArray[left] = cur;
          cur = numArray[left];
          left--;
        }

        copy.push(`정렬 ${i} : ` + numArray);
      }

      copy.push('정렬 완료!');
    }
    else if(algorithm == "bubble")
    {
      /** 버블 정렬*/

      let count:number = 0;

      for(let i = numArray.length; i > 0; i--){
        for(let j = 0; j < i-1; j++){
          if(numArray[j] > numArray[j+1]){
            let temp = numArray[j+1];
            numArray[j+1] = numArray[j];
            numArray[j] = temp;
            count += 1;
            copy.push(`정렬 ${count} : ` + numArray);
          }
        }
      }

      copy.push('정렬 완료!');
    }
    else
    {
      check == true ? setAlgorithmAlert(true) : null;
    }
    
    
    
    if(check == true)
    {
      setResult(copy);
    }
  }


  return (
    <>
      <header>
        <h5>정렬 알고리즘 실행기</h5>
        <p id="intro">Made by White Fox</p>
      </header>
      <main>
        <h4>😊 알고리즘을 수행할 배열에 들어갈 값을 입력해주세요.</h4>
        <p id ="ex">예시 : 1, 7, 3, 5, 9, 11</p>
        <input type="text" placeholder='배열의 값을 입력해주세요.' value={array} onChange={(e) =>{setArray(e.target.value)}} onClick={() => {
            setResult([]);            
            setArrayAlert(false); 
          }}/>
        <select onChange={(e) => {setAlgorithm(e.target.value)}} onClick={() => {
            setResult([]); 
            setAlgorithmAlert(false);
          }}>
          <option id="option" value="" disabled selected onClick={() => {setResult([])}}>정렬 선택</option>
          <option value="select">선택 정렬</option>
          <option value="insert">삽입 정렬</option>
          <option value="bubble">버블 정렬</option>
        </select>
        {
          arrayAlert == true ? <p className='alert'>* 입력한 값을 확인해주세요.</p> : null
        }
        {
          algorithmAlert == true ? <p className='alert'>* 정렬 방식을 선택해주세요.</p> : null
        }
        <button onClick={() => {resultAlgorithm(array, algorithm)}}>정렬</button>
        {
          result != [] ? 
            result.map((item, idx) => {
              return <p key={idx} className="arr">{item}</p>
            })
          :
          null
        }
      </main>
    </>
  )
}

export default App
