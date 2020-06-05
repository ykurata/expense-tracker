import React from 'react'

const Dashboard = () => {
  return (
    <div id="dashboard" className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Expense Tracker</h3>
        </div>
        <ul className="components">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Add Expense</a>
          </li>
          <li>
            <a href="/">Add Income</a>
          </li>
        </ul>
      </nav>

      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
              <i className="fas fa-align-left"></i>
              <span>Toggle Sidebar</span>
            </button>
          </div>
        </nav>

        <br></br>

        <h2>Collapse sidebar using bootstrap</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting i
          ndustry. Lorem Ipsum has been the industry's standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of type 
          and scrambled it to make a type specimen book. It has survived not 
          only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker 
          including versions of Lorem Ipsum.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting i
          ndustry. Lorem Ipsum has been the industry's standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of type 
          and scrambled it to make a type specimen book. It has survived not 
          only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker 
          including versions of Lorem Ipsum.
        </p>

        <div className="line">

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
