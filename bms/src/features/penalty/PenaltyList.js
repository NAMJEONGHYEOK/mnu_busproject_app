import React, { useState, useEffect } from 'react';
import './PenaltyList.css';
import Pagination from '../pagination/Pagination';

export function PenaltyList() {
  const [userlists, setLists] = useState([]); // usestate 로 state 상태 관리.
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15); //
  const [inputValue, setInputValue] = useState('');
  const [checkbutton, setChechButton] = useState(false);

  //componentdidmount + componentdidupdate 랑 동일
  useEffect(() => {
    const fetchData = () => {
      try {
        //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
        fetch('http://112.164.190.87:5000/api/penaltylist', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            inputvalue: inputValue,
          }),
        })
          .then(response => response.json())
          .then(res => {
            if (res.success === true) {
              setLists(res.penalty);
              setLoading(false);
            } else {
              alert(res.message);
              setLoading(false);
              console.log('test');
            }
          })
          .catch(error => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    console.log('test');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkbutton]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const checkbuttonchange = () => {
    setChechButton(!checkbutton);
  };

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const cboards = currentPosts(userlists);
  const lists = loading => {
    return (
      <>
        {/* { loading && … } 부분은, loading 값이 true일 때 && 다음의 것을 표시한다는 의미 */}
        {loading && <div> loading... </div>}
        {cboards.map(ulist => (
          <div className="btitlebox" key={ulist?.uid}>
            <div className="bnotice_pid">{ulist?.uid}</div>
            <div className="bnotice_pid">{ulist?.penalty}</div>
            <div className="bnotice_pid">{ulist?.pdate}</div>
            <div className="bnotice_pid">{ulist?.reason}</div>
          </div>
        ))}
      </>
    );
  };

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      checkbuttonchange(); //검색 실행
    }
  };

  return (
    <div>
      <div className="header">
        <div className="search_bar">
          <input
            autoComplete="off"
            type="text"
            className="search_box"
            placeholder=" (uid)... "
            name="username"
            onChange={handleInputChange}
            onKeyPress={onKeyPress}
            value={inputValue}
          />

          <div className="search_button" onClick={checkbuttonchange}>
            검색
          </div>
        </div>

        <div className="header_box">
          <div className="unamebox">학번</div>
          <div className="deptbox">벌점</div>
          <div className="stdnumbox">기간</div>
          <div className="penalty_point">내역</div>
        </div>
      </div>
      <div>
        {lists(loading)}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={userlists.length}
          paginate={setCurrentPage}
          current={currentPage}
        />
      </div>
    </div>
  );
}

export default PenaltyList;
