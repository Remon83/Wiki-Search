import { Table, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import PrevState from "./hooks/prev-state";
import axios from "axios";

function App() {
  const [result, setResult] = useState([]);
  const [term, setTerm] = useState("javascript");
  
  const prevTerm = PrevState(term);
  console.log(prevTerm);

  useEffect(() => {
    console.log(term);
    const search = async () => {
      const res = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          origin: "*",
          action: "query",
          srsearch: term,
          list: "search",
          // limit: "5",
          // namespace: "0",
          format: "json"
      }
      })
      // console.log(res.data.query.search);
      setResult(res.data.query.search)
    }
    // search();

    if (result.length === 0) {
      if (term) {
        search();
      }
    } else if (prevTerm !== term) {
      const debounceSearch = setTimeout(() => {
          if(term) {
            search();
          }
        }, 1500)
        return() => {
          clearInterval(debounceSearch)
        }
    }
  }, [term, result.length, prevTerm]);
  const dataHandler = result.length !==0 && result.map((item, idx) => 
    (
      <tr key={item.pageid}>
        <td>{++idx}</td>
        <td>{item.title}</td>
        <td><span dangerouslySetInnerHTML={{__html: item.snippet}}/></td>
      </tr>
    )
  )
  return (
    <Container>
      <Form style={{marginTop: "20px"}}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Search Input</Form.Label>
          <Form.Control onChange={(e) => {setTerm(e.target.value)}} value={term} type="text" placeholder="Enter your search here" />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {dataHandler}
        </tbody>
      </Table>
    </Container>
  );
  
}

export default App;
