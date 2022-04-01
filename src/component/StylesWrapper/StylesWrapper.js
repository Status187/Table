import styled from "styled-components";

export const StylesWrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    margin: 50px auto 0 auto;

    tr {
      :last-child {
        td {
          border-bottom: 1px solid black;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`