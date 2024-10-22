import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // CSS 파일을 임포트하세요.

function Home() {
  return (
      <div>
        <h1>Home</h1>
        <p>Home is where the heart is.</p>
      </div>
  );
}

function Search() {
  return <h1>검색 페이지</h1>;
}

function Settings() {
  return <h1>설정 페이지</h1>;
}

// 다른 페이지 컴포넌트도 추가할 수 있습니다.

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // ESC 키를 눌렀을 때 사이드바 닫기
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
      <Router>
        <div className="container">
          {/* 사이드바 */}
          <aside
              className={`SideBar ${isSidebarOpen ? 'open' : ''}`}
              aria-hidden={!isSidebarOpen}
          >
            <ul>
              <li className="sidebar-header">
                <Link to="/" onClick={closeSidebar}>
                  <i className="fas fa-book"></i> 정용환의 Notion
                </Link>
                {/* 토글 버튼을 첫 번째 리스트 항목에 배치 */}
                <button
                    className="toggle-button"
                    onClick={toggleSidebar}
                    aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                    aria-expanded={isSidebarOpen}
                >
                  {isSidebarOpen ? '✕' : '☰'}
                </button>
              </li>
              <li>
                <Link to="/search" onClick={closeSidebar}>
                  <i className="fas fa-search"></i> 검색
                </Link>
              </li>
              <li>
                <Link to="/" onClick={closeSidebar}>
                  <i className="fas fa-home"></i> 홈
                </Link>
              </li>
              <li>
                <Link to="/recent" onClick={closeSidebar}>
                  <i className="fas fa-history"></i> 최근 조회한 항목
                </Link>
              </li>
            </ul>
            <ul className="sidebar-section">
              <li>
                <Link to="/workspace" onClick={closeSidebar}>
                  <i className="fas fa-briefcase"></i> 워크 스페이스
                </Link>
              </li>
              <li>
                <Link to="/shared" onClick={closeSidebar}>
                  <i className="fas fa-share-alt"></i> 공유 페이지
                </Link>
              </li>
              <li>
                <Link to="/personal" onClick={closeSidebar}>
                  <i className="fas fa-user"></i> 개인 페이지
                </Link>
              </li>
            </ul>
            <ul className="sidebar-section">
              <li>
                <Link to="/settings" onClick={closeSidebar}>
                  <i className="fas fa-cog"></i> 설정
                </Link>
              </li>
            </ul>
          </aside>

          {/* 오버레이 */}
          {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

          {/* 메인 콘텐츠 */}
          <main className="MainContent">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
              {/* 다른 라우트도 추가할 수 있습니다. */}
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;
