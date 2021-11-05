import { React } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const newMembers = [
    { id: 1, name: 'Joseph Tajaran', skill: 'UX-Design' },
    { id: 2, name: 'Joseph Tajaran', skill: 'UX Research' },
    { id: 3, name: 'Joseph Tajaran', skill: 'Front-End' },
    { id: 4, name: 'Joseph Tajaran', skill: 'Back-End' },
    { id: 5, name: 'Joseph Tajaran', skill: 'Product Management' },
    { id: 6, name: 'Joseph Tajaran', skill: 'Project Management' },
    { id: 7, name: 'Joseph Tajaran', skill: 'Visual Design' },
    { id: 8, name: 'Joseph Tajaran', skill: 'Visual Design' },
  ];

  const projectMembers = [
    { id: 1, name: 'Donovan Bacon', skill: 'Product-Management' },
    { id: 2, name: 'Rebecca Young', skill: 'Front-End' },
    { id: 3, name: 'Howard Kier', skill: 'UX Design' },
  ];

  const StyledSection = styled.section`
    table td {
      padding: 0.5rem;
      margin: 4rem;
      border: 1px solid gray;
    }

    table th {
      padding: 0.5 rem;
      border: 2px solid gray;
    }

    width: 50vw;
    margin: 0 auto;

    h1 {
      padding: 2rem 0 2rem 0;
      font-size: 2.5rem;
      font-weight: 600;
    }

    h2 {
      padding: 2rem 0 2rem 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    h3 {
      padding: 2rem 0 2rem 0;
      font-weight: 600;
    }

    .sign-out {
      float: right;
    }

    .table-container {
      margin-left: auto;
      margin-right: auto;
    }

    table {
      width: 70%;
      margin-left: 15%;
      margin-right: 15%;
    }

    .newmember-table {
      padding-bottom: 15vh;
    }

    .projects-table {
      padding-bottom: 15vh;
    }
  `;

  return (
    <StyledSection>
      <h1>Welcome</h1>

      <div>
        <Link to="/">Home</Link>
        <Link className="sign-out" to="/">
          Sign out
        </Link>
      </div>
      <div className="table-container">
        <h2>New Members</h2>
        <table className="newmember-table">
          <thead>
            <tr>
              <td>Regisration Date</td>
              <td>Name</td>
              <td>Primary Skill</td>
            </tr>
          </thead>
          <tbody>
            {newMembers.map((member) => (
              <tr key={member.id} className="for">
                <td>June 22, 2021</td>
                <td>{member.name}</td>
                <td>{member.skill}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Projects</h2>

        <h3>Between Friends</h3>
        <table className="projects-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Primary Skill</th>
            </tr>
          </thead>
          <tbody>
            {projectMembers.map((member) => (
              <tr key={member.id} className="for">
                <td>{member.name}</td>
                <td>{member.skill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledSection>
  );
}
